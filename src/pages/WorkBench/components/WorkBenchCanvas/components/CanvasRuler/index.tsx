import { useEffect, useMemo, useRef, useState } from "react";
import Ruler from "@scena/react-ruler";
import useCanvasStore from "@/store/canvasStore";
import { listen } from "@/utils/domUtils";
import { bus } from "@/utils";
import { KeyBoardEventName, CanvasLayoutEventName } from "@/types/EventTypes";

interface CanvasRulerProps {
	children: JSX.Element;
}

// key: addEventListener 闭包问题: disableScale 在事件处理函数内部无法更新，借助闭包对象进行更新
const disabledValue = { value: false };

const CanvasRuler = (props: CanvasRulerProps) => {
	const { children } = props;

	const {
		canvasWidth,
		canvasHeight,
		scale,
		disableScale,
		addScale,
		subScale,
		setCanvasDOM,
		setcanvasContainerDOM,
		autoLayoutCanvas
	} = useCanvasStore();
	disabledValue.value = disableScale;
	const [posX, setPosX] = useState(0);
	const [posY, setPosY] = useState(0);
	const [pressSpace, setPressSpace] = useState(false);

	const verticalRulerRef = useRef<null | Ruler>(null);
	const horizontalRulerRef = useRef<null | Ruler>(null);
	const canvasDomRef = useRef<null | HTMLDivElement>(null);
	const containerDomRef = useRef<null | HTMLDivElement>(null);
	let prevMoveXValue = [0, 0],
		prevMoveYValue = [0, 0];

	useEffect(() => {
		setRulerPos();
		setCanvasDOM(canvasDomRef.current!);
		setcanvasContainerDOM(containerDomRef.current!);
		autoLayoutCanvas();
		const listenResize = listen(window, "resize", handlePageResize);
		const listenWheel = listen(containerDomRef.current!, "wheel", handleWheel, { passive: false });
		bus.on(KeyBoardEventName.SPACEKEYPRESS, changePressSpace);
		bus.on(CanvasLayoutEventName.AUTOLAYOUTCANVAS, autoLayoutCanvas);
		bus.on(CanvasLayoutEventName.AUTOLAYOUTCANVASPOS, setLayoutPos);
		return () => {
			listenResize();
			listenWheel();
			bus.off(KeyBoardEventName.SPACEKEYPRESS, changePressSpace);
			bus.off(CanvasLayoutEventName.AUTOLAYOUTCANVAS, autoLayoutCanvas);
			bus.off(CanvasLayoutEventName.AUTOLAYOUTCANVASPOS, setLayoutPos);
		};
	}, []);

	useEffect(() => {
		canvasDomRef.current && setRulerPos();
	}, [scale]);

	const changePressSpace = (flag: boolean) => {
		setPressSpace(flag);
	};

	// 根据缩放比例 动态调整标尺的单位
	const computedUnit = useMemo(() => {
		if (scale > 1.5) return 25;
		else if (scale > 0.75 && scale <= 1.5) return 50;
		else if (scale > 0.4 && scale <= 0.75) return 100;
		else if (scale > 0.2 && scale <= 0.4) return 200;
		else return 400;
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

	// 调整画布在 container 中的位置，配合自适应操作，进行居中显示
	const setLayoutPos = () => {
		const { disX, disY } = computedCanvasDis();
		containerDomRef.current!.scrollLeft += -disX - 20;
		containerDomRef.current!.scrollTop +=
			-disY - (containerDomRef.current!.clientHeight - canvasDomRef.current!.clientHeight) / 2;
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
		if (!pressSpace) return;
		e.preventDefault();
		e.stopPropagation();
		const startX = e.pageX;
		const startY = e.pageY;

		const listenMouseMove = listen(window, "mousemove", (e: any) => {
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
		});

		const listenMouseUp = listen(window, "mouseup", () => {
			listenMouseMove();
			listenMouseUp();
			prevMoveXValue = [0, 0];
			prevMoveYValue = [0, 0];
		});
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
					unit={computedUnit}
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
						unit={computedUnit}
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
						backgroundSize: "15px 15px , 15px 15px",
						overflow: "auto"
					}}
				>
					<div
						className="absolute top-0 left-0 w-full h-full overflow-auto"
						onScroll={() => setRulerPos()}
						ref={containerDomRef}
					>
						<div
							className="absolute top-0 left-0"
							style={{ width: `${canvasWidth * 2}px`, height: `${canvasHeight * 2}px` }}
						>
							<div
								className="absolute top-[50%] left-[50%] ml-[-380px] transform -translate-y-[50%] bg-[#232324] rounded-xl"
								ref={canvasDomRef}
								onMouseDown={handleDragCanvas}
							>
								<div
									className="transition-all"
									style={{
										width: `${canvasWidth * scale}px`,
										height: `${canvasHeight * scale}px`,
										cursor: pressSpace ? "grab" : undefined
									}}
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
