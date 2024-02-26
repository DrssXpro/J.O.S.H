import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import { HistoryItemType, HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import useChartStore from "@/store/chartStore/chartStore";

const useUndoRedo = () => {
	const { componentList, updateChartConfig } = useChartStore();
	const { getTargetChartIndex } = useEditCharts();

	function handleUndo(historyItem: HistoryItemType) {
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		if (isMove) {
			const components = historyItem.historyData;
			components.forEach((item) => {
				resetComponentPosition(item, "BACK");
			});
		}
	}

	function handleRedo(historyItem: HistoryItemType) {
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		if (isMove) {
			const components = historyItem.historyData;
			components.forEach((item) => {
				resetComponentPosition(item, "FORWARD");
			});
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
