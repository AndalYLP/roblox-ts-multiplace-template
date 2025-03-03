import type { InferState } from "@rbxts/reflex";
import { combineProducers } from "@rbxts/reflex";

import { slices } from "common/shared/store";
import { profilerMiddleware } from "common/shared/store/middleware/profiler";

export type CommonRootStore = typeof commonStore;
export type CommonRootState = InferState<CommonRootStore>;

export const commonStore = combineProducers({ ...slices });

export const middleWares = [profilerMiddleware];
