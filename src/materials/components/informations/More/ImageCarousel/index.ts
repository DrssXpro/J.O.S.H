import {
	InformationCategoryEnum,
	InformationNameEnum,
	MaterialCategoryEnum,
	IMaterialConfigType
} from "@/materials/types";

export const ImageCarousel: IMaterialConfigType = {
	key: "ImageCarousel",
	chartCanvasKey: "ImageCarouselCanvas",
	configKey: "ImageCarouselConfig",
	title: "轮播图",
	category: InformationCategoryEnum.MORE,
	categoryName: InformationNameEnum.MORE,
	menu: MaterialCategoryEnum.INFORMATIONS,
	image: "photo_carousel.png"
};
