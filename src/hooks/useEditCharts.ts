import useChartStore from "@/store/chartStore/chartStore";
import useStoreSelector from "./useStoreSelector";

const useEditCharts = () => {
	const { selectId, componentList } = useChartStore(useStoreSelector(["selectId", "componentList"]));
	// 获取当前选择的图表在数组中的位置
	const getTargetChartIndex = (id?: string) => {
		const targetId = id || (selectId.length && selectId[0]) || undefined;
		if (!targetId) return -1;
		const targetIndex = componentList.findIndex((c) => c.id === targetId);
		if (targetIndex !== -1) {
			return targetIndex;
		}
	};

	// 获取当前选择的图表对象
	const getTargetData = (index?: number) => {
		const targetIndex = typeof index === "number" ? index : getTargetChartIndex();
		if (targetIndex !== undefined && targetIndex !== -1) return componentList[targetIndex];
	};

	return {
		getTargetChartIndex,
		getTargetData
	};
};

export default useEditCharts;
