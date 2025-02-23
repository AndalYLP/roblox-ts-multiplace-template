import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { slices } from "common/shared/store";
import { profilerMiddleware } from "common/shared/store/middleware/profiler";

export type RootStore = typeof store;
export type RootState = InferState<typeof store>;

export const store = combineProducers({ ...slices });

export const middleWares = [profilerMiddleware];
