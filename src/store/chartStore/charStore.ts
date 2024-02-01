import { create } from "zustand";
import { IChartAction, IChartState } from "./types";

const useChartStore = create<IChartState & IChartAction>((set) => ({
	componentList: [],
	addComponentList: (component) => {
		set(({ componentList }) => ({ componentList: [...componentList, component] }));
	}
}));

export default useChartStore;
