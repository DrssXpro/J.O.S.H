import { Border05 } from "./index";
import { ComponentType } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";

export const option = {
	colors: ["#1d48c4", "#d3e1f8"],
	backgroundColor: "#00000000"
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Border05.key;
	public chartConfig = Border05;
	public option = option;
}
