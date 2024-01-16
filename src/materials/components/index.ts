import { MaterialCategoryEnum } from "../types/menuTypes";
import { ChartListConfig } from "./charts";
import { DecorateConfig } from "./decorates";
import { InformationsConfig } from "./informations";
import { PhotosConfig } from "./photos";
import { TableListConfig } from "./tables";
import { IMaterialConfigType } from "../types";

export const materialsList: Record<MaterialCategoryEnum, IMaterialConfigType[]> = {
	[MaterialCategoryEnum.CHARTS]: ChartListConfig,
	[MaterialCategoryEnum.INFORMATIONS]: InformationsConfig,
	[MaterialCategoryEnum.TABLES]: TableListConfig,
	[MaterialCategoryEnum.DECORATES]: DecorateConfig,
	[MaterialCategoryEnum.PHOTOS]: PhotosConfig
};
