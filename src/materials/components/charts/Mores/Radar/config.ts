import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { Radar } from "./";
import dataJson from "./data.json";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["legend"];

// 雷达形状
export const RadarShapeEnumList = [
	{ label: "多边形", value: "polygon" },
	{ label: "圆形", value: "circle" }
];

export const options = {
	tooltip: {
		show: true
	},
	legend: {
		data: dataJson.seriesData.map((i) => i.name)
	},
	dataset: { ...dataJson },
	radar: {
		shape: "polygon",
		radius: ["0%", "60%"],
		center: ["50%", "55%"],
		splitArea: { show: true },
		splitLine: { show: true },
		axisName: { show: true, color: "#eee", fontSize: 12 },
		axisLine: { show: true },
		axisTick: { show: true },
		indicator: dataJson.radarIndicator
	},
	series: [
		{
			name: "radar",
			type: "radar",
			areaStyle: {
				opacity: 0.1,
				color: "#fff"
			},
			data: dataJson.seriesData
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Radar.key;
	public chartConfig = Radar;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
