import { immer } from "zustand/middleware/immer";
import { create } from "zustand";
import { IChartHistoryState, IChartHistoryAction, HistoryItemType, HistoryActionTypeEnum } from "./types";

const useChartHistoryStore = create<IChartHistoryState & IChartHistoryAction>()(
	immer((set, get) => ({
		backStack: [],
		forwardStack: [],
		// 添加记录
		pushRecord(items) {
			set((state) => {
				if (Array.isArray(items)) state.backStack.push(...items);
				else state.backStack.push(items);
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
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.ADD,
				historyData: item
			});
		},
		createMoveHistory(item) {
			get().pushRecord({
				id: Date.now().toString(),
				actionType: HistoryActionTypeEnum.MOVE,
				historyData: item
			});
		}
	}))
);

export default useChartHistoryStore;
