import type { PlayerAudioSettings } from "common/shared/store/slices/player/settings/audio/audio.types";
import { defaultPlayerAudioSettings } from "common/shared/store/slices/player/settings/audio/audio.types";

export interface PlayerSettings {
	readonly audio: PlayerAudioSettings;
}

export const defaultPlayerSettings: Readonly<PlayerSettings> = {
	audio: defaultPlayerAudioSettings,
};
