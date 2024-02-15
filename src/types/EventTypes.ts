export enum BaseEvent {
	// 点击
	ON_CLICK = "click",
	// 双击
	ON_DBL_CLICK = "dblclick",
	// 移入
	ON_MOUSE_ENTER = "mouseenter",
	// 移出
	ON_MOUSE_LEAVE = "mouseleave"
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
	VNODE_MOUNTED = "vnodeMounted",
	// 渲染之前
	VNODE_BEFORE_MOUNT = "vnodeBeforeMount"
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
	SPACEKEYPRESS = "SpaceKeyPress"
}
