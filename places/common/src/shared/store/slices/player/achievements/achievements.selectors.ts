import { createSelector } from "@rbxts/reflex";

import type { SharedState } from "common/shared/store";
import type { AchievementState } from "common/shared/store/slices/player/achievements/achievements.slice";
import { selectPlayerData } from "common/shared/store/slices/player/player.selectors";

export function selectPlayerAchievements(
	player: Player,
): (state: SharedState) => AchievementState | undefined {
	return createSelector(selectPlayerData(player), state => state?.achievements);
}
