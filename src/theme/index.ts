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

// 渐变主题色列表（主色1、主色2、阴影、渐变1、渐变2）
export const chartColorsSearch = {
	light: ["#4992ff", "#7cffb2", "rgba(68, 181, 226, 0.3)", "rgba(73, 146, 255, 0.5)", "rgba(124, 255, 178, 0.5)"],
	customed: ["#5470c6", "#91cc75", "rgba(84, 112, 198, 0.5)", "rgba(84, 112, 198, 0.5)", "rgba(145, 204, 117, 0.5)"],
	macarons: ["#2ec7c9", "#b6a2de", "rgba(182, 162, 222, 0.3)", "rgba(46, 199, 201, 0.5)", "rgba(182, 162, 222, 0.5)"],

	walden: ["#3fb1e3", "#6be6c1", "rgba(68, 181, 226, 0.3)", "rgba(63, 177, 227, 0.5)", "rgba(107, 230, 193, 0.5)"],
	purplePassion: [
		"#9b8bba",
		"#e098c7",
		"rgba(182, 162, 222, 0.3)",
		"rgba(155, 139, 186, 0.5)",
		"rgba(237, 175, 218, 0.5)"
	],
	vintage: ["#d87c7c", "#919e8b", "rgba(182, 162, 222, 0.3)", "rgba(216, 124, 124, 0.5)", "rgba(145, 158, 139, 0.5)"],

	chalk: ["#fc97af", "#87f7cf", "rgba(135, 247, 207, 0.3)", "rgba(252, 151, 175, 0.5)", "rgba(135, 247, 207, 0.5)"],
	westeros: ["#516b91", "#edafda", "rgba(81, 107, 145, 0.3)", "rgba(81, 107, 145, 0.5)", "rgba(89, 196, 230, 0.5)"],
	wonderland: ["#4ea397", "#22c3aa", "rgba(68, 181, 226, 0.3)", "rgba(78, 163, 151, 0.5)", "rgba(34, 195, 170, 0.5)"],

	essos: ["#893448", "#d95850", "rgba(137, 52, 72, 0.3)", "rgba(137, 52, 72, 0.5)", "rgba(217, 88, 80, 0.5)"],
	shine: ["#c12e34", "#0098d9", "rgba(137, 52, 72, 0.3)", "rgba(193, 46, 52, 0.5)", "rgba(230, 182, 0, 0.5)"],
	roma: ["#e01f54", "#5e4ea5", "rgba(137, 52, 72, 0.3)", "rgba(224, 31, 84, 0.5)", "rgba(94, 78, 165, 0.5)"]
};
