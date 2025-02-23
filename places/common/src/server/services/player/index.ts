import type { OnStart } from "@flamework/core";
import { Service } from "@flamework/core";
import { Janitor } from "@rbxts/janitor";
import type { Document } from "@rbxts/lapis";
import type { Logger } from "@rbxts/log";
import Object from "@rbxts/object-utils";
import { Players } from "@rbxts/services";
import Signal from "@rbxts/signal";

import { IS_DEV } from "common/shared/constants/core";
import type { PlayerData } from "common/shared/store/slices/player";
import type { ListenerData } from "common/utils/flamework";
import { setupLifecycle } from "common/utils/flamework";
import { onPlayerAdded, promisePlayerDisconnected } from "common/utils/player";
import { KickCode } from "types/enum/kick-reason";

import type { PlayerDataService } from "./data";
import { PlayerEntity } from "./entity";
import type { PlayerRemovalService } from "./removal";

export interface OnPlayerJoin {
	/**
	 * Fires when a player joins the game and is fully initialized. The player
	 * is considered `fully initialized` once all of their data is loaded and
	 * their PlayerEntity class is fully setup. At which point, anything that
	 * implements this lifecycle event will be fired with the class.
	 */
	onPlayerJoin(playerEntity: PlayerEntity): void;
}

export interface OnPlayerLeave {
	/**
	 * Fires when a player leaves the game. This is called before the player is
	 * removed from the game and their PlayerEntity class is cleaned up. This
	 * means it is still safe to access player data before it is removed.
	 */
	onPlayerLeave(playerEntity: PlayerEntity): Promise<void> | void;
}

/** A service that manages player entities in the game. */
@Service()
export class PlayerService implements OnStart {
	private readonly onEntityJoined = new Signal<(playerEntity: PlayerEntity) => void>();
	private readonly onEntityRemoving = new Signal();
	private readonly playerEntities = new Map<Player, PlayerEntity>();
	private readonly playerJoinEvents = new Array<ListenerData<OnPlayerJoin>>();
	private readonly playerLeaveEvents = new Array<ListenerData<OnPlayerLeave>>();

	constructor(
		private readonly logger: Logger,
		private readonly playerDataService: PlayerDataService,
		private readonly playerRemovalService: PlayerRemovalService,
	) {}

	/**
	 * This method wraps a callback and replaces the first argument (that must
	 * be of type `Player`) with that players `PlayerEntity` class.
	 *
	 * @param callback - The callback to wrap.
	 * @returns A new callback that replaces the first argument with the
	 *   player's `PlayerEntity` class.
	 */
	public withPlayerEntity<T extends Array<unknown>, R = void>(
		callback: (playerEntity: PlayerEntity, ...args: T) => R,
	) {
		return (player: Player, ...args: T): R | undefined => {
			const playerEntity = this.getPlayerEntity(player);
			if (!playerEntity) {
				this.logger.Error(
					`Unable to find entity for player ${player}, unable to call callback. Stacktrace: \n` +
						debug.traceback(),
				);
				return;
			}

			return callback(playerEntity, ...args);
		};
	}

	/**
	 * Returns an array of all `PlayerEntity` instances associated with players
	 * that have joined the game.
	 *
	 * @returns An array of `PlayerEntity` instances.
	 */
	public getPlayerEntities(): Array<PlayerEntity> {
		return Object.values(this.playerEntities);
	}

	/**
	 * Gets the `PlayerEntity` object for a given player.
	 *
	 * @param player - The `Player` instance to get the `PlayerEntity` for.
	 * @returns The `PlayerEntity` instance associated with the given `Player`,
	 *   if any.
	 */
	public getPlayerEntity(player: Player): PlayerEntity | undefined {
		return this.playerEntities.get(player);
	}

	/**
	 * Retrieves the player entity asynchronously. This method will reject if
	 * the player disconnects before the entity is created.
	 *
	 * @param player - The player object.
	 * @returns A promise that resolves to the player entity, or undefined if
	 *   not found.
	 */
	public async getPlayerEntityAsync(player: Player): Promise<PlayerEntity | undefined> {
		const potentialEntity = this.getPlayerEntity(player);
		if (potentialEntity) {
			return potentialEntity;
		}

		const promise = Promise.fromEvent(
			this.onEntityJoined,
			(playerEntity: PlayerEntity) => playerEntity.player === player,
		);

		// eslint-disable-next-line promise/always-return -- This is the last callback
		const disconnect = promisePlayerDisconnected(player).then(() => {
			promise.cancel();
		});

		const [success, playerEntity] = promise.await();
		if (!success) {
			throw `Player ${player.UserId} disconnected before entity was created`;
		}

		disconnect.cancel();

		return playerEntity;
	}

