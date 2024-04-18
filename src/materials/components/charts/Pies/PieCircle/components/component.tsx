import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";

const PieCircleComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;
	const [pieCircleOption, setPieCircleOption] = useState(chartConfig.option);
	useChartDataFetch(
		chartConfig,
		(err) => {
			requestErrorCallback && requestErrorCallback(err);
		},
		() => {
			requestSuccessCallback && requestSuccessCallback();
		}
	);

	// dataset change => 手动更新饼图数据
	useEffect(() => {
		dataHandle(chartConfig.option.dataset);
	}, [chartConfig.option.dataset]);

	const dataHandle = (newData: any) => {
		const d = parseFloat(`${newData}`) * 100;
		const newOptions = { ...pieCircleOption };
		newOptions.title = { ...newOptions.title, text: `${+d.toFixed(2)}%` };
		newOptions.series = [
			{
				...newOptions.series[0],
				data: [
					{ ...newOptions.series[0].data[0], value: [d] },
					{ ...newOptions.series[0].data[1], value: [100 - d] }
				]
			}
		];
		setPieCircleOption(newOptions);
	};

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
