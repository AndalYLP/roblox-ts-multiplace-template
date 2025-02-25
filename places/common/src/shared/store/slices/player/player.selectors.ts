import type { SharedState } from "common/shared/store";

export function selectPlayerData(player: Player) {
	return (state: SharedState) => state.players.get(player);
}
