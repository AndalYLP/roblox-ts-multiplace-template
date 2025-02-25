import { createSelector } from "@rbxts/reflex";

import type { SharedState } from "common/shared/store";
import type { PlayerMtx } from "common/shared/store/slices/player/mtx/mtx.types";
import { selectPlayerData } from "common/shared/store/slices/player/player.selectors";

export function selectPlayerMtx(player: Player): (state: SharedState) => PlayerMtx | undefined {
	return createSelector(selectPlayerData(player), state => state?.mtx);
}
