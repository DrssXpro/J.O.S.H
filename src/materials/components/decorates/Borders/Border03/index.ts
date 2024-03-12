import {
	DecorateCategoryEnum,
	DecorateNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const Border03: IMaterialConfigType = {
	key: "Border03",
	chartCanvasKey: "Border03Canvas",
	configKey: "Border03Config",
	title: "边框-03",
	category: DecorateCategoryEnum.BORDER,
	categoryName: DecorateNameEnum.BORDER,
	menu: MaterialCategoryEnum.DECORATES,
	chartFrame: ChartFrameEnum.STATIC,
	image: "border03.png"
};
