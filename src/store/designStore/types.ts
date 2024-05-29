import { CustomColorsType } from "@/theme";
import { DesignColorType } from "@/theme/DesignColor/types";

export interface IDesignState {
	systemThemeColor: DesignColorType | undefined;
	customChartThemeColorList: CustomColorsType[];
}

export interface IDesignAction {
	updateDesign: <K extends keyof IDesignState, V extends IDesignState[K]>(key: K, value: V) => void;
}
