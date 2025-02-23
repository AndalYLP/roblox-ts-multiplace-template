import { Flamework, Modding } from "@flamework/core";
import type Abbreviator from "@rbxts/abbreviate";
import type { Logger } from "@rbxts/log";
import Log from "@rbxts/log";

import { createApp, reactConfig } from "common/client/ui/app/config";
import { FLAMEWORK_IGNITED } from "common/shared/constants/core";
import { setupAbbreviator } from "common/shared/functions/abbreviator";
import { setupLogger } from "common/shared/functions/logger";

async function start(): Promise<void> {
	setupLogger();
	reactConfig();
	const abbreviator = setupAbbreviator();

	Modding.registerDependency<Logger>(ctor => Log.ForContext(ctor));
	Modding.registerDependency<Abbreviator>(() => abbreviator);

	Flamework.addPaths("places/common/src/client/controllers");
	Flamework.addPaths("places/common/src/client/components");
	Flamework.addPaths("places/common/src/shared/components");

	Flamework.addPaths("places/main/src/client/controllers");
	Flamework.addPaths("places/main/src/client/components");
	Flamework.addPaths("places/main/src/shared/components");

	Log.Info("Starting Flamework...");
	Flamework.ignite();

	createApp().catch(() => {
		Log.Fatal(`Failed to create React app!`);
	});
}

start()
	.then(() => {
		FLAMEWORK_IGNITED.Fire();
	})
	.catch(err => {
		Log.Fatal(`Error while running client: ${err}`);
	});
