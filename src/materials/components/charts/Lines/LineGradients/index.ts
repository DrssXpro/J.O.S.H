import { MaterialCategoryEnum, IMaterialConfigType, ChartCategoryEnum, ChartNameEnum } from "@/materials/types";

export const LineGradients: IMaterialConfigType = {
	key: "LineGradients",
	chartCanvasKey: "LineGradientsCanvas",
	configKey: "LineGradientsConfig",
	title: "双折线渐变面积图",
	category: ChartCategoryEnum.LINE,
	categoryName: ChartNameEnum.LINE,
	menu: MaterialCategoryEnum.CHARTS,
	image: "line_gradient.png"
};
