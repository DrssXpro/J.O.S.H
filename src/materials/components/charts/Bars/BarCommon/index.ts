import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const BarCommon: IMaterialConfigType = {
	key: "BarCommon",
	chartCanvasKey: "BarCommonCanvas",
	configKey: "BarCommonConfig",
	title: "柱状图",
	category: ChartCategoryEnum.BAR,
	categoryName: ChartNameEnum.BAR,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "bar_x.png"
};
