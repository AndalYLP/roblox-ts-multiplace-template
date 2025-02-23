interface ReplicatedStorage {
	rbxts_include: {
		Promise: ModuleScript;
		RuntimeLib: ModuleScript;
	} & Folder;
	TS: {
		__test__: Folder;
		components: Folder;
	} & Folder;
	"TS-common": {
		__test__: Folder;
		components: {
			abstract: {
				destroyable: ModuleScript;
				interactable: {
					clickable: ModuleScript;
					proximity: ModuleScript;
					touch: ModuleScript;
				} & Folder;
			} & Folder;
			"interactable-handle": ModuleScript;
		} & Folder;
		constants: {
			core: ModuleScript;
			player: ModuleScript;
		} & Folder;
		decorators: {
			debugging: {
				"log-execution-time": ModuleScript;
				"test-method": ModuleScript;
			} & ModuleScript;
			predicate: ModuleScript;
			"rate-limits": {
				debounce: ModuleScript;
				throttle: ModuleScript;
			} & Folder;
		} & Folder;
		functions: {
			abbreviator: ModuleScript;
			"game-config": ModuleScript;
			logger: ModuleScript;
			"with-multiplayer": ModuleScript;
		} & Folder;
		modules: {
			"3dSound": ModuleScript;
		} & Folder;
		network: {
			remotes: Folder;
		} & ModuleScript;
		store: {
			middleware: {
				profiler: ModuleScript;
			} & Folder;
			slices: {
				player: {
					achievements: {
						"achievements.selectors": ModuleScript;
						"achievements.slice": ModuleScript;
						"achievements.types": ModuleScript;
					} & Folder;
					balance: {
						"balance.selectors": ModuleScript;
						"balance.slice": ModuleScript;
						"balance.types": ModuleScript;
					} & Folder;
					mtx: {
						"mtx.selectors": ModuleScript;
						"mtx.slice": ModuleScript;
						"mtx.types": ModuleScript;
					} & Folder;
					"player.selectors": ModuleScript;
					"player.types": ModuleScript;
					settings: {
						audio: {
							"audio.selectors": ModuleScript;
							"audio.slice": ModuleScript;
							"audio.types": ModuleScript;
						} & Folder;
						"settings.selectors": ModuleScript;
						"settings.types": ModuleScript;
					} & ModuleScript;
				} & ModuleScript;
			} & Folder;
		} & ModuleScript;
	} & Folder;
	"TS-common-utils": {
		"core-call": ModuleScript;
		flamework: ModuleScript;
		"no-yield": ModuleScript;
		physics: ModuleScript;
		player: ModuleScript;
	} & Folder;
	"TS-types": {
		enum: {
			badge: ModuleScript;
			mtx: ModuleScript;
		} & Folder;
		interfaces: {
			components: Folder;
		} & Folder;
		utils: Folder;
	} & Folder;
	"TS-utils": {
		"core-call": ModuleScript;
		flamework: ModuleScript;
		"no-yield": ModuleScript;
		physics: ModuleScript;
		player: ModuleScript;
	} & Folder;
}

interface ServerScriptService {
	TS: {
		__test__: Folder;
		components: Folder;
		runtime: Script;
		services: Folder;
	} & Folder;
	"TS-common": {
		__test__: {
			"example.spec": ModuleScript;
			"jest.config": ModuleScript;
		} & Folder;
		components: Folder;
		network: {
			middleware: {
				"enough-balance": ModuleScript;
				throttle: ModuleScript;
			} & Folder;
		} & ModuleScript;
		services: {
			mtx: {
				events: {
					"game-passes": ModuleScript;
					products: ModuleScript;
				} & Folder;
			} & ModuleScript;
			player: {
				badge: ModuleScript;
				character: ModuleScript;
				data: {
					validate: ModuleScript;
				} & ModuleScript;
				entity: ModuleScript;
				leaderstats: ModuleScript;
				removal: ModuleScript;
				"with-player-entity": ModuleScript;
			} & ModuleScript;
		} & Folder;
		store: {
			middleware: {
				broadcaster: ModuleScript;
			} & Folder;
		} & ModuleScript;
	} & Folder;
}

interface TestService {
	"jest.config": ModuleScript;
	runtime: Script;
}

interface Workspace {
	Baseplate: Part;
}
