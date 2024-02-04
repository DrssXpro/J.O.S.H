import { MaterialCategoryEnum } from "../types/menuTypes";
import { ChartListConfig } from "./charts";
import { DecorateConfig } from "./decorates";
import { InformationsConfig } from "./informations";
import { PhotosConfig } from "./photos";
import { TableListConfig } from "./tables";
import { FetchComFlagType, IMaterialConfigType } from "../types";

const componentModules: Record<string, { default: string }> = import.meta.glob("./**/component.tsx", {
	eager: true
});

const componentConfigModules: Record<string, { default: string }> = import.meta.glob("./**/configComponent.tsx", {
	eager: true
});

const imagesModules: Record<string, { default: string }> = import.meta.glob("../../assets/chart/**", {
	eager: true
});

// 组件缓存, 可以大幅度提升组件加载速度
const componentCacheMap = new Map<string, any>();
const loadConfig = (packageName: string, categoryName: string, keyName: string) => {
	const key = packageName + categoryName + keyName;
	if (!componentCacheMap.has(key)) {
		componentCacheMap.set(key, import(`./${packageName}/${categoryName}/${keyName}/config.ts`));
	}
	return componentCacheMap.get(key);
};

// 创建图表组件配置
export const createComponentConfig = async (targetData: IMaterialConfigType) => {
	const { category, key, menu } = targetData;
	const chart = await loadConfig(menu, category, key);
	return new chart.default();
};

// 获取图表组件
export const fetchComponent = (chartName: string, flag: FetchComFlagType) => {
	const module = flag === FetchComFlagType.VIEW ? componentModules : componentConfigModules;
	for (const key in module) {
		if (key.includes(chartName)) {
			return module[key].default;
		}
	}
};

// 获取图表图片资源
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

export const materialsList: Record<MaterialCategoryEnum, IMaterialConfigType[]> = {
	[MaterialCategoryEnum.CHARTS]: ChartListConfig,
	[MaterialCategoryEnum.INFORMATIONS]: InformationsConfig,
	[MaterialCategoryEnum.TABLES]: TableListConfig,
	[MaterialCategoryEnum.DECORATES]: DecorateConfig,
	[MaterialCategoryEnum.PHOTOS]: PhotosConfig
};
