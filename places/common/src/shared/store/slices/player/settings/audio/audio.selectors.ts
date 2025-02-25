import { createSelector } from "@rbxts/reflex";

import type { SharedState } from "common/shared/store";
import type { AudioState } from "common/shared/store/slices/player/settings/audio/audio.slice";
import { selectPlayerSettingsData } from "common/shared/store/slices/player/settings/settings.selectors";

export function selectPlayerSettingsAudio(
	player: Player,
): (state: SharedState) => AudioState | undefined {
	return createSelector(selectPlayerSettingsData(player), state => state?.audio);
}
