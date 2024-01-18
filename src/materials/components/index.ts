import { MaterialCategoryEnum } from "../types/menuTypes";
import { ChartListConfig } from "./charts";
import { DecorateConfig } from "./decorates";
import { InformationsConfig } from "./informations";
import { PhotosConfig } from "./photos";
import { TableListConfig } from "./tables";
import { IMaterialConfigType } from "../types";

const imagesModules: Record<string, { default: string }> = import.meta.glob("../../assets/chart/**", {
	eager: true
});

export const materialsList: Record<MaterialCategoryEnum, IMaterialConfigType[]> = {
	[MaterialCategoryEnum.CHARTS]: ChartListConfig,
	[MaterialCategoryEnum.INFORMATIONS]: InformationsConfig,
	[MaterialCategoryEnum.TABLES]: TableListConfig,
	[MaterialCategoryEnum.DECORATES]: DecorateConfig,
	[MaterialCategoryEnum.PHOTOS]: PhotosConfig
};

export const fetchImages = async (target?: IMaterialConfigType) => {
	if (!target) return "";
	const { image } = target;
	for (const key in imagesModules) {
		const urlSplit = key.split("/");
		if (urlSplit[urlSplit.length - 1] === image) {
			return imagesModules[key]?.default;
		}
	}
	return "";
};
