import customed from "./ChartTheme/customed.json";
import light from "./ChartTheme/light.json";
import chalk from "./ChartTheme/chalk.json";
import essos from "./ChartTheme/essos.json";
import macarons from "./ChartTheme/macarons.json";
import purplePassion from "./ChartTheme/purple-passion.json";
import roma from "./ChartTheme/roma.json";
import shine from "./ChartTheme/shine.json";
import vintage from "./ChartTheme/vintage.json";
import walden from "./ChartTheme/walden.json";
import westeros from "./ChartTheme/westeros.json";
import wonderland from "./ChartTheme/wonderland.json";

export const chartColors = {
	light,
	customed,
	macarons,
	walden,
	purplePassion,
	vintage,
	chalk,
	westeros,
	wonderland,
	essos,
	shine,
	roma
};

// 自定义颜色
export type CustomColorsType = {
	id: string;
	name: string;
	color: string[];
};

// 默认主题
export const defaultTheme = "light";

export type ChartColorsNameType = keyof typeof chartColors;
