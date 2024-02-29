import { RequestConfigType } from "@/types/HttpTypes";
import { BaseEvent, EventLife } from "./eventTypes";

export enum ChartFrameEnum {
	// 支持 dataset 的 echarts 框架
	ECHARTS = "echarts",
	// UI 组件框架
	ANT_DESIGN = "antDesign",
	// 自定义带数据组件
	COMMON = "common",
	// 无数据变更
	STATIC = "static"
}

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

// 图表组件 props
export interface ChartComponentProps {
	// 图表配置项
	chartConfig: ComponentType;
	// 自定义图表颜色
	themeColor: { name: string; color: string[] };
	// 动态数据请求失败回调
	requestErrorCallback?: (error: any) => void;
	// 动态数据请求成功回调
	requestSuccessCallback?: () => void;
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
	// 区分组件类型（是否支持 dataset 设置）
	chartFrame?: ChartFrameEnum;
	// 组件预设的 dataset 值（图片/图标）
	dataset?: any;
	// 禁用 拖拽或双击生成组件
	disabled?: boolean;
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

export enum RendererTypeEnum {
	SVG = "svg",
	CANVAS = "canvas"
}

// 组件实例类型（store 中存储 componentList）
export interface ComponentType extends PublicConfigType {
	key: string;
	chartConfig: IMaterialConfigType;
	rendererType: RendererTypeEnum;
	option: any;
}
