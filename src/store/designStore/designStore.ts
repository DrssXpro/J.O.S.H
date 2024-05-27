import { StorageEnum } from "@/types/StorageTypes";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IDesignAction, IDesignState } from "./types";

const useDesignStore = create(
	persist<IDesignState & IDesignAction>(
		(set) => ({
			systemThemeColor: undefined,
			updateDesign(key, value) {
				set(() => ({ [key]: value }));
			}
		}),
		{
			name: StorageEnum.J_CHART_LAYOUT_STORE,
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useDesignStore;
