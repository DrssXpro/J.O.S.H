import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { Funnel } from "./";
import dataJson from "./data.json";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";
export const includes = ["legend"];

// 排序枚举
export const FunnelOrderEnumList = [
	{ label: "倒三角", value: "descending" },
	{ label: "正三角", value: "ascending" }
];
// 标签位置枚举
export const FunnelLabelPositionEnumList = [
	{ label: "内部", value: "inside" },
	{ label: "外部", value: "outside" },
	{ label: "内部左侧", value: "insideLeft" },
	{ label: "内部右侧", value: "insideRight" }
];

export const options = {
	tooltip: {},
	legend: {},
	dataset: { ...dataJson },
	series: [
		{
			name: "Funnel",
			type: "funnel",
			top: 70,
			left: "10%",
			width: "80%",
			min: 0,
			minSize: "0%",
			maxSize: "100%",
			sort: "descending", // descending | ascending
			gap: 5,
			label: {
				show: true,
				position: "inside",
				fontSize: 12
			},
			itemStyle: {
				borderColor: "#fff",
				borderWidth: 0
			},
			emphasis: {
				label: {
					fontSize: 20
				}
			}
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Funnel.key;
	public chartConfig = Funnel;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
