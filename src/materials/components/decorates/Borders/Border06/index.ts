import {
	DecorateCategoryEnum,
	DecorateNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const Border06: IMaterialConfigType = {
	key: "Border06",
	chartCanvasKey: "Border06Canvas",
	configKey: "Border06Config",
	title: "边框-06",
	category: DecorateCategoryEnum.BORDER,
	categoryName: DecorateNameEnum.BORDER,
	menu: MaterialCategoryEnum.DECORATES,
	chartFrame: ChartFrameEnum.STATIC,
	image: "border06.png"
};
