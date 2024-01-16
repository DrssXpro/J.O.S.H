import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType
} from "@/materials/types";

export const TextBarrage: IMaterialConfigType = {
	key: "TextBarrage",
	chartCanvasKey: "TextBarrageCanvas",
	configKey: "TextBarrageConfig",
	title: "渐变文字",
	category: InformationCategoryEnum.TEXT,
	categoryName: InformationNameEnum.TEXT,
	menu: MaterialCategoryEnum.INFORMATIONS,
	image: "text_barrage.png"
};
