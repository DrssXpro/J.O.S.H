import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const Radar: IMaterialConfigType = {
	key: "Radar",
	chartCanvasKey: "RadarCanvas",
	configKey: "VCRadarConfig",
	title: "雷达图",
	category: ChartCategoryEnum.MORE,
	categoryName: ChartNameEnum.MORE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "radar.png"
};
