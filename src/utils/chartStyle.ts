import { ComponentType } from "@/materials/types";
import { CanvasConfigTypeEnum, ICanvasConfig } from "@/store/canvasStore/types";
import { CSSProperties } from "react";

type AttrType = Pick<ComponentType, "attr">["attr"];
type StylesType = Pick<ComponentType, "styles">["styles"];

// 位置
export const setChartPosStyle = (attr: AttrType, index: number): CSSProperties => {
	if (!attr) return {};

	return {
		zIndex: index + 1,
		left: `${attr.x}px`,
		top: `${attr.y}px`
	};
};

// 尺寸
export const setChartSizeStyle = (attr: AttrType, scale?: number): CSSProperties => {
	if (!attr) return {};
	return {
		width: `${scale ? scale * attr.w : attr.w}px`,
		height: `${scale ? scale * attr.h : attr.h}px`
	};
};

// 动画
export const setChartAnimateStyle = (animations: string[]) => {
	if (animations.length) {
		return `animate__animated  animate__${animations[0]}`;
	}
	return "";
};

// 滤镜
export const setFilterStyle = (styles?: StylesType) => {
	if (!styles || !styles.filterShow) return {};
	const { opacity, saturate, contrast, hueRotate, brightness } = styles;
	return {
		opacity: opacity,
		filter: `saturate(${saturate}) contrast(${contrast}) hue-rotate(${hueRotate}deg) brightness(${brightness})`
	};
};

// 变换
export const setTransformStyle = (styles: StylesType) => {
	const { rotateZ, rotateX, rotateY, skewX, skewY } = styles;
	return {
		transform: `rotateZ(${rotateZ || 0}deg) rotateX(${rotateX || 0}deg) rotateY(${rotateY || 0}deg) skewX(${
			skewX || 0
		}deg) skewY(${skewY || 0}deg)`
	};
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
