import { BarCommon } from ".";
import dataJson from "./data.json";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["legend", "xAxis", "yAxis", "grid"];
export const seriesItem = {
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
	public key = BarCommon.key;
	public chartConfig = BarCommon;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
