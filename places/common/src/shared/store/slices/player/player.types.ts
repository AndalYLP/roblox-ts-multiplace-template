import type { PlayerAchievements } from "common/shared/store/slices/player/achievements/achievements.types";
import { defaultPlayerAchievements } from "common/shared/store/slices/player/achievements/achievements.types";
import type { PlayerBalance } from "common/shared/store/slices/player/balance/balance.types";
import { defaultPlayerBalance } from "common/shared/store/slices/player/balance/balance.types";
import type { PlayerMtx } from "common/shared/store/slices/player/mtx/mtx.types";
import { defaultPlayerMtx } from "common/shared/store/slices/player/mtx/mtx.types";
import type { PlayerSettings } from "common/shared/store/slices/player/settings";
import { defaultPlayerSettings } from "common/shared/store/slices/player/settings";

export interface PlayerData {
	readonly achievements: PlayerAchievements;
	readonly balance: PlayerBalance;
	readonly mtx: PlayerMtx;
	readonly settings: PlayerSettings;
}

export const defaultPlayerData: Readonly<PlayerData> = {
	achievements: defaultPlayerAchievements,
	balance: defaultPlayerBalance,
	mtx: defaultPlayerMtx,
	settings: defaultPlayerSettings,
};
