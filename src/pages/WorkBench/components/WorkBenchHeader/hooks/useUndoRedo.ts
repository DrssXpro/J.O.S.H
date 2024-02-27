import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import { HistoryItemType, HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import useChartStore from "@/store/chartStore/chartStore";

const useUndoRedo = () => {
	const { componentList, setTargetSelectChart, updateChartConfig, removeComponents, addComponentList } =
		useChartStore();
	const { getTargetChartIndex } = useEditCharts();

	function handleUndo(historyItem: HistoryItemType) {
		const isAdd = historyItem.actionType === HistoryActionTypeEnum.ADD;
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		const components = historyItem.historyData;

		// 撤销操作且记录类型为 add，说明需要将添加的图表组件移除
		if (isAdd) {
			const ids = components.map((item) => item.id);
			// 移除前先将当前选中状态置为空
			setTargetSelectChart();
			removeComponents(ids);
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
		const isMove = historyItem.actionType === HistoryActionTypeEnum.MOVE;
		const components = historyItem.historyData;
		if (isAdd) {
			components.forEach((item) => {
				addComponentList(item);
			});
			setTargetSelectChart(components.map((i) => i.id));
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
