import type { ThemeColors } from "common/client/ui/themes/colors";
import type { ThemeFonts } from "common/client/ui/themes/fonts";
import type { ThemeImages } from "common/client/ui/themes/images";

export * from "./configs";
export * from "./fonts";
export * from "./images";

export interface Theme {
	colors: ThemeColors;
	fonts: ThemeFonts;
	images: ThemeImages;
}
