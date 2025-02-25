import type { Config } from "@rbxts/jest";

import { config } from "common/test/jest.config";

export default {
	...config,
	displayName: "🟢 SERVER",
} satisfies Config;
