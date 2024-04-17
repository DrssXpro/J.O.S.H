import dataJson from "./data.json";
import { LineLinearSingle } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType, RendererTypeEnum } from "@/materials/types";
import { echartOptionProfixHandle } from "@/materials/public/charts";
import { chartColorsSearch, defaultTheme } from "@/theme";

export const includes = ["legend", "xAxis", "yAxis", "grid"];

export const options = {
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
			symbolSize: 5, //设定实心点的大小
			lineStyle: {
				type: "solid",
				width: 3,
				color: {
					type: "linear",
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{
							offset: 0,
							color: chartColorsSearch[defaultTheme][0] // 0% 处的颜色
						},
						{
							offset: 1,
							color: chartColorsSearch[defaultTheme][1] // 100% 处的颜色
						}
					],
					globalCoord: false // 缺省为 false
				},
				shadowColor: chartColorsSearch[defaultTheme][2],
				shadowBlur: 10,
				shadowOffsetY: 20
			}
		}
	]
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = LineLinearSingle.key;
	public chartConfig = LineLinearSingle;
	public rendererType = RendererTypeEnum.SVG;
	public option = echartOptionProfixHandle(options, includes);
}
