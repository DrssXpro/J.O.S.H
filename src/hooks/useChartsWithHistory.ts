import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useChartStore from "@/store/chartStore/chartStore";
import { IComponent } from "@/store/chartStore/types";
import useEditCharts from "./useEditCharts";

const useChartsWithHistory = () => {
	const {
		getComponentList,
		setTargetSelectChart,
		getSelectId,
		removeComponents,
		addComponentList,
		updateChartConfig
	} = useChartStore();
	const {
		createDeleteHistory,
		createAddHistory,
		createHideHistory,
		createShowHistory,
		createLockHistory,
		createUnLockHistory
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

	const handleSetChartIsHidden = (isHidden: boolean, isHistory = true, id?: string) => {
		const selectId = getSelectId();
		if (!id) {
			if (!selectId) return;
			if (selectId && selectId.length !== 1) return;
		}
		const chartIndex = id ? getTargetChartIndex(id)! : getTargetChartIndex()!;
		const component = getTargetData()!;
		if (isHistory) {
			isHidden ? createHideHistory([component]) : createShowHistory([component]);
		}
		updateChartConfig(chartIndex, "status", "hide", isHidden);
		if (isHidden) setTargetSelectChart();
		if (!isHidden && id) setTargetSelectChart(id);
	};

	const handleSetChartIsLock = (isLock: boolean, isHistory = true, id?: string) => {
		const selectId = getSelectId();
		if (!id) {
			if (!selectId) return;
			if (selectId && selectId.length !== 1) return;
		}
		const chartIndex = id ? getTargetChartIndex(id)! : getTargetChartIndex()!;
		const component = getTargetData(chartIndex)!;
		if (isHistory) {
			isLock ? createLockHistory([component]) : createUnLockHistory([component]);
		}
		updateChartConfig(chartIndex, "status", "lock", isLock);
		if (isLock) {
			setTargetSelectChart();
			return;
		}
		id && setTargetSelectChart(id);
	};

	return {
		handleAddComponents,
		handleRemoveComponents,
		handleSetChartIsHidden,
		handleSetChartIsLock,
		componentList: getComponentList()
	};
};

export default useChartsWithHistory;
