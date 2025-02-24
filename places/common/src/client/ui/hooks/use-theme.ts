import { useSelector } from "@rbxts/react-reflex";

import { selectPlayerTheme } from "common/client/store/slices/theme/theme.selectors";
import type { Theme } from "common/client/ui/themes";

export function useTheme(): Theme {
	return useSelector(selectPlayerTheme);
}
