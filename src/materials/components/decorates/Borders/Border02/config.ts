import { Border02 } from "./index";
import { ComponentType } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";

export const option = {
	colors: ["#6586ec", "#2cf7fe"],
	backgroundColor: "#00000000"
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Border02.key;
	public chartConfig = Border02;
	public option = option;
}
