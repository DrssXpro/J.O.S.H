import { IComponent } from "../chartStore/types";

// 操作类型枚举
export enum HistoryActionTypeEnum {
	// 新增
	ADD = "add",
	// 删除
	DELETE = "delete",
	// 更新（位置，属性）
	UPDATE = "update",
	// 移动
	MOVE = "move",
	// 复制
	COPY = "copy",
	// 粘贴
	PASTE = "paste",
	// 置顶
	TOP = "top",
	// 置底
	BOTTOM = "bottom",
	// 上移
	UP = "up",
	// 下移
	DOWN = "down",
	// 锁定
	LOCK = "lock",
	// 解除锁定
	UNLOCK = "unLock",
	// 隐藏
	HIDE = "hide",
	// 显示
	SHOW = "show"
}

// 历史栈
export enum HistoryStackEnum {
	BACK_STACK = "backStack",
	FORWARD_STACK = "forwardStack"
}

// 历史记录项
export enum HistoryStackItemEnum {
	ID = "id",
	ACTION_TYPE = "actionType",
	HISTORY_DATA = "historyData"
}

// 历史记录项类型
export interface HistoryItemType {
	// 会有同时操作多个组件场景
	[HistoryStackItemEnum.ID]: string;
	[HistoryStackItemEnum.ACTION_TYPE]: HistoryActionTypeEnum;
	[HistoryStackItemEnum.HISTORY_DATA]: IComponent[];
}

// 历史 Store 类型
export interface IChartHistoryState {
	// 后退栈
	[HistoryStackEnum.BACK_STACK]: Array<HistoryItemType>;
	// 前进栈
	[HistoryStackEnum.FORWARD_STACK]: Array<HistoryItemType>;
}

export interface IChartHistoryAction {
	// 添加历史记录
	pushRecord: (items: HistoryItemType | HistoryItemType[]) => void;
	// 撤回操作，弹出后退栈，压入前进栈
	backAction: () => HistoryItemType | null;
	// 前进操作：弹出前进栈，压入后退栈
	forwardAction: () => HistoryItemType | null;
	// 清除当前所有历史记录
	clearHistory: () => void;
	/**
	 * 具体操作
	 */
	// 新增组件记录
	createAddHistory: (items: IComponent[]) => void;
	// // 更新属性记录
	// createUpdateHistory: (items: IComponent[]) => void;
	// 删除组件记录
	createDeleteHistory: (items: IComponent[]) => void;
	// // 移动组件记录
	createMoveHistory: (items: IComponent[]) => void;
	// 改变层级（z-index）组件记录
	createLayerHistory: (
		items: IComponent[],
		type:
			| HistoryActionTypeEnum.TOP
			| HistoryActionTypeEnum.DOWN
			| HistoryActionTypeEnum.UP
			| HistoryActionTypeEnum.BOTTOM
	) => void;
	// 锁定记录
	createLockHistory: (items: IComponent[]) => void;
	// 解锁记录
	createUnLockHistory: (items: IComponent[]) => void;
	// 隐藏记录
	createHideHistory: (items: IComponent[]) => void;
	// 展示记录
	createShowHistory: (items: IComponent[]) => void;
}
