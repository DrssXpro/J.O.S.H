import { CSSProperties, useEffect, useMemo } from "react";
import { Dropdown } from "antd";
import CanvasRuler from "./components/CanvasRuler/index";
import CanvasTool from "./components/CanvasTool";
import EditShapeBox from "./components/EditShapeBox";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import useMouseHandle from "./hooks/useMouseHandle";
import useContextMenuHandle from "@/hooks/useContextMenuHandle";
import { initKeyBoardListener, removeKeyBoardEventListener } from "./utils/handleKeyBoardEvent";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "@/utils/chartStyle";
import { createComponentConfig, fetchComponent } from "@/materials/components";
import { colorCustomMerge } from "@/utils/colorStyle";
import { bus } from "@/utils";
import { ComponentType, FetchComFlagType } from "@/materials/types";
import { DragKeyEnum } from "@/types/EditCanvasTypes";
import { KeyBoardEventName } from "@/types/EventTypes";

const WorkBenchCanvas = () => {
	const { canvasConfig } = useCanvasStore();
	const { componentList, handleAddComponents, handleRemoveComponents } = useChartsWithHistory();
	const { handleMouseDown, mousedownHandleUnStop } = useMouseHandle();
	const { menuItems, setCanvasMenuItems, setChartMenuItems } = useContextMenuHandle();
	const { canvasBackground, canvasBackgroundImage, chartThemeColor, chartCustomThemeColorInfo } = canvasConfig;
	useEffect(() => {
		initKeyBoardListener();
		listenKeyBoradEvent();
		return () => {
			removeKeyBoardEventListener();
			removeListenKeyBoradEvent();
		};
	}, []);

	const listenKeyBoradEvent = () => {
		bus.on(KeyBoardEventName.DELETEPRESS, handleRemoveComponents);
	};

	const removeListenKeyBoradEvent = () => {
		bus.off(KeyBoardEventName.DELETEPRESS, handleRemoveComponents);
	};

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

	const computedThemeColor = useMemo(() => {
		const colorCustomMergeData = colorCustomMerge(chartCustomThemeColorInfo);
		return colorCustomMergeData[chartThemeColor];
	}, [chartThemeColor]);

	return (
		<div className="relative flex-1">
			<CanvasRuler>
				<Dropdown trigger={["contextMenu"]} menu={{ items: menuItems }}>
					<div
						className="relative"
						style={computedCanvasStyle}
						onMouseDown={(e) => mousedownHandleUnStop(e)}
						onContextMenu={(e: any) => {
							e.target.id !== "chartComponentBox" && setCanvasMenuItems();
						}}
						onDrop={async (e) => {
							try {
								const dropString = e.dataTransfer.getData(DragKeyEnum.DRAG_KEY);
								const dropData = JSON.parse(dropString);
								// 创建图表组件所有配置对象
								const componentConifg: ComponentType = await createComponentConfig(dropData);
								if (dropData.redirectComponent) {
									dropData.dataset && (componentConifg.option.dataset = dropData.dataset);
									componentConifg.chartConfig.title = dropData.title;
									componentConifg.chartConfig.chartFrame = dropData.chartFrame;
								}
								// 获取图表组件
								const ChartComponent: any = fetchComponent(dropData.key, FetchComFlagType.VIEW);
								// 获取图表配置组件
								const ChartConfigComponent: any = fetchComponent(dropData.key, FetchComFlagType.CONFIG);
								// 根据拖拽落下位置初始化图表位置（只有原生事件对象有 offsetX、offsetY 信息）
								componentConifg.attr.x = e.nativeEvent.offsetX - componentConifg.attr.w / 2;
								componentConifg.attr.y = e.nativeEvent.offsetY - componentConifg.attr.h / 2;
								const componentInstance = { ...componentConifg, ChartComponent, ChartConfigComponent };
								handleAddComponents([componentInstance]);
							} catch (e) {
								window.$message.warning("该组件暂未开发！");
							}
						}}
						onDragOver={(e) => {
							e.preventDefault();
						}}
					>
						{componentList.map((i, index) => (
							<div
								key={i.id}
								className={`absolute ${setChartAnimateStyle(i.styles.animations)}`}
								style={{ ...setChartPosStyle(i.attr, index), ...setChartSizeStyle(i.attr) }}
								onMouseDown={(e) => handleMouseDown(e, i)}
							>
								<EditShapeBox
									chartConfig={i}
									changeContextMenu={(detail) => {
										setChartMenuItems(detail);
									}}
								>
									<i.ChartComponent chartConfig={i} themeColor={computedThemeColor} />
								</EditShapeBox>
							</div>
						))}
					</div>
				</Dropdown>
			</CanvasRuler>
			<CanvasTool />
		</div>
	);
};

export default WorkBenchCanvas;
