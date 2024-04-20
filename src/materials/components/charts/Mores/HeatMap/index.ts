import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const HeatMap: IMaterialConfigType = {
	key: "HeatMap",
	chartCanvasKey: "HeatMapCanvas",
	configKey: "VCHeatMapConfig",
	title: "热力图",
	category: ChartCategoryEnum.MORE,
	categoryName: ChartNameEnum.MORE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "heatmap.png"
};
