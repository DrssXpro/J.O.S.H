import { StorageEnum } from "@/types/StorageTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IDesignAction, IDesignState } from "./types";

const useDesignStore = create(
	persist<IDesignState & IDesignAction>(
		(set, get) => ({
			systemThemeColor: undefined,
			customChartThemeColorList: [],
			updateDesign(key, value) {
				set(() => ({ [key]: value }));
			},
			getThemeColorList() {
				return get().customChartThemeColorList;
			}
		}),
		{
			name: StorageEnum.J_CHART_LAYOUT_STORE,
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useDesignStore;
