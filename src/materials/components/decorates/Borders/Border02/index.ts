import {
	DecorateCategoryEnum,
	DecorateNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const Border02: IMaterialConfigType = {
	key: "Border02",
	chartCanvasKey: "Border02Canvas",
	configKey: "Border02Config",
	title: "边框-02",
	category: DecorateCategoryEnum.BORDER,
	categoryName: DecorateNameEnum.BORDER,
	menu: MaterialCategoryEnum.DECORATES,
	chartFrame: ChartFrameEnum.STATIC,
	image: "border02.png"
};
