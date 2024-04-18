import { PieCircle } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { echartOptionProfixHandle } from "@/materials/public/charts";
export const includes = [];

const options = {
	tooltip: {
		show: true,
		trigger: "item"
	},
	legend: {
		show: true
	},
	dataset: 0.25,
	title: {
		text: 25 + "%",
		x: "center",
		y: "center",
		textStyle: {
			color: "#56B9F8",
			fontSize: 30
		}
	},
	series: [
		{
			type: "pie",
			radius: ["75%", "80%"],
			center: ["50%", "50%"],
			emphasis: {
				scale: false
			},
			color: ["#00bcd44a", "transparent"],
			label: {
				show: false
			},
			data: [
				{
					value: [25],
					itemStyle: {
						color: "#03a9f4",
						shadowBlur: 10,
						shadowColor: "#97e2f5"
					}
				},
				{
					value: [75],
					itemStyle: {
						color: "#00bcd44a",
						shadowBlur: 0,
						shadowColor: "#00bcd44a"
					}
				}
			]
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = PieCircle.key;
	public chartConfig = PieCircle;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
