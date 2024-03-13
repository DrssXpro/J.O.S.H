import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType,
	ChartFrameEnum
} from "@/materials/types";

export const ImageCarousel: IMaterialConfigType = {
	key: "ImageCarousel",
	chartCanvasKey: "ImageCarouselCanvas",
	configKey: "ImageCarouselConfig",
	title: "轮播图",
	category: InformationCategoryEnum.MORE,
	categoryName: InformationNameEnum.MORE,
	menu: MaterialCategoryEnum.INFORMATIONS,
	chartFrame: ChartFrameEnum.ANT_DESIGN,
	image: "photo_carousel.png"
};
