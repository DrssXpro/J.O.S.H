import { create } from "zustand";
import { IChartAction, IChartState } from "./types";

const useChartStore = create<IChartState & IChartAction>((set) => ({
	componentList: [],
	selectId: [],
	addComponentList: (component) => {
		set(({ componentList }) => ({ componentList: [...componentList, component] }));
	},
	setTargetSelectChart(select, push = false) {
		set(({ selectId }) => {
			// 无选取 id，清空
			if (!select) return { selectId: [] };
			// 重复，不进行添加
			if (selectId.find((id) => id === select)) return { selectId };
			// push，区分添加/覆盖
			if (push) {
				if (Array.isArray(select)) return { selectId: [...selectId, ...select] };
				else return { selectId: [...selectId, select] };
			} else {
				if (Array.isArray(select)) return { selectId: [...select] };
				else return { selectId: [select] };
			}
		});
	}
}));

export default useChartStore;
