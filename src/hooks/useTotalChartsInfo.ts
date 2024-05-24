import useChartStore from "@/store/chartStore/chartStore";
import useStoreSelector from "./useStoreSelector";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { omit } from "lodash-es";
import { JSONParse } from "@/utils/utils";
import { IComponent } from "@/store/chartStore/types";
import { RequestGlobalConfigType } from "@/types/HttpTypes";
import { ICanvasConfig } from "@/store/canvasStore/types";
import { fetchComponent } from "@/materials/components";
import { FetchComFlagType } from "@/materials/types";

interface TotalChartInfo {
	componentList: IComponent[];
	requestGlobalConfig: RequestGlobalConfigType;
	canvasConfig: ICanvasConfig;
}

const useTotalChartsInfo = () => {
	const { getChartConfigs, addComponentList, setrequestGlobalConfig } = useChartStore(
		useStoreSelector(["getChartConfigs", "addComponentList", "setrequestGlobalConfig"])
	);
	const { getGlobalCanvasConfig, setGlobalCanvasConfig } = useCanvasStore(
		useStoreSelector(["getGlobalCanvasConfig", "setGlobalCanvasConfig"])
	);

	// 获取大屏所有数据
	const getTotalChartsInfo = () => {
		const chartConfigs = getChartConfigs();
		const canvasConfig = getGlobalCanvasConfig();
		return {
			canvasConfig,
			...chartConfigs,
			// 移除 jsx 组件文本属性
			componentList: chartConfigs.componentList.map((i) => {
				return omit(i, ["ChartComponent", "ChartConfigComponent"]);
			})
		};
	};

	// 保存大屏数据至 store
	const setTotalChartsInfo = (config: string | Record<string, any>, getConfigComponent = true) => {
		const { componentList, requestGlobalConfig, canvasConfig }: TotalChartInfo =
			typeof config === "string" ? JSONParse(config) : config;
		// 组件注册
		componentList.forEach((com) => {
			// 获取图表组件
			const ChartComponent: any = fetchComponent(com.key, FetchComFlagType.VIEW);
			// 获取图表配置组件
			const ChartConfigComponent: any = getConfigComponent
				? fetchComponent(com.key, FetchComFlagType.CONFIG)
				: undefined;
			addComponentList({ ...com, ChartComponent, ChartConfigComponent });
		});

		// 全局请求设置
		setrequestGlobalConfig(requestGlobalConfig);
		// 全局 canvas 设置
		setGlobalCanvasConfig(canvasConfig);
	};

	return {
		getTotalChartsInfo,
		setTotalChartsInfo
	};
};

export default useTotalChartsInfo;
