import CanvasRuler from "./components/CanvasRuler/index";
import CanvasTool from "./components/CanvasTool";

const WorkBenchCanvas = () => {
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
