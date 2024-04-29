import { PublicConfigClass } from "@/materials/public/publicConfig";
import { Image } from ".";
import { ComponentType } from "@/materials/types";
import logo from "@/assets/logo/logo.png";
import { clone } from "lodash-es";

export const option = {
	// 图片路径
	dataset: logo,
	// 适应方式
	fit: "contain",
	// 圆角
	borderRadius: 10
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Image.key;
	public chartConfig = Image;
	// 适配资源库图片，需要单独处理
	public option = clone(option);
	constructor(chartConfig?: any) {
		super();
		if (chartConfig) {
			this.chartConfig = chartConfig;
			this.attr = chartConfig.attr;
			this.option.dataset = chartConfig.image;
		}
	}
}
