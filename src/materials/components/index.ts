import { MaterialCategoryEnum } from "../types/menuTypes";
import { ChartListConfig } from "./charts";
import { DecorateConfig } from "./decorates";
import { InformationsConfig } from "./informations";
import { PhotosConfig } from "./photos";
import { TableListConfig } from "./tables";
import { IMaterialConfigType } from "../types";

const componentModules: Record<string, { default: string }> = import.meta.glob("./**/component.tsx", {
	eager: true
});

const imagesModules: Record<string, { default: string }> = import.meta.glob("../../assets/chart/**", {
	eager: true
});

export const fetchComponent = (chartName: string) => {
	const module = componentModules;
	for (const key in module) {
		if (key.includes(chartName)) {
			return module[key].default;
		}
	}
};

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
