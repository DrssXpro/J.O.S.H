import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import { HistoryItemType, HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import useChartStore from "@/store/chartStore/chartStore";

const useUndoRedo = () => {
	const { updateChartConfig } = useChartStore();
	const { handleRemoveComponents, handleAddComponents, handleSetChartIsHidden, handleSetChartIsLock, componentList } =
		useChartsWithHistory();
	const { getTargetChartIndex } = useEditCharts();

	function handleUndo(historyItem: HistoryItemType) {
		const isAdd = historyItem.actionType === HistoryActionTypeEnum.ADD;
		const isDel = historyItem.actionType === HistoryActionTypeEnum.DELETE;
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		const isHidden = historyItem.actionType === HistoryActionTypeEnum.HIDE;
		const isShow = historyItem.actionType === HistoryActionTypeEnum.SHOW;
		const isLock = historyItem.actionType === HistoryActionTypeEnum.LOCK;
		const isUnLock = historyItem.actionType === HistoryActionTypeEnum.UNLOCK;
		const components = historyItem.historyData;
		const ids = components.map((item) => item.id);

		// 撤销操作且记录类型为 add，说明需要将添加的图表组件移除
		if (isAdd) {
			handleRemoveComponents(ids, false);
			return;
		}

		// 撤销操作且记录类型为 isDel，说明需要将删除的图表还原
		if (isDel) {
			handleAddComponents(components, false);
			return;
		}

		if (isMove) {
			components.forEach((item) => {
				resetComponentPosition(item, "BACK");
			});
			return;
		}

		if (isHidden) {
			handleSetChartIsHidden(false, false, ids[0]);
			return;
		}

		if (isShow) {
			handleSetChartIsHidden(true, false, ids[0]);
			return;
		}

		if (isLock) {
			handleSetChartIsLock(false, false, ids[0]);
			return;
		}

		if (isUnLock) {
			handleSetChartIsLock(true, false, ids[0]);
		}
	}

	function handleRedo(historyItem: HistoryItemType) {
		const isAdd = historyItem.actionType === HistoryActionTypeEnum.ADD;
		const isDel = historyItem.actionType === HistoryActionTypeEnum.DELETE;
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		const isHidden = historyItem.actionType === HistoryActionTypeEnum.HIDE;
		const isShow = historyItem.actionType === HistoryActionTypeEnum.SHOW;
		const isLock = historyItem.actionType === HistoryActionTypeEnum.LOCK;
		const isUnLock = historyItem.actionType === HistoryActionTypeEnum.UNLOCK;
		const components = historyItem.historyData;
		const ids = components.map((item) => item.id);

		if (isAdd) {
			handleAddComponents(components, false);
			return;
		}

		if (isDel) {
			handleRemoveComponents(ids, false);
			return;
		}

		if (isMove) {
			components.forEach((item) => {
				resetComponentPosition(item, "FORWARD");
			});
			return;
		}

		if (isHidden) {
			handleSetChartIsHidden(true, false, ids[0]);
			return;
		}

		if (isShow) {
			handleSetChartIsHidden(false, false, ids[0]);
			return;
		}

		if (isLock) {
			handleSetChartIsLock(true, false, ids[0]);
			return;
		}

		if (isUnLock) {
			handleSetChartIsLock(false, false, ids[0]);
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
