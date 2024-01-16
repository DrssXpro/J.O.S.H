import { MaterialCategoryEnum, IMaterialConfigType, ChartCategoryEnum, ChartNameEnum } from "@/materials/types";

export const BarCrossrange: IMaterialConfigType = {
	key: "BarCrossrange",
	chartCanvasKey: "BarCrossrangeCanvas",
	configKey: "BarCrossrangeConfig",
	title: "横向柱状图",
	category: ChartCategoryEnum.BAR,
	categoryName: ChartNameEnum.BAR,
	menu: MaterialCategoryEnum.CHARTS,
	image: "bar_y.png"
};
