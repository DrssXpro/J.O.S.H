import dataJson from "./data.json";
import { PieCommon } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const includes = ["legend"];

const options = {
	tooltip: {
		show: true,
		trigger: "item"
	},
	legend: {
		show: true
	},
	dataset: { ...dataJson },
	series: [
		{
			type: "pie",
			radius: ["40%", "65%"],
			center: ["50%", "50%"],
			avoidLabelOverlap: false,
			roseType: false,
			itemStyle: {
				show: false,
				borderRadius: 10,
				borderColor: "#fff",
				borderWidth: 2
			},
			label: {
				show: false,
				position: "center",
				formatter: "{b}",
				fontSize: 12
			},
			emphasis: {
				label: {
					show: true,
					fontSize: "40",
					fontWeight: "bold"
				}
			},
			labelLine: {
				show: false
			}
		}
	]
};
export default class Config extends PublicConfigClass implements ComponentType {
	public key = PieCommon.key;
	public chartConfig = PieCommon;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
