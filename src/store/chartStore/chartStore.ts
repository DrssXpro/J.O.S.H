import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IChartAction, IChartState } from "./types";

const useChartStore = create<IChartState & IChartAction>()(
	immer((set) => ({
		componentList: [],
		selectId: [],
		addComponentList: (component) => {
			set((state) => {
				state.componentList.push(component);
			});
		},
		setTargetSelectChart(select, push = false) {
			set((state) => {
				// 无选取 id，清空
				if (!select) {
					state.selectId = [];
					return;
				}
				// 重复，不进行添加
				if (state.selectId.find((id) => id === select)) return;
				// push，区分添加/覆盖
				if (push) {
					if (Array.isArray(select)) state.selectId.push(...select);
					else state.selectId.push(select);
				} else {
					if (Array.isArray(select)) state.selectId = [...select];
					else state.selectId = [select];
				}
			});
		},
		updateChartConfig(index, key, value) {
			set((state) => {
				const component = state.componentList[index];
				component["option"][key] = value;
			});
		}
	}))
);

export default useChartStore;
