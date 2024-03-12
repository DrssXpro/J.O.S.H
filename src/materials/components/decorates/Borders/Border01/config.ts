import { Border01 } from "./index";
import { ComponentType } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";

export const option = {
	dur: 0.5,
	colors: ["#4fd2dd", "#235fa7"],
	backgroundColor: "#00000000"
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Border01.key;
	public chartConfig = Border01;
	public option = option;
}
