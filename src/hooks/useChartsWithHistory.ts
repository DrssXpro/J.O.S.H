import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useChartStore from "@/store/chartStore/chartStore";
import { IComponent } from "@/store/chartStore/types";
import useEditCharts from "./useEditCharts";
import { HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import { cloneDeep } from "lodash-es";

const useChartsWithHistory = () => {
	const {
		getComponentList,
		setTargetSelectChart,
		getSelectId,
		removeComponents,
		addComponentList,
		updateChartConfig,
		removeComponentByIndex
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

	return {
		handleAddComponents,
		handleRemoveComponents,
		handleSetChartIsHiddenOrLock,
		handleSetChartTopOrEnd,
		componentList: getComponentList()
	};
};

export default useChartsWithHistory;
