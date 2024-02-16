import useChartStore from "@/store/chartStore/charStore";

const useEditCharts = () => {
	const { selectId, componentList } = useChartStore();
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
	const getTargetData = () => {
		const targetIndex = getTargetChartIndex();
		if (targetIndex !== undefined && targetIndex !== -1) return componentList[targetIndex];
	};

	return {
		getTargetChartIndex,
		getTargetData
	};
};

export default useEditCharts;
