import { LayerModeEnum, MaterialsModeEnum } from "@/types/LayoutTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ILayoutAction, ILayoutState } from "./types";

const useLayoutStore = create(
	persist<ILayoutState & ILayoutAction>(
		(set) => ({
			showMaterials: true,
			showLayer: true,
			showConfiguration: true,
			layerMode: LayerModeEnum.THUMBNAIL,
			materialsMode: MaterialsModeEnum.SINGLE,
			controllMaterials: (val) => {
				set(() => ({ showMaterials: val }));
			},
			controllLayer: (val) => {
				set(() => ({ showLayer: val }));
			},
			controllConfiguration: (val) => {
				set(() => ({ showConfiguration: val }));
			},
			controllMaterialsMode: (val) => {
				set(() => ({ materialsMode: val }));
			},
			controllLayerMode: (val) => {
				set(() => ({ layerMode: val }));
			}
		}),
		{
			name: "layout",
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useLayoutStore;
