export enum BaseEvent {
	// 点击
	ON_CLICK = "click",
	// 双击
	ON_DBL_CLICK = "dblclick",
	// 移动
	ON_MOUSE_MOVE = "mousemove",
	// 移出
	ON_MOUSE_OUT = "mouseout"
}

export enum VaildError {
	// 错误函数
	ERROR_FN = "errorFn",
	// 错误信息
	ERROR_INFO = "errorInfo",
	// 堆栈信息
	ERROR_STACK = "errorStack"
}

export enum EventLife {
	// 渲染之后
	CHART_READY = "onChartReady"
}

export const ErrorTypeName = {
	[VaildError.ERROR_FN]: "错误函数",
	[VaildError.ERROR_INFO]: "错误信息",
	[VaildError.ERROR_STACK]: "堆栈信息"
};

export const enum CanvasLayoutEventName {
	// 自适应调整画布大小
	AUTOLAYOUTCANVAS = "autoLayoutCanvas",
	// 自适应调整画布在容器中的位置
	AUTOLAYOUTCANVASPOS = "autoLaypoutCanvasPos"
}

export const enum KeyBoardEventName {
	// 控制键盘按键展示文本
	ChANGEKEYBOARDTEXT = "changeKeyBoardText",
	// 是否按下 space 键
	SPACEKEYPRESS = "SpaceKeyPress",
	// 删除操作
	DELETEPRESS = "DeletePress",
	// 保存项目
	SAVEPROJECT = "SaveProject",
	// 复制操作
	COPYCHART = "CopyChart",
	// 粘贴操作
	PASTECHART = "PasteChart"
}

// 内置字符串函数对象列表
export const excludeParseEventKeyList = [
	EventLife.CHART_READY,
	BaseEvent.ON_CLICK,
	BaseEvent.ON_DBL_CLICK,
	BaseEvent.ON_MOUSE_MOVE,
	BaseEvent.ON_MOUSE_OUT,
	//过滤器
	"filter"
];
