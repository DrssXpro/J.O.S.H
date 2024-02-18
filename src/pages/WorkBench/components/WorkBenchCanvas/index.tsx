import { CSSProperties, useEffect, useMemo } from "react";
import CanvasRuler from "./components/CanvasRuler/index";
import CanvasTool from "./components/CanvasTool";
import { initKeyBoardEvent, removeKeyBoardEventListener } from "./utils/handleKeyBoardEvent";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { DragKeyEnum } from "@/types/EditCanvasTypes";
import { createComponentConfig, fetchComponent } from "@/materials/components";
import useChartStore from "@/store/chartStore/chartStore";
import { ComponentType, FetchComFlagType } from "@/materials/types";
import EditShapeBox from "./components/EditShapeBox";
import useMouseHandle from "./hooks/useMouseHandle";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "./utils/handleChartStyle";

const WorkBenchCanvas = () => {
	const { canvasConfig } = useCanvasStore();
	const { componentList, addComponentList, setTargetSelectChart } = useChartStore();
	const { handleMouseDown, mousedownHandleUnStop } = useMouseHandle();
	const { canvasBackground, canvasBackgroundImage } = canvasConfig;
	useEffect(() => {
		initKeyBoardEvent();
		return () => {
			removeKeyBoardEventListener();
		};
	}, []);

	const computedCanvasStyle = useMemo(() => {
		const backgroundStyle = canvasBackground
			? { background: canvasBackground }
			: {
					background: canvasBackgroundImage
						? `url(${canvasBackgroundImage}) no-repeat center center / cover`
						: undefined
				};
		return {
			...backgroundStyle,
			width: "inherit",
			height: "inherit"
		} as CSSProperties;
	}, [canvasBackground, canvasBackgroundImage]);

	return (
		<div className="relative flex-1">
			<CanvasRuler>
				<div
					className="relative"
					style={computedCanvasStyle}
					onMouseDown={(e) => mousedownHandleUnStop(e)}
					onDrop={async (e) => {
						const dropString = e.dataTransfer.getData(DragKeyEnum.DRAG_KEY);
						const dropData = JSON.parse(dropString);
						// 创建图表组件所有配置对象
						const componentConifg: ComponentType = await createComponentConfig(dropData);
						// 获取图表组件
						const ChartComponent: any = fetchComponent(dropData.key, FetchComFlagType.VIEW);
						// 获取图表配置组件
						const ChartConfigComponent: any = fetchComponent(dropData.key, FetchComFlagType.CONFIG);
						// 添加组件配置至全局 store
						addComponentList({ ...componentConifg, ChartComponent, ChartConfigComponent });
						// 选中当前添加图表
						setTargetSelectChart(componentConifg.id);
					}}
					onDragOver={(e) => {
						e.preventDefault();
					}}
				>
					{componentList.map((i, index) => (
						<div
							className={`absolute ${setChartAnimateStyle(i.styles.animations)}`}
							key={index}
							style={{ ...setChartPosStyle(i.attr, index), ...setChartSizeStyle(i.attr) }}
							onMouseDown={(e) => handleMouseDown(e, i)}
						>
							<EditShapeBox chartConfig={i}>
								<i.ChartComponent chartConfig={i} />
							</EditShapeBox>
						</div>
					))}
				</div>
			</CanvasRuler>
			<CanvasTool />
		</div>
	);
};

export default WorkBenchCanvas;
