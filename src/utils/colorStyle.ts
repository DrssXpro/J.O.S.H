import { CustomColorsType, chartColors } from "@/theme";

// 合并自定义主题和预设主题
export const colorCustomMerge = (customColor?: CustomColorsType[]) => {
	type FormateCustomColorType = {
		[T: string]: {
			color: string[];
			name: string;
		};
	};
	const formateCustomColor: FormateCustomColorType = {};
	customColor?.forEach((item) => {
		formateCustomColor[item.id] = {
			color: item.color,
			name: item.name
		};
	});
	return { ...formateCustomColor, ...chartColors };
};
