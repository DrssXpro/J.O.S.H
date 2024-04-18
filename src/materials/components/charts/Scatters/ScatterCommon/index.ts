import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const ScatterCommon: IMaterialConfigType = {
	key: "ScatterCommon",
	chartCanvasKey: "ScatterCommonCanvas",
	configKey: "ScatterCommonConfig",
	title: "散点图",
	category: ChartCategoryEnum.SCATTER,
	categoryName: ChartNameEnum.SCATTER,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "scatter-multi.png"
};
