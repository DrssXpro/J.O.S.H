import useEditCharts from "@/hooks/useEditCharts";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { CanvasConfigTypeEnum, CanvasGlobalTypeEnum } from "@/store/canvasStore/types";
import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useChartStore from "@/store/chartStore/chartStore";
import { IComponent } from "@/store/chartStore/types";
import { cloneComponent, rafThrottle } from "@/utils/utils";

const useMouseHandle = () => {
	const { createMoveHistory } = useChartHistoryStore();
	const { canvasConfig, canvasGlobal } = useCanvasStore();
	const {
		componentList,
		setTargetSelectChart,
		getSelectId,
		getComponentList,
		setMousePosition,
		setClickMousePosition,
		updateChartConfig
	} = useChartStore();
	const { getTargetChartIndex } = useEditCharts();
	// 画布内 mousedown 事件（选中图表或清空当前选中内容）
	const mousedownHandleUnStop = (_e: React.MouseEvent, item?: IComponent) => {
		setClickMousePosition(_e.nativeEvent.offsetX, _e.nativeEvent.offsetY);
		if (item) {
			setTargetSelectChart(item.id);
			return;
		}
		setTargetSelectChart(undefined);
	};

	// 图表 mousedown 事件（拖拽改变位置）
	const handleMouseDown = (e: React.MouseEvent, item: IComponent) => {
		e.preventDefault();
		e.stopPropagation();
		if (item.status.lock) return;
		setTargetSelectChart(item.id);
		setClickMousePosition(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
		const scale = canvasGlobal[CanvasGlobalTypeEnum.SCALE];
		const canvasWidth = canvasConfig[CanvasConfigTypeEnum.CANVAS_WIDTH];
		const canvasHeight = canvasConfig[CanvasConfigTypeEnum.CANVAS_HEIGHT];

		// 历史记录
		const ComponentRecords: IComponent[] = [];

		// 记录初始化图表位置和大小，考虑多选情况用 Map 存储
		const targetMap = new Map();
		getSelectId().forEach((id) => {
			const index = getTargetChartIndex(id)!;
			if (index !== -1) {
				// mouseDown 先记录当前图表位置存入 records
				ComponentRecords.push(cloneComponent(componentList[index]));
				const { x, y, w, h } = componentList[index].attr;
				targetMap.set(id, { x, y, w, h });
			}
		});

		// 记录点击初始位置
		const startX = e.screenX;
		const startY = e.screenY;
		setMousePosition(undefined, undefined, startX, startY);

		const handleMouseMove = rafThrottle((mouseEvent: MouseEvent) => {
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
		});

		const handleMouseUp = () => {
			setMousePosition(0, 0, 0, 0);

			// 保存历史记录至 historyStack
			if (ComponentRecords.length) {
				getSelectId().forEach((id) => {
					const index = getTargetChartIndex(id)!;
					if (index !== -1) {
						const currentComponent = getComponentList()[index];
						ComponentRecords.forEach((preRecord) => {
							if (preRecord.id === currentComponent.id) {
								// mouseUp 时，存储图表组件前后位置差，后续用来 undo、redo 复原位置
								preRecord.attr = {
									...preRecord.attr,
									offsetX: currentComponent.attr.x - preRecord.attr.x,
									offsetY: currentComponent.attr.y - preRecord.attr.y
								};
							}
						});
					}
				});
			}
			// 压入 backStack 中，只有移动才压入
			const pushRecords = ComponentRecords.filter((item) => item.attr.offsetX && item.attr.offsetY);
			pushRecords.length && createMoveHistory(pushRecords);

			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mouseup", handleMouseUp);
		};

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	};

	// 图表八个点位 mousedown 事件（拖拽改变宽高大小）
	const handleMousePointDown = (e: React.MouseEvent, point: string, attr: IComponent["attr"]) => {
		e.stopPropagation();
		e.preventDefault();
		const scale = canvasGlobal[CanvasGlobalTypeEnum.SCALE];
		const chartIndex = getTargetChartIndex()!;

		const itemAttrX = attr.x;
		const itemAttrY = attr.y;
		const itemAttrW = attr.w;
		const itemAttrH = attr.h;

		// 记录点击初始位置
		const startX = e.screenX;
		const startY = e.screenY;

		setMousePosition(startX, startY);

		const handleMouseMove = rafThrottle((mouseEvent: MouseEvent) => {
			setMousePosition(mouseEvent.screenX, mouseEvent.screenY);

			const currX = Math.round((mouseEvent.screenX - startX) / scale);
			const currY = Math.round((mouseEvent.screenY - startY) / scale);

			// 只需确定四个方向 两两组合即为四个边角方向
			const isTop = /t/.test(point);
			const isBottom = /b/.test(point);
			const isLeft = /l/.test(point);
			const isRight = /r/.test(point);

			const newHeight = itemAttrH + (isTop ? -currY : isBottom ? currY : 0);
			const newWidth = itemAttrW + (isLeft ? -currX : isRight ? currX : 0);

			// 缩小/放大的同时还会更新对应的位置
			updateChartConfig(chartIndex, "attr", null, {
				h: newHeight > 0 ? newHeight : 0,
				w: newWidth > 0 ? newWidth : 0,
				x: itemAttrX + (isLeft ? currX : 0),
				y: itemAttrY + (isTop ? currY : 0)
			});
		});

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
		handleMousePointDown,
		mousedownHandleUnStop
	};
};

export default useMouseHandle;
