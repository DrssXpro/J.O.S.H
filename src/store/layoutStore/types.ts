import { LayerModeEnum, MaterialsModeEnum } from "@/types/LayoutTypes";

export interface ILayoutState {
	showMaterials: boolean;
	showLayer: boolean;
	showConfiguration: boolean;
	layerMode: LayerModeEnum;
	materialsMode: MaterialsModeEnum;
}

export interface ILayoutAction {
	controllMaterials: (flag: boolean) => void;
	controllLayer: (flag: boolean) => void;
	controllConfiguration: (flag: boolean) => void;
	controllMaterialsMode: (flag: MaterialsModeEnum) => void;
	controllLayerMode: (flag: LayerModeEnum) => void;
}
