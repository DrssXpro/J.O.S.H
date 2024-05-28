import ReactECharts from "echarts-for-react";
import { option as barOptions } from "./chartOptions/barOptions";
import { Segmented } from "antd";

const RenderColorChart = (props: { color: string[] }) => {
	const { color } = props;
	const options = barOptions(color);
	return (
		<>
			<Segmented
				block
				size="large"
				options={[
					{ value: "bar", label: "柱状图" },
					{ value: "line", label: "折线图" }
				]}
			></Segmented>
			<div className="mt-4 w-full h-[210px]">
				<ReactECharts
					theme={{ name: "test", color }}
					option={options}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
		</>
	);
};

export default RenderColorChart;
