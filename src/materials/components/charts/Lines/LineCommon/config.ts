import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { LineCommon } from "./";
import dataJson from "./data.json";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["legend", "xAxis", "yAxis", "grid"];
export const seriesItem = {
	type: "line",
	label: {
		show: true,
		position: "top",
		color: "#fff",
		fontSize: 12
	},
	symbolSize: 5, //设定实心点的大小
	itemStyle: {
		color: null,
		borderRadius: 0
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
			type: "line"
		}
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
	series: [seriesItem, seriesItem]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = LineCommon.key;
	public chartConfig = LineCommon;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
