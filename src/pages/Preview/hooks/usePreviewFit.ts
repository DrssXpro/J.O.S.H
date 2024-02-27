import { useEffect, useRef } from "react";
import { CanvasConfigTypeEnum, ICanvasConfig } from "@/store/canvasStore/types";
import usePreviewFitScale from "@/hooks/usePreviewFitScale";

const usePreviewFit = (canvasConfig: ICanvasConfig) => {
	const entityRef = useRef<HTMLDivElement | null>(null);
	const previewScaleRef = useRef<HTMLDivElement | null>(null);
	const { calcRate, windowResize, unWindowResize } = usePreviewFitScale(
		canvasConfig[CanvasConfigTypeEnum.CANVAS_WIDTH],
		canvasConfig[CanvasConfigTypeEnum.CANVAS_HEIGHT],
		canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE],
		previewScaleRef
	);

	// 挂载时根据画布大小进行屏幕适配
	useEffect(() => {
		calcRate();
		windowResize();
		return () => {
			unWindowResize();
		};
	}, []);

	return {
		entityRef,
		previewScaleRef
	};
};

export default usePreviewFit;
