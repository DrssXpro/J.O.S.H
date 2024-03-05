import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useChartStore from "@/store/chartStore/chartStore";
import { IComponent } from "@/store/chartStore/types";
import useEditCharts from "./useEditCharts";
import { HistoryActionTypeEnum, HistoryItemType } from "@/store/chartHistoryStore/types";
import { cloneDeep } from "lodash-es";

const useChartsWithHistory = () => {
	const {
		getComponentList,
		setTargetSelectChart,
		getSelectId,
		removeComponents,
		addComponentList,
		updateChartConfig,
		swapComponentByIndex,
		removeComponentByIndex,
		removeComponentHeadOrTail,
		insertComponentByIndex
	} = useChartStore();
	const {
		createDeleteHistory,
		createAddHistory,
		createHideHistory,
		createShowHistory,
		createLockHistory,
		createUnLockHistory,
		createLayerHistory
	} = useChartHistoryStore();
	const { getTargetData, getTargetChartIndex } = useEditCharts();

	const handleAddComponents = (components: IComponent[], isHistory = true) => {
		if (isHistory) {
			createAddHistory(components);
		}
		components.forEach((item) => {
			addComponentList(item);
		});
		setTargetSelectChart(components.map((item) => item.id));
	};

	const handleRemoveComponents = (ids?: string[], isHistory = true) => {
		const selectId = ids ? ids : getSelectId();
		setTargetSelectChart();
		if (isHistory) {
			const historyItems: IComponent[] = [];
			const componentList = getComponentList();
			selectId.forEach((id) => {
				const component = componentList.find((item) => item.id === id)!;
				historyItems.push(component);
			});
			createDeleteHistory(historyItems);
		}
		removeComponents(selectId);
	};

	const handleSetChartIsHiddenOrLock = (status: boolean, id: string, type: "hide" | "lock", isHistory = true) => {
		const chartIndex = getTargetChartIndex(id)!;
		const component = getTargetData(chartIndex)!;
		if (isHistory) {
			type === "hide"
				? status
					? createHideHistory([component])
					: createShowHistory([component])
				: status
					? createLockHistory([component])
					: createUnLockHistory([component]);
		}
		type === "hide"
			? updateChartConfig(chartIndex, "status", "hide", status)
			: updateChartConfig(chartIndex, "status", "lock", status);
		status ? setTargetSelectChart() : setTargetSelectChart(id);
	};

	const handleSetChartTopOrEnd = (
		type: HistoryActionTypeEnum.TOP | HistoryActionTypeEnum.BOTTOM,
		isHistory = true
	) => {
		const componentList = getComponentList();
		// 少于两个图表无需执行置顶或置底
		if (componentList.length < 2) return;
		const chartIndex = getTargetChartIndex()!;
		if (chartIndex !== -1) {
			// 已在底部或顶端直接 return
			if (
				(type === HistoryActionTypeEnum.BOTTOM && chartIndex === 0) ||
				(type === HistoryActionTypeEnum.TOP && chartIndex === componentList.length - 1)
			)
				return;
			const component = componentList[chartIndex];
			// 若保存历史记录，则在 zIndex 字段上保存当前索引，方便后续撤回恢复
			if (isHistory) {
				// 由于 component 只读，因此直接深拷贝进行保存历史记录（jsx 内容不进行赋值）
				const newComponent = cloneDeep(component);
				newComponent.ChartComponent = component.ChartComponent;
				newComponent.ChartConfigComponent = component.ChartConfigComponent;
				newComponent!.attr.zIndex = chartIndex;
				createLayerHistory([newComponent], type);
			}

			removeComponentByIndex(chartIndex);
			addComponentList(component, type === HistoryActionTypeEnum.TOP ? false : true);
		}
	};

	const handleSetChartDownOrUp = (type: HistoryActionTypeEnum.UP | HistoryActionTypeEnum.DOWN, isHistory = true) => {
		const componentList = getComponentList();
		const chartIndex = getTargetChartIndex()!;
		if (chartIndex !== -1) {
			// 根据操作如果该图表已经在底部或者顶端，则不再进行操作
			if (
				(type === HistoryActionTypeEnum.DOWN && chartIndex === 0) ||
				(type === HistoryActionTypeEnum.UP && chartIndex === componentList.length - 1)
			)
				return;
			// 根据进行的操作获取将要交换的两个图表进行交换即可
			const currentComponent = componentList[chartIndex];
			const swapIndex = type === HistoryActionTypeEnum.DOWN ? chartIndex - 1 : chartIndex + 1;
			if (isHistory) {
				createLayerHistory([currentComponent], type);
			}
			swapComponentByIndex(chartIndex, swapIndex);
		}
	};

	const handleUndoRedoChartTopOrBottom = (type: "back" | "forward", historyItem: HistoryItemType) => {
		historyItem.actionType === HistoryActionTypeEnum.BOTTOM
			? removeComponentHeadOrTail("head")
			: removeComponentHeadOrTail("tail");
		// 撤销需要把移动的组件还原到原来位置
		if (type === "back") {
			const component = historyItem.historyData[0];
			// zIndex 保存原来的位置索引，进行插入操作
			const index = component.attr.zIndex;
			insertComponentByIndex(index, component);
		} else {
			// 前进按照其 type 类型重新执行操作即可
			handleSetChartTopOrEnd(
				historyItem.actionType as HistoryActionTypeEnum.TOP | HistoryActionTypeEnum.BOTTOM,
				false
			);
		}
	};

	return {
		handleAddComponents,
		handleRemoveComponents,
		handleSetChartIsHiddenOrLock,
		handleSetChartTopOrEnd,
		handleSetChartDownOrUp,
		handleUndoRedoChartTopOrBottom,
		componentList: getComponentList()
	};
};

export default useChartsWithHistory;
