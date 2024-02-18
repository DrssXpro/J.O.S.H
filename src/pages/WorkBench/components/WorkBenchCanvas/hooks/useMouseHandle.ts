import { ComponentType } from "@/materials/types";
import useChartStore from "@/store/chartStore/chartStore";

const useMouseHandle = () => {
	const { setTargetSelectChart } = useChartStore();
	const handleMouseDown = (e: React.MouseEvent, item: ComponentType) => {
		e.preventDefault();
		e.stopPropagation();
		setTargetSelectChart(item.id);
	};

	const mousedownHandleUnStop = (_e: React.MouseEvent, item?: ComponentType) => {
		if (item) {
			setTargetSelectChart(item.id);
			return;
		}
		setTargetSelectChart(undefined);
	};

	return {
		handleMouseDown,
		mousedownHandleUnStop
	};
};

export default useMouseHandle;
