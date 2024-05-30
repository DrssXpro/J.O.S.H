import ReactECharts from "echarts-for-react";
import { option as barOptions } from "./chartOptions/barOptions";
import { option as lineOptions } from "./chartOptions/lineOptions";
import { Segmented, Tag } from "antd";
import { memo, useEffect, useMemo, useRef, useState } from "react";

const RenderColorChart = memo((props: { color: string[] }) => {
	const { color } = props;
	const [showType, setShowType] = useState<"bar" | "line">("bar");
	const chartRef = useRef<any>(null);

	useEffect(() => {
		vEchartsSetOption();
	}, [showType]);

	const barOption = useMemo(() => barOptions(color), [color]);
	const lineOption = useMemo(() => lineOptions(color), [color]);

	const vEchartsSetOption = () => {
		if (chartRef.current) {
			const echartInstance = chartRef.current.getEchartsInstance();
			echartInstance.resize();
			echartInstance.clear();
			echartInstance.setOption(showType === "bar" ? barOption : lineOption);
		}
	};

	return (
		<>
			<Tag color="processing" className="w-45 mb-2">
				图表最多展示 7 条数据
			</Tag>
			<Segmented
				block
				options={[
					{ value: "bar", label: "柱状图" },
					{ value: "line", label: "折线图" }
				]}
				onChange={(val) => {
					setShowType(val as "bar" | "line");
				}}
				value={showType}
			></Segmented>
			<div className="mt-4 w-full h-[200px]">
				<ReactECharts
					ref={chartRef}
					theme={{ name: "test", color }}
					option={barOption}
					style={{ height: "100%", width: "100%" }}
				/>
			</div>
		</>
	);
});

export default RenderColorChart;
