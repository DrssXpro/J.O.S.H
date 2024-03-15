import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const Image: IMaterialConfigType = {
	key: "Image",
	chartCanvasKey: "ImageCanvas",
	configKey: "ImageConfig",
	title: "图片",
	category: InformationCategoryEnum.MORE,
	categoryName: InformationNameEnum.MORE,
	menu: MaterialCategoryEnum.INFORMATIONS,
	chartFrame: ChartFrameEnum.COMMON,
	image: "photo.png"
};