	/** @ignore */
	public onStart(): void {
		setupLifecycle<OnPlayerJoin>(this.playerJoinEvents);
		setupLifecycle<OnPlayerLeave>(this.playerLeaveEvents);

		onPlayerAdded(player => {
			this.onPlayerJoin(player).catch(err => {
				this.logger.Error(`Failed to load player ${player.UserId}: ${err}`);
			});
		});

		Players.PlayerRemoving.Connect(
			this.withPlayerEntity(playerEntity => {
				this.onPlayerRemoving(playerEntity).catch(err => {
					this.logger.Error(`Failed to close player ${playerEntity.UserId}: ${err}`);
				});
			}),
		);

		this.bindHoldServerOpen();
	}

	private setupPlayerJanitor(player: Player, playerDocument: Document<PlayerData>): Janitor {
		const janitor = new Janitor();

		janitor.Add(async () => {
			this.logger.Info(`Player ${player.UserId} leaving game, cleaning up Janitor`);

			try {
				await playerDocument.close();
			} catch (err) {
				this.logger.Error(`Failed to close player document for ${player.UserId}: ${err}`);
			}

			this.playerEntities.delete(player);
			this.onEntityRemoving.Fire();
		});

		return janitor;
	}

	/**
	 * Called internally when a player is removed from the game. We hold the
	 * PlayerEntity until all lifecycle events have been called, so that we can
	 * access player data on player leaving if required.
	 *
	 * @param playerEntity - The player entity associated with the player.
	 */
	private async onPlayerRemoving(playerEntity: PlayerEntity): Promise<void> {
		const promises = new Array<Promise<void>>();

		debug.profilebegin("Lifecycle_Player_Leave");
		{
			for (const { id, event } of this.playerLeaveEvents) {
				promises.push(
					Promise.defer<void>((resolve, reject) => {
						debug.profilebegin(id);
						try {
							const leaveEvent = async (): Promise<void> => {
								await event.onPlayerLeave(playerEntity);
							};

							const [success, err] = leaveEvent().await();
							if (!success) {
								reject(err);
								return;
							}

							resolve();
						} catch (err) {
							this.logger.Error(`Error in player lifecycle ${id}: ${err}`);
						}
					}),
				);
			}
		}

		debug.profileend();

		await Promise.all(promises).finally(() => {
			playerEntity.janitor.Destroy();
		});
	}

	/**
	 * Called internally when a player joins the game.
	 *
	 * @param player - The player that joined the game.
	 */
	private async onPlayerJoin(player: Player): Promise<void> {
		const playerDocument = await this.playerDataService.loadPlayerData(player);
		if (!playerDocument) {
			this.playerRemovalService.removeForBug(player, KickCode.PlayerInstantiationError);
			return;
		}

		const janitor = this.setupPlayerJanitor(player, playerDocument);
		const playerEntity = new PlayerEntity(player, janitor, playerDocument);
		this.playerEntities.set(player, playerEntity);

		debug.profilebegin("Lifecycle_Player_Join");
		{
			for (const { id, event } of this.playerJoinEvents) {
				janitor
					.AddPromise(
						Promise.defer(() => {
							debug.profilebegin(id);
							event.onPlayerJoin(playerEntity);
						}),
					)
					.catch(err => {
						this.logger.Error(`Error in player lifecycle ${id}: ${err}`);
					});
			}
		}

		debug.profileend();

		this.logger.Info(`Player ${player.UserId} joined the game.`);
		this.onEntityJoined.Fire(playerEntity);
	}

	private bindHoldServerOpen(): void {
		game.BindToClose(() => {
			if (IS_DEV) {
				return;
			}

			this.logger.Debug(`Game closing, holding open until all player entities are removed.`);

			while (!this.playerEntities.isEmpty()) {
				this.onEntityRemoving.Wait();
			}

			this.logger.Debug(`All player entities removed, closing game.`);
		});
	}
}
