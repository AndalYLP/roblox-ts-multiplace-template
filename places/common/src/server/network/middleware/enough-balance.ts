import type { Networking } from "@flamework/networking";
import Log from "@rbxts/log";
import type { Selector } from "@rbxts/reflex";

import type { CommonRootState as RootState } from "common/server/store";
import { commonStore as store } from "common/server/store";

export function enoughBalance<I extends [number, ...Array<unknown>]>(
	selector: (player: Player) => Selector<RootState, number | undefined>,
): Networking.EventMiddleware<I> {
	return processNext => {
		return (player, ...args) => {
			if (!player) {
				Log.Fatal("Only client events allowed.");
				return;
			}

			const [amount] = args;
			const balance = store.getState(selector(player));

			if (balance! < amount) {
				return;
			}

			void processNext(player, ...args);
		};
	};
}
