import { TextGradient } from ".";
import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ComponentType } from "@/materials/types";

export const option = {
	dataset: "我是渐变文本",
	size: 20,
	gradient: {
		from: "#0000FFFF",
		to: "#00FF00FF",
		deg: 45
	}
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = TextGradient.key;
	public chartConfig = TextGradient;
	public option = option;
}
