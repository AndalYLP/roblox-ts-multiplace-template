import { Flamework, Modding } from "@flamework/core";
import type Abbreviator from "@rbxts/abbreviate";
import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";

import { middleWares, store } from "common/server/store";
import { broadcasterMiddleware } from "common/server/store/middleware/broadcaster";
import { FLAMEWORK_IGNITED } from "common/shared/constants/core";
import { setupAbbreviator } from "common/shared/functions/abbreviator";
import { setupLogger } from "common/shared/functions/logger";

async function start(): Promise<void> {
	setupLogger();
	const abbreviator = setupAbbreviator();

	Log.Info("Applying store middlewares...");
	store.applyMiddleware(broadcasterMiddleware(), ...middleWares);

	Modding.registerDependency<Logger>(ctor => Log.ForContext(ctor));
	Modding.registerDependency<Abbreviator>(() => abbreviator);

	Flamework.addPaths("places/common/src/server/services");
	Flamework.addPaths("places/common/src/server/components");
	Flamework.addPaths("places/common/src/shared/components");

	Flamework.addPaths("places/main/src/server/services");
	Flamework.addPaths("places/main/src/server/components");
	Flamework.addPaths("places/main/src/shared/components");

	Log.Info("Starting Flamework...");
	Flamework.ignite();
}

start()
	.then(() => {
		FLAMEWORK_IGNITED.Fire();
	})
	.catch(err => {
		Log.Fatal(`Error while running server: ${err}`);
	});
