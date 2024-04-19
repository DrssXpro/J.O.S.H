import { useMemo } from "react";
import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";

const PieCircleComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;

	const pieCircleOption = useMemo(() => {
		const newData = chartConfig.option.dataset;
		const d = parseFloat(`${newData}`) * 100;
		return {
			...chartConfig.option,
			title: {
				...chartConfig.option.title,
				text: `${+d.toFixed(2)}%`
			},
			series: [
				{
					...chartConfig.option.series[0],
					data: [
						{ ...chartConfig.option.series[0].data[0], value: [d] },
						{ ...chartConfig.option.series[0].data[1], value: [100 - d] }
					]
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
			option={pieCircleOption}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: chartConfig.rendererType }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default PieCircleComponent;
