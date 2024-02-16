import themeJson from "./global.theme.json";

type ThemeJsonType = typeof themeJson;
export interface GlobalThemeJsonType extends Partial<ThemeJsonType> {
	dataset?: any;
	[T: string]: any;
}
export const globalThemeJson = { ...themeJson, dataset: null };
