import type { UseProducerHook } from "@rbxts/react-reflex";
import { useProducer } from "@rbxts/react-reflex";

import type { RootStore } from "common/client/store";

export const useStore: UseProducerHook<RootStore> = useProducer;
