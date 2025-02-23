import { Flamework } from "@flamework/core";

import type { PlayerData } from "common/shared/store/slices/player";

export const validate = Flamework.createGuard<PlayerData>();
