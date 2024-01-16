import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType
} from "@/materials/types";

export const TextCommon: IMaterialConfigType = {
	key: "TextCommon",
	chartCanvasKey: "TextCommonCanvas",
	configKey: "TextCommonConfig",
	title: "文字",
	category: InformationCategoryEnum.TEXT,
	categoryName: InformationNameEnum.TEXT,
	menu: MaterialCategoryEnum.INFORMATIONS,
	image: "text_static.png"
};
