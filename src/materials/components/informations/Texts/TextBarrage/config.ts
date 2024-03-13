import { TextBarrage } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType } from "@/materials/types";
import { chartInitConfig } from "@/settings/designSetting";

export enum FontWeightEnum {
	NORMAL = "常规",
	BOLD = "加粗"
}

export const FontWeightObject = {
	[FontWeightEnum.NORMAL]: "normal",
	[FontWeightEnum.BOLD]: "bold"
};

export const option = {
	dataset: "让数字化看得见",
	fontSize: 32,
	fontColor: "#ffffff",
	fontWeight: "normal",
	// 字间距
	letterSpacing: 5,
	//阴影
	showShadow: true,
	hShadow: 0,
	vShadow: 0,
	blurShadow: 8,
	colorShadow: "#0075ff",
	//动画
	animationTime: 0,
	animationSpeed: 50
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = TextBarrage.key;
	public attr = { ...chartInitConfig, w: 500, h: 70, zIndex: -1 };
	public chartConfig = TextBarrage;
	public option = option;
}
