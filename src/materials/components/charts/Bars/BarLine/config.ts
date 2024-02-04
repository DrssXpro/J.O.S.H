import dataJson from "./data.json";
import { BarLine } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType } from "@/materials/types";

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

export const options = {
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

export default class Config extends PublicConfigClass implements ComponentType {
	public key = BarLine.key;
	public chartConfig = BarLine;
	public option = options;
}
