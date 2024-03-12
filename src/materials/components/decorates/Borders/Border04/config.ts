import { Border04 } from "./index";
import { ComponentType } from "@/materials/types";
import { PublicConfigClass } from "@/materials/public/publicConfig";

export const option = {
	borderTitle: "边框-04",
	borderTitleWidth: 250,
	borderTitleHeight: 32,
	borderTitleSize: 18,
	borderTitleColor: "#fff",
	colors: ["#8aaafb", "#1f33a2"],
	backgroundColor: "#00000000"
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = Border04.key;
	public chartConfig = Border04;
	public option = option;
}
