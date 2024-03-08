import { TextCommon } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType } from "@/materials/types";

export enum WritingModeEnum {
	HORIZONTAL = "水平",
	VERTICAL = "垂直"
}

export const WritingModeObject = {
	[WritingModeEnum.HORIZONTAL]: "horizontal-tb",
	[WritingModeEnum.VERTICAL]: "vertical-rl"
};

export enum FontWeightEnum {
	NORMAL = "常规",
	BOLD = "加粗"
}

export const FontWeightObject = {
	[FontWeightEnum.NORMAL]: "normal",
	[FontWeightEnum.BOLD]: "bold"
};

export const option = {
	link: "",
	linkHead: "http://",
	dataset: "我是文本",
	fontSize: 20,
	fontColor: "#ffffff",
	paddingX: 10,
	paddingY: 10,
	textAlign: "center", // 水平对齐方式
	fontWeight: "normal",

	// 边框
	borderWidth: 0,
	borderColor: "#ffffff",
	borderRadius: 5,

	// 字间距
	letterSpacing: 5,
	writingMode: "horizontal-tb",
	backgroundColor: "#00000000"
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = TextCommon.key;
	public chartConfig = TextCommon;
	public option = option;
}
