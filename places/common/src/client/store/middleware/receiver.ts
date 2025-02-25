import type { ProducerMiddleware } from "@rbxts/reflex";
import { createBroadcastReceiver } from "@rbxts/reflex";

import { commonEvents as events } from "common/client/network";
import { IS_DEV, IS_EDIT } from "common/shared/constants/core";
import { stateSerDes } from "common/shared/store";

/**
 * A middleware that listens for actions dispatched from the server and
 * dispatches them to the client store.
 *
 * @returns The middleware function.
 */
export function receiverMiddleware(): ProducerMiddleware {
	// Storybook support
	if (IS_DEV && IS_EDIT) {
		return () => dispatch => dispatch;
	}

	const receiver = createBroadcastReceiver({
		start: () => {
			events.store.start.fire();
		},
	});

	events.store.dispatch.connect(actions => {
		receiver.dispatch(actions);
	});

	events.store.hydrate.connect(state => {
		receiver.hydrate(stateSerDes.deserialize(state.buffer, state.blobs));
	});

	return receiver.middleware;
}
