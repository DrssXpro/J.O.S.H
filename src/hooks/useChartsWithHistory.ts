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

	return {
		handleAddComponents,
		handleRemoveComponents,
		handleSetChartIsHiddenOrLock,
		componentList: getComponentList()
	};
};

export default useChartsWithHistory;
