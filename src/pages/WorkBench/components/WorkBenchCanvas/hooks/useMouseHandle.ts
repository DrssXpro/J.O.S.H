import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { CanvasConfigTypeEnum, CanvasGlobalTypeEnum } from "@/store/canvasStore/types";
import useChartStore from "@/store/chartStore/chartStore";
import { throttle } from "lodash-es";

const useMouseHandle = () => {
	const { canvasConfig, canvasGlobal } = useCanvasStore();
	const { componentList, setTargetSelectChart, getSelectId, setMousePosition, updateChartConfig } = useChartStore();
	const { getTargetChartIndex } = useEditCharts();

	const mousedownHandleUnStop = (_e: React.MouseEvent, item?: ComponentType) => {
		if (item) {
			setTargetSelectChart(item.id);
			return;
		}
		setTargetSelectChart(undefined);
	};

	const handleMouseDown = (e: React.MouseEvent, item: ComponentType) => {
		e.preventDefault();
		e.stopPropagation();
		setTargetSelectChart(item.id);

		const scale = canvasGlobal[CanvasGlobalTypeEnum.SCALE];
		const canvasWidth = canvasConfig[CanvasConfigTypeEnum.CANVAS_WIDTH];
		const canvasHeight = canvasConfig[CanvasConfigTypeEnum.CANVAS_HEIGHT];

		// 记录初始化图表位置和大小，考虑多选情况用 Map 存储
		const targetMap = new Map();
		getSelectId().forEach((id) => {
			const index = getTargetChartIndex(id)!;
			if (index !== -1) {
				const { x, y, w, h } = componentList[index].attr;
				targetMap.set(id, { x, y, w, h });
			}
		});

		// 记录点击初始位置
		const startX = e.screenX;
		const startY = e.screenY;
		setMousePosition(undefined, undefined, startX, startY);

		const handleMouseMove = throttle((mouseEvent: MouseEvent) => {
			setMousePosition(mouseEvent.screenX, mouseEvent.screenY);
			// 当前偏移量，处理 scale 比例问题
			const offsetX = (mouseEvent.screenX - startX) / scale;
			const offsetY = (mouseEvent.screenY - startY) / scale;

			getSelectId().forEach((id) => {
				if (!targetMap.has(id)) return;
				const index = getTargetChartIndex(id)!;
				const { x, y, w, h } = targetMap.get(id);
				const componentInstance = componentList[index];

				let currX = Math.round(x + offsetX);
				let currY = Math.round(y + offsetY);

				// 要预留的距离（防止图表拖拽出画布）
				const distance = 50;

				// 基于左上角位置检测
				currX = currX < -w + distance ? -w + distance : currX;
				currY = currY < -h + distance ? -h + distance : currY;

				// 基于右下角位置检测
				currX = currX > canvasWidth - distance ? canvasWidth - distance : currX;
				currY = currY > canvasHeight - distance ? canvasHeight - distance : currY;

				// 拖拽更新图表位置
				if (componentInstance) {
					updateChartConfig(index, "attr", null, { ...componentInstance.attr, x: currX, y: currY });
				}
			});
		}, 10);

		const handleMouseUp = () => {
			setMousePosition(0, 0, 0, 0);
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	return {
		handleMouseDown,
		mousedownHandleUnStop
	};
};

export default useMouseHandle;
