import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { WaterPolo } from "./";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { echartOptionProfixHandle } from "@/materials/public/charts";

export const shapes = [
	{
		label: "圆形",
		value: "circle"
	},
	{
		label: "正方形",
		value: "rect"
	},
	{
		label: "带圆角的正方形",
		value: "roundRect"
	},
	{
		label: "正三角形",
		value: "triangle"
	},
	{
		label: "菱形",
		value: "diamond"
	},
	{
		label: "水滴",
		value: "pin"
	},
	{
		label: "箭头",
		value: "arrow"
	}
];

export const includes = [];

export const options = {
	dataset: 0.5,
	series: [
		{
			type: "liquidFill",
			shape: shapes[0].value,
			radius: "90%",
			data: [0.5],
			center: ["50%", "50%"],
			color: [
				{
					type: "linear",
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: "#446bf5"
						},
						{
							offset: 1,
							color: "#2ca3e2"
						}
					],
					globalCoord: false
				}
			],
			backgroundStyle: {
				borderWidth: 1,
				color: "rgba(51, 66, 127, 0.7)"
			},
			label: {
				fontSize: 50,
				color: "#fff"
			},
			outline: {
				show: false,
				borderDistance: 10,
				itemStyle: {
					borderWidth: 2,
					borderColor: "#112165"
				}
			}
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = WaterPolo.key;
	public chartConfig = WaterPolo;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
