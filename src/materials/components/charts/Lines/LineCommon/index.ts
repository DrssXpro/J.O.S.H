import { MaterialCategoryEnum, IMaterialConfigType, ChartCategoryEnum, ChartNameEnum } from "@/materials/types";

export const LineCommon: IMaterialConfigType = {
	key: "LineCommon",
	chartCanvasKey: "LineCommonCanvas",
	configKey: "VCLineCommonConfig",
	title: "折线图",
	category: ChartCategoryEnum.LINE,
	categoryName: ChartNameEnum.LINE,
	menu: MaterialCategoryEnum.CHARTS,
	image: "line.png"
};
