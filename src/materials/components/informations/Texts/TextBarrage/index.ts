import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const TextBarrage: IMaterialConfigType = {
	key: "TextBarrage",
	chartCanvasKey: "TextBarrageCanvas",
	configKey: "TextBarrageConfig",
	title: "弹幕文字",
	category: InformationCategoryEnum.TEXT,
	categoryName: InformationNameEnum.TEXT,
	menu: MaterialCategoryEnum.INFORMATIONS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "text_barrage.png"
};
