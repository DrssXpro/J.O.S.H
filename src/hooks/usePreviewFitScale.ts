import { CanvasConfigTypeEnum, ICanvasConfig } from "@/store/canvasStore/types";
import { PreviewScaleEnum } from "@/types/LayoutTypes";
import { throttle } from "lodash-es";
import { useEffect, useMemo, useRef } from "react";

const usePreviewFitScale = (canvasConfig: ICanvasConfig) => {
	const scaleRef = useRef<HTMLDivElement>(null);
	// * 默认缩放值
	const scale = {
		width: 1,
		height: 1
	};

	useEffect(() => {
		if (canvasConfig) {
			calcRate();
			windowResize();
			return () => {
				unWindowResize;
			};
		}
	}, [canvasConfig]);

	const calcRate = useMemo(() => {
		// * 画布尺寸（px）
		const baseWidth = canvasConfig[CanvasConfigTypeEnum.CANVAS_WIDTH];
		const baseHeight = canvasConfig[CanvasConfigTypeEnum.CANVAS_HEIGHT];
		// 需要保持的比例
		const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));

		switch (canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE]) {
			case PreviewScaleEnum.FIT:
				return () => {
					if (scaleRef.current) {
						scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5));
						scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `center center`;
					}
				};
			case PreviewScaleEnum.FULL:
				return () => {
					if (scaleRef.current) {
						scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5));
						scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `center center`;
					}
				};
			case PreviewScaleEnum.SCROLL_X:
				return () => {
					if (scaleRef.current) {
						scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5));
						scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `left top`;
					}
				};
			case PreviewScaleEnum.SCROLL_Y:
				return () => {
					if (scaleRef.current) {
						scale.height = parseFloat((window.innerWidth / baseProportion / baseHeight).toFixed(5));
						scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `left top`;
					}
				};
		}
	}, [canvasConfig]);

	const resize = throttle(() => {
		calcRate();
	}, 200);

	// * 改变窗口大小重新绘制
	const windowResize = () => {
		window.addEventListener("resize", resize);
	};

	// * 卸载监听
	const unWindowResize = () => {
		window.removeEventListener("resize", resize);
	};

	return {
		scaleRef
	};
};

export default usePreviewFitScale;
