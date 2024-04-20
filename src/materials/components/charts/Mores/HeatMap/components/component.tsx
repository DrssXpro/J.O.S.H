import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

const HeatMapComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;

	const heatMapOption = useMemo(() => {
		const { seriesData, xAxis, yAxis } = chartConfig.option.dataset;
		return {
			...chartConfig.option,
			xAxis: {
				...chartConfig.option.xAxis,
				data: xAxis
			},
			yAxis: {
				...chartConfig.option.yAxis,
				data: yAxis
			},
			series: [
				{
					...chartConfig.option.series[0],
					data: seriesData
				}
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
			option={heatMapOption}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: chartConfig.rendererType }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default HeatMapComponent;
