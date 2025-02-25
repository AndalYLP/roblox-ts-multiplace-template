import { createSelector } from "@rbxts/reflex";

import type { SharedState } from "common/shared/store";
import type { BalanceState } from "common/shared/store/slices/player/balance/balance.slice";
import { selectPlayerData } from "common/shared/store/slices/player/player.selectors";

export function selectPlayerBalance(
	player: Player,
): (state: SharedState) => BalanceState | undefined {
	return createSelector(selectPlayerData(player), state => state?.balance);
}
