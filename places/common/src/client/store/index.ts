import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { slices } from "common/shared/store";
import { profilerMiddleware } from "common/shared/store/middleware/profiler";

import { receiverMiddleware } from "./middleware/receiver";

export type RootStore = typeof store;
export type RootState = InferState<RootStore>;

export const store = combineProducers({ ...slices });

store.applyMiddleware(profilerMiddleware, receiverMiddleware());
