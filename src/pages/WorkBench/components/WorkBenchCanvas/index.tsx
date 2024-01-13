import { useEffect } from "react";
import CanvasRuler from "./components/CanvasRuler/index";
import CanvasTool from "./components/CanvasTool";
import { initKeyBoardEvent, removeKeyBoardEventListener } from "./utils/handleKeyBoardEvent";

const WorkBenchCanvas = () => {
	useEffect(() => {
		initKeyBoardEvent();
		return () => {
			removeKeyBoardEventListener();
		};
	}, []);
	return (
		<div className="relative  flex-1">
			<CanvasRuler>
				<div className="text-light-50">123</div>
			</CanvasRuler>
			<CanvasTool />
		</div>
	);
};

export default WorkBenchCanvas;
