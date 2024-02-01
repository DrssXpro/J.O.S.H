import { CSSProperties, useEffect, useMemo } from "react";
import CanvasRuler from "./components/CanvasRuler/index";
import CanvasTool from "./components/CanvasTool";
import { initKeyBoardEvent, removeKeyBoardEventListener } from "./utils/handleKeyBoardEvent";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { DragKeyEnum } from "@/types/EditCanvasTypes";
import { fetchComponent } from "@/materials/components";
import useChartStore from "@/store/chartStore/charStore";

const WorkBenchCanvas = () => {
	const { canvasConfig } = useCanvasStore();
	const { componentList, addComponentList } = useChartStore();
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
					className="text-light-50"
					style={computedCanvasStyle}
					onDrop={(e) => {
						const dropString = e.dataTransfer.getData(DragKeyEnum.DRAG_KEY);
						const dropData = JSON.parse(dropString);
						dropData.component = fetchComponent(dropData.key);
						addComponentList(dropData);
					}}
					onDragOver={(e) => {
						e.preventDefault();
					}}
				>
					{componentList.map((i, index) => (
						<div key={index} style={{ width: "400px", height: "300px" }}>
							{i.component()}
						</div>
					))}
				</div>
			</CanvasRuler>
			<CanvasTool />
		</div>
	);
};

export default WorkBenchCanvas;
