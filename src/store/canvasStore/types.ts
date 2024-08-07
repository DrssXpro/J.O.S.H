import { PreviewScaleEnum } from "@/types/LayoutTypes";

// 画布区域
export enum CanvasGlobalTypeEnum {
	// 画布 DOM
	CANVAS_DOM = "canvasDOM",
	// 画布 Container DOM
	CANVAS_CONTAINER_DOM = "canvasContainerDOM",
	// 是否锁定缩放比例
	LOCK_SCALE = "lockScale",
	// 缩放比例
	SCALE = "scale"
}

// 画布配置（侧边配置区域）
export enum CanvasConfigTypeEnum {
	// 项目名称
	CANVAS_PROJECT_NAME = "canvasProjectName",
	// 画布宽度
	CANVAS_WIDTH = "canvasWidth",
	// 画布高度
	CANVAS_HEIGHT = "canvasHeight",
	// 画布背景颜色
	CANVAS_BACKGROUND = "canvasBackground",
	// 画布背景图片
	CANVAS_BACKGROUND_IMAGE = "canvasBackgroundImage",
	// 画布预览布局
	CANVAS_PREVIEW_TYPE = "canvasPreviewType",
	// 统一图表主题
	CHART_THEME_COLOR = "chartThemeColor"
}

export interface ICanvasGlobal {
	[CanvasGlobalTypeEnum.CANVAS_DOM]: HTMLDivElement | null;
	[CanvasGlobalTypeEnum.CANVAS_CONTAINER_DOM]: HTMLDivElement | null;
	[CanvasGlobalTypeEnum.SCALE]: number;
	[CanvasGlobalTypeEnum.LOCK_SCALE]: boolean;
}

export interface ICanvasConfig {
	[CanvasConfigTypeEnum.CANVAS_PROJECT_NAME]: string;
	[CanvasConfigTypeEnum.CANVAS_WIDTH]: number;
	[CanvasConfigTypeEnum.CANVAS_HEIGHT]: number;
	[CanvasConfigTypeEnum.CANVAS_BACKGROUND]: string;
	[CanvasConfigTypeEnum.CANVAS_BACKGROUND_IMAGE]: string;
	[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE]: PreviewScaleEnum;
	[CanvasConfigTypeEnum.CHART_THEME_COLOR]: string;
}

export interface ICanvasState {
	canvasGlobal: ICanvasGlobal;
	canvasConfig: ICanvasConfig;
}

export interface ICanvasGlobalAction {
	addScale: (value: number) => void;
	subScale: (value: number) => void;
	setCanvasGlobal: <K extends keyof ICanvasGlobal, V extends ICanvasGlobal[K]>(key: K, value: V) => void;
	autoLayoutCanvas: () => void;
}

export interface ICanvasConfigAction {
	setCanvasConfig: <K extends keyof ICanvasConfig, V extends ICanvasConfig[K]>(key: K, value: V) => void;
	setGlobalCanvasConfig: (config: ICanvasConfig) => void;
	getGlobalCanvasConfig: () => ICanvasConfig;
}
