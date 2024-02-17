import { merge, pick } from "lodash-es";
import { globalThemeJson } from "./globalThemeJson";

export const mergeTheme = <T, U>(option: T, themeSetting: U, includes: string[]) => {
	return (option = merge({}, pick(themeSetting, includes), option));
};

// 单个图表配置与公共配置合并
export const echartOptionProfixHandle = (option: any, includes: string[]) => {
	option["backgroundColor"] = "rgba(0,0,0,0)";
	return mergeTheme(option, globalThemeJson, includes);
};
