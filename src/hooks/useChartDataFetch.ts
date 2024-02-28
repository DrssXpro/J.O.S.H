import { ChartFrameEnum, ComponentType } from "@/materials/types";
import useChartStore from "@/store/chartStore/chartStore";
import { RequestDataValueEnum } from "@/types/HttpTypes";
import useEditCharts from "./useEditCharts";
import { customizeHttp } from "@/service/http";
import { intervalUnitHandle, isPreview, newFunctionHandle } from "@/utils/utils";

// 控制 hook 更新数据后重复执行开启轮询
let isStart = false;

const useChartDataFetch = (
	targetComponent: ComponentType,
	requestErrorCallback: (error: any) => void,
	requestSuccessCallback: () => void
) => {
	const { updateChartConfig, requestGlobalConfig } = useChartStore();
	const { getTargetChartIndex } = useEditCharts();

	// 轮询定时器 id
	let fetchInterval: any = 0;

	// 当前组件索引
	const chartIndex = getTargetChartIndex(targetComponent.id)!;

	// eCharts dataset 图表获取数据更新
	const echartsUpdateHandle = (dataset: any) => {
		if (targetComponent.chartConfig.chartFrame === ChartFrameEnum.ECHARTS && chartIndex !== -1) {
			updateChartConfig(chartIndex, "option", "dataset", dataset);
		}
	};

	// 轮询请求配置数据接口
	const requestIntervalFn = () => {
		// 全局数据 API 配置
		const {
			requestOriginUrl,
			requestIntervalUnit: globalUnit,
			requestInterval: globalRequestInterval
		} = requestGlobalConfig;

		// 单个组件数据 API 配置
		const {
			requestDataType,
			requestUrl,
			requestIntervalUnit: targetUnit,
			requestInterval: targetInterval
		} = targetComponent.request;
		// 非请求类型

		if (requestDataType === RequestDataValueEnum.STATIC) return;

		// 开启轮询
		isStart = true;

		if (requestUrl) {
			// 拼接请求地址 （requestOriginUrl 允许为空）
			const completePath = requestOriginUrl && requestOriginUrl + requestUrl;
			if (!completePath) return;

			clearInterval(fetchInterval);

			const fetchFn = async () => {
				try {
					const res = await customizeHttp(targetComponent.request, requestGlobalConfig);
					if (res) {
						const filter = targetComponent.filter;
						const { data } = res;
						// 成功获取数据回调
						requestSuccessCallback();
						echartsUpdateHandle(newFunctionHandle(data, res, filter));
					}
				} catch (error) {
					// 请求错误回调，更改视图显示错误状态
					requestErrorCallback(error);
				}
			};

			// 定时时间
			const time = targetInterval ? targetInterval : globalRequestInterval;
			// 单位
			const unit = targetInterval ? targetUnit : globalUnit;
			// 开启轮询
			if (time) {
				fetchInterval = setInterval(fetchFn, intervalUnitHandle(time, unit));
			} else {
				fetchFn();
			}
		}
	};

	// 预览页开始轮询
	isPreview() && !isStart && requestIntervalFn();
};

export default useChartDataFetch;
