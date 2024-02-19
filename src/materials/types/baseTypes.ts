import { RequestConfigType } from "@/types/HttpTypes";
import { BaseEvent, EventLife } from "./eventTypes";

// 获取组件
export enum FetchComFlagType {
	VIEW,
	CONFIG
}

// 滤镜/变换 枚举
export enum FilterEnum {
	// 是否启用
	FILTERS_SHOW = "filterShow",

	// 透明度
	OPACITY = "opacity",
	// 饱和度
	SATURATE = "saturate",
	// 对比度
	CONTRAST = "contrast",
	// 色相
	HUE_ROTATE = "hueRotate",
	// 亮度
	BRIGHTNESS = "brightness",

	// 旋转
	ROTATE_Z = "rotateZ",
	ROTATE_X = "rotateX",
	ROTATE_Y = "rotateY",

	// 倾斜
	SKEW_X = "skewX",
	SKEW_Y = "skewY"
}

//
export interface ChartComponentProps {
	chartConfig: ComponentType;
}

// 组件状态
export interface StatusType {
	lock: boolean;
	hide: boolean;
}

// 物料组件统一配置
export interface IMaterialConfigType {
	// 组件 key
	key: string;
	// 画布组件 key
	chartCanvasKey: string;
	// 配置面板 key
	configKey: string;
	// 组件名
	title: string;
	// 所属分类
	category: string;
	// 分类名称
	categoryName: string;
	// 所处菜单分类
	menu: string;
	// 组件预览图
	image: string;
	// 配置事件
	configEvents?: Record<string, (...args: any[]) => any>;
}

// 图表组件 props 根配置项
export interface PublicConfigType {
	id: string;
	attr: { x: number; y: number; w: number; h: number; zIndex: number; offsetX: number; offsetY: number };
	styles: {
		[FilterEnum.FILTERS_SHOW]: boolean;
		[FilterEnum.OPACITY]: number;
		[FilterEnum.SATURATE]: number;
		[FilterEnum.CONTRAST]: number;
		[FilterEnum.HUE_ROTATE]: number;
		[FilterEnum.BRIGHTNESS]: number;

		[FilterEnum.ROTATE_Z]: number;
		[FilterEnum.ROTATE_X]: number;
		[FilterEnum.ROTATE_Y]: number;

		[FilterEnum.SKEW_X]: number;
		[FilterEnum.SKEW_Y]: number;

		animations: string[];
	};
	request: RequestConfigType;
	preview?: {
		// 预览超出隐藏
		overFlowHidden?: boolean;
	};
	filter?: string;
	status: StatusType;
	events: {
		baseEvent: {
			[K in BaseEvent]?: string;
		};
		advancedEvents: {
			[K in EventLife]?: string;
		};
	};
}

// 组件实例类型（store 中存储 componentList）
export interface ComponentType extends PublicConfigType {
	key: string;
	chartConfig: IMaterialConfigType;
	option: any;
}
