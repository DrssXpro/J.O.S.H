import { Border06 } from "./index";
import { ComponentType } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";

export const option = {
	colors: ["#3140ad", "#1089ff"],
	backgroundColor: "#00000000"
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Border06.key;
	public chartConfig = Border06;
	public option = option;
}
