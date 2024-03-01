import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import { HistoryItemType, HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import useChartStore from "@/store/chartStore/chartStore";

const useUndoRedo = () => {
	const { updateChartConfig } = useChartStore();
	const { handleRemoveComponents, handleAddComponents, componentList } = useChartsWithHistory();
	const { getTargetChartIndex } = useEditCharts();

	function handleUndo(historyItem: HistoryItemType) {
		const isAdd = historyItem.actionType === HistoryActionTypeEnum.ADD;
		const isDel = historyItem.actionType === HistoryActionTypeEnum.DELETE;
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		const components = historyItem.historyData;

		// 撤销操作且记录类型为 add，说明需要将添加的图表组件移除
		if (isAdd) {
			const ids = components.map((item) => item.id);
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
	}

	function handleRedo(historyItem: HistoryItemType) {
		const isAdd = historyItem.actionType === HistoryActionTypeEnum.ADD;
		const isDel = historyItem.actionType === HistoryActionTypeEnum.DELETE;
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		const components = historyItem.historyData;

		if (isAdd) {
			handleAddComponents(components, false);
			return;
		}

		if (isDel) {
			const ids = components.map((item) => item.id);
			handleRemoveComponents(ids, false);
			return;
		}

		if (isMove) {
			components.forEach((item) => {
				resetComponentPosition(item, "FORWARD");
			});
			return;
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
