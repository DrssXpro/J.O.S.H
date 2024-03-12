import {
	DecorateCategoryEnum,
	DecorateNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const Border05: IMaterialConfigType = {
	key: "Border05",
	chartCanvasKey: "Border05Canvas",
	configKey: "Border05Config",
	title: "边框-05",
	category: DecorateCategoryEnum.BORDER,
	categoryName: DecorateNameEnum.BORDER,
	menu: MaterialCategoryEnum.DECORATES,
	chartFrame: ChartFrameEnum.STATIC,
	image: "border05.png"
};
