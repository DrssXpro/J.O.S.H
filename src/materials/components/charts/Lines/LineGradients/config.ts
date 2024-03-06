import dataJson from "./data.json";
import { LineGradients } from ".";
import { graphic } from "echarts/core";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { echartOptionProfixHandle } from "@/materials/public/charts";
import { chartColorsSearch, defaultTheme } from "@/theme";

export const includes = ["legend", "xAxis", "yAxis", "grid"];

const options = {
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
	series: [
		{
			type: "line",
			smooth: false,
			symbolSize: 5, //设定实心点的大小
			label: {
				show: true,
				position: "top",
				color: "#fff",
				fontSize: 12
			},
			lineStyle: {
				width: 3,
				type: "solid"
			},
			areaStyle: {
				opacity: 0.8,
				color: new graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: chartColorsSearch[defaultTheme][3]
					},
					{
						offset: 1,
						color: "rgba(0,0,0,0)"
					}
				])
			}
		},
		{
			type: "line",
			smooth: false,
			symbolSize: 5, //设定实心点的大小
			label: {
				show: true,
				position: "top",
				color: "#fff",
				fontSize: 12
			},
			lineStyle: {
				width: 3,
				type: "solid"
			},
			areaStyle: {
				opacity: 0.8,
				color: new graphic.LinearGradient(0, 0, 0, 1, [
					{
						offset: 0,
						color: chartColorsSearch[defaultTheme][4]
					},
					{
						offset: 1,
						color: "rgba(0,0,0,0)"
					}
				])
			}
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = LineGradients.key;
	public chartConfig = LineGradients;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
