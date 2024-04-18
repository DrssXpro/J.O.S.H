import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const PieCircle: IMaterialConfigType = {
	key: "PieCircle",
	chartCanvasKey: "PieCircleCanvas",
	configKey: "PieCircleConfig",
	title: "饼图-环形",
	category: ChartCategoryEnum.PIE,
	categoryName: ChartNameEnum.PIE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "pie-circle.png"
};
