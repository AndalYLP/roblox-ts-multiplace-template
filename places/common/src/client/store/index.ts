import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { receiverMiddleware } from "common/client/store/middleware/receiver";
import { slices } from "common/shared/store";
import { profilerMiddleware } from "common/shared/store/middleware/profiler";

export type CommonRootStore = typeof commonStore;
export type CommonRootState = InferState<CommonRootStore>;

export const commonStore = combineProducers({ ...slices });

commonStore.applyMiddleware(profilerMiddleware, receiverMiddleware());
