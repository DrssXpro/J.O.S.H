import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const MapBase: IMaterialConfigType = {
	key: "MapBase",
	chartCanvasKey: "MapBaseCanvas",
	configKey: "VCMapBaseConfig",
	title: "地图(可选省份)",
	category: ChartCategoryEnum.MAP,
	categoryName: ChartNameEnum.MAP,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "map.png"
};
