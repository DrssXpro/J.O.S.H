import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useChartStore from "@/store/chartStore/chartStore";
import { IComponent } from "@/store/chartStore/types";

const useChartsWithHistory = () => {
	const { getComponentList, setTargetSelectChart, getSelectId, removeComponents, addComponentList } = useChartStore();
	const { createDeleteHistory, createAddHistory } = useChartHistoryStore();

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

	return {
		handleAddComponents,
		handleRemoveComponents,
		componentList: getComponentList()
	};
};

export default useChartsWithHistory;
