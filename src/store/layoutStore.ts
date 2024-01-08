import { LayerModeEnum, MaterialsModeEnum } from "@/types/LayoutTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ILayoutState {
	showMaterials: boolean;
	showLayer: boolean;
	showConfiguration: boolean;
	layerMode: LayerModeEnum;
	materialsMode: MaterialsModeEnum;
}

interface ILayoutAction {
	controllMaterials: (flag: boolean) => void;
	controllLayer: (flag: boolean) => void;
	controllConfiguration: (flag: boolean) => void;
	controllMaterialsMode: (flag: MaterialsModeEnum) => void;
	controllLayerMode: (flag: LayerModeEnum) => void;
}

const useLayoutStore = create(
	persist<ILayoutState & ILayoutAction>(
		(set) => ({
			showMaterials: true,
			showLayer: true,
			showConfiguration: true,
			layerMode: LayerModeEnum.THUMBNAIL,
			materialsMode: MaterialsModeEnum.SINGLE,
			controllMaterials: (val: boolean) => set(() => ({ showMaterials: val })),
			controllLayer: (val: boolean) => set(() => ({ showLayer: val })),
			controllConfiguration: (val: boolean) => set(() => ({ showConfiguration: val })),
			controllMaterialsMode: (val: MaterialsModeEnum) => set(() => ({ materialsMode: val })),
			controllLayerMode: (val: LayerModeEnum) => set(() => ({ layerMode: val }))
		}),
		{
			name: "layout",
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useLayoutStore;
