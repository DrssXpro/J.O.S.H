import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const LineLinearSingle: IMaterialConfigType = {
	key: "LineLinearSingle",
	chartCanvasKey: "LineLinearSingleCanvas",
	configKey: "LineLinearSingleConfig",
	title: "单折线渐变图",
	category: ChartCategoryEnum.LINE,
	categoryName: ChartNameEnum.LINE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "line_linear_single.png"
};
