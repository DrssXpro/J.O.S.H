import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { IChartAction, IChartState } from "./types";
import { RequestHttpIntervalEnum } from "@/types/HttpTypes";

const useChartStore = create<IChartState & IChartAction>()(
	immer((set, get) => ({
		componentList: [],
		selectId: [],
		// 鼠标定位
		mousePosition: {
			startX: 0,
			startY: 0,
			x: 0,
			y: 0
		},
		requestGlobalConfig: {
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
		// selectId 更新后立刻使用需要通过 get 获取最新值
		getSelectId: () => {
			return get().selectId;
		},
		// componentList 更新后立刻使用需要通过 get 获取最新值
		getComponentList: () => {
			return get().componentList;
		},
		// 设置鼠标位置
		setMousePosition(x?: number, y?: number, startX?: number, startY?: number) {
			set((state) => {
				if (x) state.mousePosition.x = x;
				if (y) state.mousePosition.y = y;
				if (startX) state.mousePosition.startX = startX;
				if (startY) state.mousePosition.startY = startY;
			});
		},
		addComponentList: (component, isHead = false) => {
			set((state) => {
				isHead ? state.componentList.unshift(component) : state.componentList.push(component);
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
		// 重新设置 requestGlobalConfig (preview 从 storage 中获取赋值)
		setrequestGlobalConfig(config) {
			set((state) => {
				state.requestGlobalConfig = config;
			});
		},
		updateChartConfig(index, category, key, value) {
			set((state) => {
				const component = state.componentList[index];
				if (key) component[category][key] = value;
				else component[category] = value;
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
		},
		insertComponentByIndex(index, component) {
			set((state) => {
				state.componentList.splice(index, 0, component);
			});
		},
		removeComponents(ids) {
			set((state) => {
				state.componentList = state.componentList.filter((item) => !ids.includes(item.id));
			});
		},
		removeComponentByIndex(index) {
			set((state) => {
				state.componentList.splice(index, 1);
			});
		},
		removeComponentHeadOrTail(type) {
			set((state) => {
				type === "head" ? state.componentList.shift() : state.componentList.pop();
			});
		}
	}))
);

export default useChartStore;
