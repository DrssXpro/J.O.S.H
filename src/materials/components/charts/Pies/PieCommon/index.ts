import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const PieCommon: IMaterialConfigType = {
	key: "PieCommon",
	chartCanvasKey: "PieCommonCanvas",
	configKey: "PieCommonConfig",
	title: "饼图",
	category: ChartCategoryEnum.PIE,
	categoryName: ChartNameEnum.PIE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "pie.png"
};
