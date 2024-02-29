import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";

const BarLineComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback } = props;
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
			option={chartConfig.option}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: chartConfig.rendererType }}
		/>
	);
};

export default BarLineComponent;
