import { ScatterCommon } from ".";
import dataJson from "./data.json";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["legend", "xAxis", "yAxis", "grid"];

export const seriesItem = {
	type: "scatter",
	emphasis: {
		focus: "series"
	},
	symbolSize: 12,
	markArea: {
		silent: true,
		itemStyle: {
			color: "transparent",
			borderWidth: 1,
			borderType: "dashed"
		},
		data: [
			[
				{
					xAxis: "min",
					yAxis: "min"
				},
				{
					xAxis: "max",
					yAxis: "max"
				}
			]
		]
	},
	markPoint: {
		symbol: "pin",
		symbolSize: 50,
		data: [
			{ type: "max", name: "Max" },
			{ type: "min", name: "Min" }
		]
	}
};

export const options = {
	dataset: dataJson,
	tooltip: {
		showDelay: 0,
		formatter: (params: { value: string | any[]; seriesName: string; name: string }) => {
			// console.log(params)
			return params.value.length > 1
				? `${params.seriesName}：<br />${params.value[0]} ${params.value[1]}`
				: `${params.seriesName}：<br />${params.name} ${params.value}`;
		},
		axisPointer: {
			show: true,
			type: "cross",
			lineStyle: {
				type: "dashed",
				width: 1
			}
		}
	},
	xAxis: {
		scale: true
	},
	yAxis: {
		scale: true
	},
	series: dataJson.map((_item, index) => ({
		...seriesItem,
		datasetIndex: index
	}))
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = ScatterCommon.key;
	public chartConfig = ScatterCommon;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
