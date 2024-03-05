import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import { HistoryItemType, HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import useChartStore from "@/store/chartStore/chartStore";

const useUndoRedo = () => {
	const { updateChartConfig } = useChartStore();
	const {
		handleRemoveComponents,
		handleAddComponents,
		handleSetChartIsHiddenOrLock,
		handleSetChartDownOrUp,
		handleUndoRedoChartTopOrBottom,

		componentList
	} = useChartsWithHistory();
	const { getTargetChartIndex } = useEditCharts();

	// 撤销操作与 HistoryActionType 的操作相反
	function handleUndo(historyItem: HistoryItemType) {
		const components = historyItem.historyData;
		const ids = components.map((item) => item.id);
		switch (historyItem.actionType) {
			case HistoryActionTypeEnum.ADD:
				handleRemoveComponents(ids, false);
				return;
			case HistoryActionTypeEnum.DELETE:
				handleAddComponents(components, false);
				return;
			case HistoryActionTypeEnum.MOVE:
				components.forEach((item) => {
					resetComponentPosition(item, "BACK");
				});
				return;
			case HistoryActionTypeEnum.HIDE:
				handleSetChartIsHiddenOrLock(false, ids[0], "hide", false);
				return;
			case HistoryActionTypeEnum.SHOW:
				handleSetChartIsHiddenOrLock(true, ids[0], "hide", false);
				return;
			case HistoryActionTypeEnum.LOCK:
				handleSetChartIsHiddenOrLock(false, ids[0], "lock", false);
				return;
			case HistoryActionTypeEnum.UNLOCK:
				handleSetChartIsHiddenOrLock(true, ids[0], "lock", false);
				return;
			case HistoryActionTypeEnum.BOTTOM:
				handleUndoRedoChartTopOrBottom("back", historyItem);
				return;
			case HistoryActionTypeEnum.TOP:
				handleUndoRedoChartTopOrBottom("back", historyItem);
				return;
			case HistoryActionTypeEnum.UP:
				handleSetChartDownOrUp(HistoryActionTypeEnum.DOWN, false);
				return;
			case HistoryActionTypeEnum.DOWN:
				handleSetChartDownOrUp(HistoryActionTypeEnum.UP, false);
		}
	}
	// 重做操作与 HistoryActionType 的操作对应
	function handleRedo(historyItem: HistoryItemType) {
		const components = historyItem.historyData;
		const ids = components.map((item) => item.id);

		switch (historyItem.actionType) {
			case HistoryActionTypeEnum.ADD:
				handleAddComponents(components, false);
				return;
			case HistoryActionTypeEnum.DELETE:
				handleRemoveComponents(ids, false);
				return;
			case HistoryActionTypeEnum.MOVE:
				components.forEach((item) => {
					resetComponentPosition(item, "FORWARD");
				});
				return;
			case HistoryActionTypeEnum.HIDE:
				handleSetChartIsHiddenOrLock(true, ids[0], "hide", false);
				return;
			case HistoryActionTypeEnum.SHOW:
				handleSetChartIsHiddenOrLock(false, ids[0], "hide", false);
				return;
			case HistoryActionTypeEnum.LOCK:
				handleSetChartIsHiddenOrLock(true, ids[0], "lock", false);
				return;
			case HistoryActionTypeEnum.UNLOCK:
				handleSetChartIsHiddenOrLock(false, ids[0], "lock", false);
				return;
			case HistoryActionTypeEnum.BOTTOM:
				handleUndoRedoChartTopOrBottom("forward", historyItem);
				return;
			case HistoryActionTypeEnum.TOP:
				handleUndoRedoChartTopOrBottom("forward", historyItem);
				return;
			case HistoryActionTypeEnum.UP:
				handleSetChartDownOrUp(HistoryActionTypeEnum.UP, false);
				return;
			case HistoryActionTypeEnum.DOWN:
				handleSetChartDownOrUp(HistoryActionTypeEnum.DOWN, false);
		}
	}

	function resetComponentPosition(item: ComponentType, type: "BACK" | "FORWARD") {
		const chartIndex = getTargetChartIndex(item.id)!;
		if (chartIndex !== -1) {
			const currentComponent = componentList[chartIndex];
			if (type === "BACK") {
				updateChartConfig(chartIndex, "attr", null, {
					...currentComponent.attr,
					x: item.attr.x,
					y: item.attr.y
				});
			} else {
				updateChartConfig(chartIndex, "attr", null, {
					...currentComponent.attr,
					x: item.attr.x + item.attr.offsetX,
					y: item.attr.y + item.attr.offsetY
				});
			}
		}
	}

	return {
		handleUndo,
		handleRedo
	};
};

export default useUndoRedo;
