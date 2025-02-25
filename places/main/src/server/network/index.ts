import Log from "@rbxts/log";

import { IS_DEV } from "common/shared/constants/core";
import { globalEvents, globalFunctions } from "common/shared/network";

export const events = globalEvents.createServer({
	warnOnInvalidGuards: IS_DEV,
});
export const functions = globalFunctions.createServer({
	warnOnInvalidGuards: IS_DEV,
});

if (IS_DEV) {
	globalEvents.registerHandler("onBadRequest", (player, message) => {
		Log.Warn(`Bad request from ${player.UserId}: ${message}`);
	});

	globalFunctions.registerHandler("onBadResponse", (player, message) => {
		Log.Warn(`Bad response from ${player.UserId}: ${message}`);
	});
}
