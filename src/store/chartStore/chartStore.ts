import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IChartAction, IChartState } from "./types";
import { RequestHttpIntervalEnum } from "@/types/HttpTypes";

const useChartStore = create<IChartState & IChartAction>()(
	immer((set) => ({
		componentList: [],
		selectId: [],
		requestGlobalConfig: {
			requestDataPond: [],
			requestOriginUrl: "",
			requestInterval: 30,
			requestIntervalUnit: RequestHttpIntervalEnum.SECOND,
			requestParams: {
				Body: {
					"form-data": {},
					"x-www-form-urlencoded": {},
					json: "",
					xml: ""
				},
				Header: {},
				Params: {}
			}
		},
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
		updateChartConfig(index, category, key, value) {
			set((state) => {
				const component = state.componentList[index];
				component[category][key] = value;
			});
		},
		updateChartRequestParams(index, key, value) {
			set((state) => {
				const component = state.componentList[index];
				component.request.requestParams[key] = value;
			});
		},
		updateGlobalRequestConfig(key, value) {
			set((state) => {
				state.requestGlobalConfig[key] = value;
			});
		},
		updateGlobalRequestParams(key, value) {
			set((state) => {
				state.requestGlobalConfig.requestParams[key] = value;
			});
		}
	}))
);

export default useChartStore;
