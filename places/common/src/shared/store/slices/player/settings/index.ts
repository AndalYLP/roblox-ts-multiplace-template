import { combineProducers } from "@rbxts/reflex";

import { audioSlice } from "common/shared/store/slices/player/settings/audio/audio.slice";

export * from "./settings.selectors";
export * from "./settings.types";

export const settingsSlices = combineProducers({
	audio: audioSlice,
});
