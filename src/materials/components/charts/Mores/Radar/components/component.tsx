import { useMemo } from "react";
import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";

const RadarComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;

	const radarOption = useMemo(() => {
		const newData = chartConfig.option.dataset;
		return {
			...chartConfig.option,
			radar: { ...chartConfig.option.radar, indicator: newData.radarIndicator },
			legend: {
				...chartConfig.option.legend,
				data: newData.seriesData.map((i: { name: string }) => i.name)
			},
			series: [
				{
					...chartConfig.option.series[0],
					data: newData.seriesData
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
			option={radarOption}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: chartConfig.rendererType }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default RadarComponent;
