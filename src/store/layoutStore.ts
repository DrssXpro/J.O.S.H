import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ILayoutState {
	showMaterials: boolean;
	showLayer: boolean;
	showConfiguration: boolean;
}

interface ILayoutAction {
	controllMaterials: (flag: boolean) => void;
	controllLayer: (flag: boolean) => void;
	controllConfiguration: (flag: boolean) => void;
}

const useLayoutStore = create(
	persist<ILayoutState & ILayoutAction>(
		(set) => ({
			showMaterials: true,
			showLayer: true,
			showConfiguration: true,
			controllMaterials: (val: boolean) => set(() => ({ showMaterials: val })),
			controllLayer: (val: boolean) => set(() => ({ showLayer: val })),
			controllConfiguration: (val: boolean) => set(() => ({ showConfiguration: val }))
		}),
		{
			name: "config",
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useLayoutStore;
