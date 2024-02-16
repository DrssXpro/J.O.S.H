import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";

const BarLineComponent = (props: ChartComponentProps) => {
	const { chartConfig } = props;
	return <ReactECharts option={chartConfig.option} style={{ width: "400px", height: "300px" }} />;
};

export default BarLineComponent;
