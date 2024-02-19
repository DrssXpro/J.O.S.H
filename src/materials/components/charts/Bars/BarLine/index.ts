import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const BarLine: IMaterialConfigType = {
	key: "BarLine",
	chartCanvasKey: "BarLineCanvas",
	configKey: "BarLineConfig",
	title: "柱状图 & 折线图",
	category: ChartCategoryEnum.BAR,
	categoryName: ChartNameEnum.BAR,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "bar_line.png"
};
