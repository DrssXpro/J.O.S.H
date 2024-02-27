import { ComponentType } from "@/materials/types";
import { CanvasConfigTypeEnum, ICanvasConfig } from "@/store/canvasStore/types";
import { CSSProperties } from "react";

type AttrType = Pick<ComponentType, "attr">["attr"];

export const setChartPosStyle = (attr: AttrType, index: number): CSSProperties => {
	if (!attr) return {};

	return {
		zIndex: index + 1,
		left: `${attr.x}px`,
		top: `${attr.y}px`
	};
};

export const setChartSizeStyle = (attr: AttrType, scale?: number): CSSProperties => {
	if (!attr) return {};
	return {
		width: `${scale ? scale * attr.w : attr.w}px`,
		height: `${scale ? scale * attr.h : attr.h}px`
	};
};

export const setChartAnimateStyle = (animations: string[]) => {
	if (animations.length) {
		return `animate__animated  animate__${animations[0]}`;
	}
	return "";
};

// 全局画布样式
export const getEditCanvasConfigStyle = (canvas: ICanvasConfig) => {
	// 背景
	const computedBackground = canvas[CanvasConfigTypeEnum.CANVAS_BACKGROUND]
		? { background: canvas[CanvasConfigTypeEnum.CANVAS_BACKGROUND] }
		: {
				background: canvas[CanvasConfigTypeEnum.CANVAS_BACKGROUND_IMAGE]
					? `url(${canvas[CanvasConfigTypeEnum.CANVAS_BACKGROUND_IMAGE]}) no-repeat center center / cover`
					: undefined
			};
	return {
		position: "relative" as const,
		width: canvas[CanvasConfigTypeEnum.CANVAS_WIDTH]
			? `${canvas[CanvasConfigTypeEnum.CANVAS_WIDTH] || 100}px`
			: "100%",
		height: canvas[CanvasConfigTypeEnum.CANVAS_HEIGHT] ? `${canvas[CanvasConfigTypeEnum.CANVAS_HEIGHT]}px` : "100%",
		...computedBackground
	};
};
