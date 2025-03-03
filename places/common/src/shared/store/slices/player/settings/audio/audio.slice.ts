import { createProducer } from "@rbxts/reflex";

import type { PlayerData } from "common/shared/store/slices/player/player.types";
import type { PlayerAudioSettings } from "common/shared/store/slices/player/settings/audio/audio.types";
import { defaultPlayerAudioSettings } from "common/shared/store/slices/player/settings/audio/audio.types";
import type { PlayerSettings } from "common/shared/store/slices/player/settings/settings.types";

export type AudioState = Readonly<PlayerAudioSettings>;

const initialState: AudioState = defaultPlayerAudioSettings;

export const audioSlice = createProducer(initialState, {
	/**
	 * Updates a specific player's settings by modifying the given setting type.
	 *
	 * @param state - The current state.
	 * @param _settingCategory - The setting category from the setting type.
	 * @param settingType - The setting type to change.
	 * @param value - The new value.
	 * @returns The new state.
	 */
	changeSetting: (
		state,
		_settingCategory: keyof PlayerSettings,
		settingType: keyof PlayerSettings[keyof PlayerSettings],
		value: PlayerSettings[keyof PlayerSettings][keyof PlayerSettings[keyof PlayerSettings]],
	): AudioState => {
		return {
			...state,
			[settingType]: value,
		};
	},

	/** @ignore */
	loadPlayerData: (_state, data: PlayerData): AudioState => data.settings.audio,
});
