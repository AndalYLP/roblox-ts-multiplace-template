import type { Theme } from "common/client/ui/themes";
import { Themes } from "common/client/ui/themes";
import type { SharedState } from "common/shared/store";

export function selectPlayerTheme(_state: SharedState): Theme {
	return Themes.defaultTheme;
}
