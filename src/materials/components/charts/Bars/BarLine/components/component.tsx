import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";

const BarLineComponent = (props: ChartComponentProps) => {
	const { chartConfig } = props;
	return <ReactECharts option={chartConfig.option} />;
};

export default BarLineComponent;
