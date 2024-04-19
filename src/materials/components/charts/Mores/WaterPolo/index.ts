import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const WaterPolo: IMaterialConfigType = {
	key: "WaterPolo",
	chartCanvasKey: "WaterPoloCanvas",
	configKey: "VCWaterPoloConfig",
	title: "水球图",
	category: ChartCategoryEnum.MORE,
	categoryName: ChartNameEnum.MORE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "water_WaterPolo.png"
};
