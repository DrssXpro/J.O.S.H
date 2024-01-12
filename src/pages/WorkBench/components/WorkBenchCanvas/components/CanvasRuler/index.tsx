import { useEffect, useRef, useState } from "react";
import Ruler from "@scena/react-ruler";
import useCanvasStore from "@/store/canvasStore";

interface CanvasRulerProps {
	children: JSX.Element;
}

// key: addEventListener 闭包问题: disableScale 在事件处理函数内部无法更新，借助闭包对象进行更新
const disabledValue = { value: false };

const CanvasRuler = (props: CanvasRulerProps) => {
	const { children } = props;

	const { canvasWidth, canvasHeight, scale, disableScale, addScale, subScale } = useCanvasStore();
	disabledValue.value = disableScale;
	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);

	const verticalRulerRef = useRef<null | Ruler>(null);
	const horizontalRulerRef = useRef<null | Ruler>(null);
	const canvasDomRef = useRef<null | HTMLDivElement>(null);
	const containerDomRef = useRef<null | HTMLDivElement>(null);
	let startX = 0,
		startY = 0,
		prevMoveXValue = [0, 0],
		prevMoveYValue = [0, 0];

	useEffect(() => {
		setRulerPos();
		window.addEventListener("resize", handlePageResize);
		containerDomRef.current?.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			window.removeEventListener("resize", handlePageResize);
			containerDomRef.current?.removeEventListener("wheel", handleWheel);
		};
	}, []);

	useEffect(() => {
		canvasDomRef.current && setRulerPos();
	}, [scale]);

	// 计算画布距离容器差值
	const computedCanvasDis = () => {
		const canvasRect = canvasDomRef.current!.getBoundingClientRect();
		const containerRect = containerDomRef.current!.getBoundingClientRect();
		const disX = Math.floor(containerRect.left) - Math.floor(canvasRect.left);
		const disY = Math.floor(containerRect.top) - Math.floor(canvasRect.top);
		return { disX, disY };
	};

	// 根据画布距离差值校准标尺 0 刻度
	const setRulerPos = () => {
		const { disX, disY } = computedCanvasDis();
		setPosX(Math.floor(disX / scale));
		setPosY(Math.floor(disY / scale));
	};

	// ctrl + 滚轮 更改缩放比例实现缩放效果
	const handleWheel = (e: any) => {
		// 禁用默认浏览器的缩放
		e.preventDefault();
		if (e.ctrlKey && !disabledValue.value) {
			if (e.wheelDeltaY > 0 && scale < 2) {
				addScale(0.1);
			} else if (e.wheelDeltaY < 0 && scale > 0.1) {
				subScale(0.1);
			}
		}
	};

	// 拖动画布相当于 container scroll 效果
	const handleDragCanvas = (e: any) => {
		e.preventDefault();
		e.stopPropagation();
		startX = e.pageX;
		startY = e.pageY;
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	const handleMouseMove = (e: any) => {
		const [prevMoveX1, prevMoveX2] = prevMoveXValue;
		const [prevMoveY1, prevMoveY2] = prevMoveYValue;
		containerDomRef.current!.scrollLeft -=
			prevMoveX2 > prevMoveX1 ? Math.abs(prevMoveX2 - prevMoveX1) : -Math.abs(prevMoveX2 - prevMoveX1);
		containerDomRef.current!.scrollTop -=
			prevMoveY2 > prevMoveY1 ? Math.abs(prevMoveY2 - prevMoveY1) : -Math.abs(prevMoveY2 - prevMoveY1);
		const nx = e.pageX - startX;
		const ny = e.pageY - startY;
		prevMoveXValue = [prevMoveX2, nx];
		prevMoveYValue = [prevMoveY2, ny];
	};

	const handleMouseUp = () => {
		window.removeEventListener("mousemove", handleMouseMove);
		window.removeEventListener("mouseup", handleMouseUp);
		prevMoveXValue = [0, 0];
		prevMoveYValue = [0, 0];
	};

	const handlePageResize = () => {
		verticalRulerRef.current?.resize();
		horizontalRulerRef.current?.resize();
	};

	return (
		<div className="w-full  flex">
			<div className="w-5" style={{ height: "calc(100vh - 64px)" }}>
				<div className="w-5 h-5 bg-[#1F1F1F] text-[#a6a6a6] flex items-center justify-center">px</div>
				<Ruler
					type="vertical"
					ref={(ref) => (verticalRulerRef.current = ref)}
					zoom={scale}
					scrollPos={posY}
					lineColor={"#444b4d"}
					textColor={"#a6a6a6"}
					negativeRuler={true}
					segment={2}
					textOffset={[10, 0]}
					backgroundColor={"#1f1f1f"}
				/>
			</div>
			<div className="flex-1 flex flex-col">
				<div className="w-full h-5">
					<Ruler
						type="horizontal"
						ref={(ref) => (horizontalRulerRef.current = ref)}
						zoom={scale}
						scrollPos={posX}
						height={20}
						lineColor={"#444b4d"}
						textColor={"#a6a6a6"}
						negativeRuler={true}
						segment={2}
						textOffset={[0, 10]}
						backgroundColor={"#1f1f1f"}
					/>
				</div>
				<div
					className="flex-1 relative"
					style={{
						backgroundImage:
							"linear-gradient(#18181c 14px,transparent 0),linear-gradient(90deg,transparent 14px,#86909c 0)",
						backgroundSize: "15px 15px , 15px 15px"
					}}
				>
					<div
						className="absolute w-full h-full overflow-auto"
						onScroll={() => setRulerPos()}
						ref={containerDomRef}
					>
						<div className="absolute top-0 left-0 w-[1600px] h-[1200px]">
							<div
								className="absolute top-[25%] left-[50%] ml-[-600px] mb-[-300px] bg-[#232324] rounded-xl"
								ref={canvasDomRef}
								onMouseDown={handleDragCanvas}
							>
								<div
									className="transition-all"
									style={{ width: `${canvasWidth * scale}px`, height: `${canvasHeight * scale}px` }}
								>
									<div
										className="origin-top-left transition-all"
										style={{
											width: `${canvasWidth}px`,
											height: `${canvasHeight}px`,
											transform: `scale(${scale})`
										}}
									>
										{children}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CanvasRuler;
