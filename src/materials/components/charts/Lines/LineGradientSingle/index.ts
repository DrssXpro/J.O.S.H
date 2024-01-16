import { MaterialCategoryEnum, IMaterialConfigType, ChartCategoryEnum, ChartNameEnum } from "@/materials/types";

export const LineGradientSingle: IMaterialConfigType = {
	key: "LineGradientSingle",
	chartCanvasKey: "LineGradientSingleCanvas",
	configKey: "LineGradientSingleConfig",
	title: "单折线渐变面积图",
	category: ChartCategoryEnum.LINE,
	categoryName: ChartNameEnum.LINE,
	menu: MaterialCategoryEnum.CHARTS,
	image: "line_gradient_single.png"
};
