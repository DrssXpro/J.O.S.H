import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const LineCommon: IMaterialConfigType = {
	key: "LineCommon",
	chartCanvasKey: "LineCommonCanvas",
	configKey: "VCLineCommonConfig",
	title: "折线图",
	category: ChartCategoryEnum.LINE,
	categoryName: ChartNameEnum.LINE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.ECHARTS,
	image: "line.png"
};
