import { ComponentType } from "@/materials/types";
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
