import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { HeatMap } from "./";
import dataJson from "./data.json";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["xAxis", "yAxis", "grid"];

export const options = {
	dataset: { ...dataJson },
	tooltip: {
		position: "top"
	},
	xAxis: {
		data: dataJson.xAxis
	},
	yAxis: {
		data: dataJson.yAxis
	},
	visualMap: {
		show: true,
		min: 0,
		max: 10,
		itemWidth: 20,
		itemHeight: 140,
		calculable: true,
		orient: "horizontal",
		inRange: {
			// 高 -> 低
			color: ["#4661c2", "#263253"]
		}
	},
	series: [
		{
			name: "",
			type: "heatmap",
			data: dataJson.seriesData,
			label: {
				show: true
			},
			emphasis: {
				itemStyle: {
					borderColor: "#333",
					borderWidth: 1,
					shadowBlur: 10,
					shadowColor: "rgba(0, 0, 0, 0.5)"
				}
			},
			progressive: 1000,
			animation: false
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = HeatMap.key;
	public chartConfig = HeatMap;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
