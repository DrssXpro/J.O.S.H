import dataJson from "./data.json";
import { BarCrossrange } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["legend", "xAxis", "yAxis", "grid"];
export const seriesItem = {
	type: "bar",
	barWidth: null,
	label: {
		show: true,
		position: "right",
		color: "#fff",
		fontSize: 12
	},
	itemStyle: {
		color: null,
		borderRadius: 0
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
	xAxis: {
		show: true,
		type: "value"
	},
	yAxis: {
		show: true,
		type: "category"
	},
	dataset: { ...dataJson },
	series: [seriesItem, seriesItem]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = BarCrossrange.key;
	public chartConfig = BarCrossrange;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
