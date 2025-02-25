import { combineProducers } from "@rbxts/reflex";

import { withMultiplayer } from "common/shared/functions/with-multiplayer";
import { achievementsSlice } from "common/shared/store/slices/player/achievements/achievements.slice";
import { balanceSlice } from "common/shared/store/slices/player/balance/balance.slice";
import { mtxSlice } from "common/shared/store/slices/player/mtx/mtx.slice";
import { settingsSlices } from "common/shared/store/slices/player/settings";

export * from "common/shared/store/slices/player/player.selectors";
export * from "common/shared/store/slices/player/player.types";

export const playersSlices = combineProducers({
	achievements: achievementsSlice,
	balance: balanceSlice,
	mtx: mtxSlice,
	settings: settingsSlices,
}).enhance(withMultiplayer);
