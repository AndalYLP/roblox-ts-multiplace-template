import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { receiverMiddleware } from "common/client/store/middleware/receiver";
import { profilerMiddleware } from "common/shared/store/middleware/profiler";

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

export const store = combineProducers({});

store.applyMiddleware(profilerMiddleware, receiverMiddleware());
