import { combineProducers } from "@rbxts/reflex";

import { audioSlice } from "common/shared/store/slices/player/settings/audio/audio.slice";

export * from "common/shared/store/slices/player/settings/settings.selectors";
export * from "common/shared/store/slices/player/settings/settings.types";

export const settingsSlices = combineProducers({
	audio: audioSlice,
});
