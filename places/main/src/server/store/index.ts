import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { profilerMiddleware } from "common/shared/store/middleware/profiler";

export type RootStore = typeof store;
export type RootState = InferState<typeof store>;

export const store = combineProducers({});

export const middleWares = [profilerMiddleware];
