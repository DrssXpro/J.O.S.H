import { CSSProperties, useEffect, useMemo } from "react";
import CanvasRuler from "./components/CanvasRuler/index";
import CanvasTool from "./components/CanvasTool";
import { initKeyBoardEvent, removeKeyBoardEventListener } from "./utils/handleKeyBoardEvent";
import useCanvasStore from "@/store/canvasStore/canvasStore";

const WorkBenchCanvas = () => {
	const { canvasConfig } = useCanvasStore();
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
			: { background: `url(${canvasBackgroundImage}) no-repeat center center / cover` };
		return {
			...backgroundStyle,
			width: "inherit",
			height: "inherit"
		} as CSSProperties;
	}, [canvasBackground, canvasBackgroundImage]);

	return (
		<div className="relative flex-1">
			<CanvasRuler>
				<div className="text-light-50" style={computedCanvasStyle}></div>
			</CanvasRuler>
			<CanvasTool />
		</div>
	);
};

export default WorkBenchCanvas;
