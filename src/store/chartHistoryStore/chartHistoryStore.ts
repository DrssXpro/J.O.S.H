import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { IChartHistoryState, IChartHistoryAction, HistoryItemType, HistoryActionTypeEnum } from "./types";
import { HistoryMax } from "@/settings/designSetting";

const useChartHistoryStore = create<IChartHistoryState & IChartHistoryAction>()(
	immer((set, get) => ({
		backStack: [],
		forwardStack: [],
		// 添加记录
		pushRecord(items) {
			set((state) => {
				if (Array.isArray(items)) state.backStack.push(...items);
				else state.backStack.push(items);
				if (state.backStack.length > HistoryMax) {
					state.backStack.splice(0, state.backStack.length - HistoryMax);
				}
				// 每进行一次操作就清空前进栈
				state.forwardStack = [];
			});
		},
		backAction() {
			const backStack = get().backStack;
			if (!backStack.length) return null;
			const currentHistoryItem: null | HistoryItemType = backStack[backStack.length - 1];
			set((state) => {
				const historyItem = state.backStack.pop()!;
				state.forwardStack.push(historyItem);
			});
			return currentHistoryItem;
		},
		forwardAction() {
			const forwardStack = get().forwardStack;
			if (!forwardStack.length) return null;
			const currentHistoryItem: null | HistoryItemType = forwardStack[forwardStack.length - 1];
			set((state) => {
				const historyItem = state.forwardStack.pop()!;
				state.backStack.push(historyItem);
			});
			return currentHistoryItem;
		},
		createAddHistory(item) {
			if (!item.length) return;
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.ADD,
				historyData: item
			});
		},
		createDeleteHistory(item) {
			if (!item.length) return;
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.DELETE,
				historyData: item
			});
		},
		createMoveHistory(item) {
			if (!item.length) return;
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.MOVE,
				historyData: item
			});
		},
		createHideHistory(item) {
			if (!item.length) return;
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.HIDE,
				historyData: item
			});
		},
		createShowHistory(item) {
			if (!item.length) return;
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.SHOW,
				historyData: item
			});
		}
	}))
);

export default useChartHistoryStore;
