import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const Funnel: IMaterialConfigType = {
	key: "Funnel",
	chartCanvasKey: "FunnelCanvas",
	configKey: "VCFunnelConfig",
	title: "漏斗图",
	category: ChartCategoryEnum.MORE,
	categoryName: ChartNameEnum.MORE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "funnel.png"
};
