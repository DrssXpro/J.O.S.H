import { fetchComponent } from "@/materials/components";
import { FetchComFlagType } from "@/materials/types";
import { IComponent } from "@/store/chartStore/types";

const loadComponent = (item: IComponent): IComponent => {
	// 获取图表组件
	const ChartComponent: any = fetchComponent(item.key, FetchComFlagType.VIEW);

	return {
		...item,
		ChartComponent
	};
};

export { loadComponent };
