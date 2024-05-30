import { CustomColorsType, chartColors } from "@/theme";
import Color from "color";

type FormateCustomColorType = {
	[T: string]: {
		color: string[];
		name: string;
	};
};
// 合并自定义主题和预设主题
export const colorCustomMerge = (customColor: CustomColorsType[]): FormateCustomColorType => {
	const formateCustomColor: FormateCustomColorType = {};
	customColor.forEach((item) => {
		formateCustomColor[item.id] = {
			color: item.color,
			name: item.name
		};
	});
	return { ...formateCustomColor, ...chartColors };
};

// hsla 转换
export function alpha(color: string, alpha = 1) {
	return Color(color).alpha(alpha).toString();
}

/**
 * * 颜色透明
 * rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
 * @param color 颜色
 * @param concentration 0~1 浓度
 * @returns
 */
export function fade(color: string, fade: number) {
	return Color(color).fade(fade).toString();
}

/**
 * * 颜色变亮
 * hsl(100, 50%, 10%) -> hsl(100, 50%, 50%)
 * @param color 颜色
 * @param concentration 0~1 浓度
 * @returns
 */
export function lighten(color: string, concentration: number) {
	return Color(color).lighten(concentration).toString();
}

/**
 * * 颜色变暗
 * hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
 * @param color 颜色
 * @param concentration 0~1 浓度
 * @returns
 */
export function darken(color: string, concentration: number) {
	return Color(color).darken(concentration).toString();
}
