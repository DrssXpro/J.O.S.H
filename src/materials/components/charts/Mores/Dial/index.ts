import {
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartCategoryEnum,
	ChartNameEnum,
	ChartFrameEnum
} from "@/materials/types";

export const Dial: IMaterialConfigType = {
	key: "Dial",
	chartCanvasKey: "DialCanvas",
	configKey: "VCDialConfig",
	title: "表盘",
	category: ChartCategoryEnum.MORE,
	categoryName: ChartNameEnum.MORE,
	menu: MaterialCategoryEnum.CHARTS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "dial.png"
};
