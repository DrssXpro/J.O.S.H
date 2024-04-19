import { useMemo } from "react";
import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";

const DialComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;

	const dialOption = useMemo(() => {
		let newData = chartConfig.option.dataset;
		newData = Number(newData) ? Number(newData) : newData;
		return {
			...chartConfig.option,
			series: [
				{
					...chartConfig.option.series[0],
					data: [{ ...chartConfig.option.series[0].data[0], value: newData }]
				},
				chartConfig.option.series[1]
			]
		};
	}, [chartConfig.option]);

	useChartDataFetch(
		chartConfig,
		(err) => {
			requestErrorCallback && requestErrorCallback(err);
		},
		() => {
			requestSuccessCallback && requestSuccessCallback();
		}
	);

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
