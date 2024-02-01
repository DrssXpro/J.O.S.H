import dataJson from "./data.json";
import ReactECharts from "echarts-for-react";

const barSeriesItem = {
	type: "bar",
	barWidth: 15,
	label: {
		show: true,
		position: "top",
		color: "#fff",
		fontSize: 12
	},
	itemStyle: {
		color: null,
		borderRadius: 2
	}
};

const lineSeriesItem = {
	type: "line",
	symbol: "circle",
	label: {
		show: true,
		position: "top",
		color: "#fff",
		fontSize: 12
	},
	symbolSize: 5, //设定实心点的大小
	itemStyle: {
		color: "#FFE47A",
		borderWidth: 1
	},
	lineStyle: {
		type: "solid",
		width: 3,
		color: null
	}
};

const options = {
	tooltip: {
		show: true,
		trigger: "axis",
		axisPointer: {
			show: true,
			type: "shadow"
		}
	},
	legend: {
		data: null
	},
	xAxis: {
		show: true,
		type: "category"
	},
	yAxis: {
		show: true,
		type: "value"
	},
	dataset: { ...dataJson },
	series: [barSeriesItem, lineSeriesItem]
};
const BarLineComponent = () => {
	return <ReactECharts option={options} />;
};

export default BarLineComponent;
