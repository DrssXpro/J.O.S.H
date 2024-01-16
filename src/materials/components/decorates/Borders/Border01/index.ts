import { DecorateCategoryEnum, DecorateNameEnum, MaterialCategoryEnum, IMaterialConfigType } from "@/materials/types";

export const Border01: IMaterialConfigType = {
	key: "Border01",
	chartCanvasKey: "Border01Canvas",
	configKey: "Border01Config",
	title: "边框-01",
	category: DecorateCategoryEnum.BORDER,
	categoryName: DecorateNameEnum.BORDER,
	menu: MaterialCategoryEnum.DECORATES,
	image: "border01.png"
};
