import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { profilerMiddleware } from "common/shared/store/middleware/profiler";

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

export const store = combineProducers({});

export const middleWares = [profilerMiddleware];
