import { useMemo } from "react";
import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";
import "echarts-liquidfill";

const WaterPoloComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;

	const waterPoloOption = useMemo(() => {
		let newData = chartConfig.option.dataset;
		if (typeof newData === "string" || typeof newData === "number")
			newData = typeof newData === "string" ? parseFloat(newData) : newData;
		return {
			...chartConfig.option,
			series: [{ ...chartConfig.option.series[0], data: [parseFloat(newData.toFixed(2))] }]
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
			option={waterPoloOption}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: chartConfig.rendererType }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default WaterPoloComponent;
