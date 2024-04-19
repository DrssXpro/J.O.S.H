import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const DialComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;
	const [dialOption, setDialOption] = useState(chartConfig.option);
	useChartDataFetch(
		chartConfig,
		(err) => {
			requestErrorCallback && requestErrorCallback(err);
		},
		() => {
			requestSuccessCallback && requestSuccessCallback();
		}
	);

	// dataset change => 手动更新表盘数据
	useEffect(() => {
		dataHandle(chartConfig.option.dataset);
	}, [chartConfig.option.dataset]);

	const dataHandle = (newData: any) => {
		if (!Number(newData)) return;
		setDialOption({
			...dialOption,
			series: [
				{ ...dialOption.series[0], data: [{ ...dialOption.series[0].data[0], value: Number(newData) }] },
				dialOption.series[1]
			]
		});
	};

	return (
		<ReactECharts
			theme={themeColor}
			option={dialOption}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: chartConfig.rendererType }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default DialComponent;
