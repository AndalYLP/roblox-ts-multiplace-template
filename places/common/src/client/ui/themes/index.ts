import type { ThemeColors } from "common/client/ui/themes/colors";
import type { ThemeFonts } from "common/client/ui/themes/fonts";
import type { ThemeImages } from "common/client/ui/themes/images";

export * from "common/client/ui/themes/configs";
export * from "common/client/ui/themes/fonts";
export * from "common/client/ui/themes/images";

export interface Theme {
	colors: ThemeColors;
	fonts: ThemeFonts;
	images: ThemeImages;
}
