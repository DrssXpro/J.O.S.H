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
	const { redirectComponent, category, key, menu } = targetData;
	// redirectComponent 处理手动上传图片组件
	if (redirectComponent) {
		const [packageName, categoryName, keyName] = redirectComponent.split("/");
		const redirectChart = await loadConfig(packageName, categoryName, keyName);
		return new redirectChart.default();
	}
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
	// 正则判断图片是否为 url，是则直接返回该 url
	if (/^(http|https):\/\/([\w.]+\/?)\S*/.test(target.image)) return target.image;
	// 新数据动态处理
	const { image } = target;
	// 兼容旧数据
	if (image.includes("@") || image.includes("base64")) return image;
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
