import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType
} from "@/materials/types";

export const TextGradient: IMaterialConfigType = {
	key: "TextGradient",
	chartCanvasKey: "TextGradientCanvas",
	configKey: "TextGradientConfig",
	title: "渐变文字",
	category: InformationCategoryEnum.TEXT,
	categoryName: InformationNameEnum.TEXT,
	menu: MaterialCategoryEnum.INFORMATIONS,
	image: "text_gradient.png"
};
