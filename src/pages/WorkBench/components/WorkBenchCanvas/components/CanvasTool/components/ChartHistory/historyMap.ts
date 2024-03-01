import { HistoryActionTypeEnum } from "@/store/chartHistoryStore/types";
import {
	IoPencil,
	IoTrash,
	IoCopy,
	IoLayers,
	IoDuplicate,
	IoLockClosedOutline,
	IoLockOpenOutline,
	IoEyeOffOutline,
	IoEyeOutline
} from "react-icons/io5";
import { MdOutlineDriveFileMove } from "react-icons/md";
export const historyActionTypeName = {
	[HistoryActionTypeEnum.ADD]: {
		name: "新增",
		icon: IoDuplicate
	},
	[HistoryActionTypeEnum.DELETE]: {
		name: "删除",
		icon: IoTrash
	},
	[HistoryActionTypeEnum.UPDATE]: {
		name: "更新",
		icon: IoPencil
	},
	[HistoryActionTypeEnum.MOVE]: {
		name: "移动",
		icon: MdOutlineDriveFileMove
	},
	[HistoryActionTypeEnum.PASTE]: {
		name: "粘贴",
		icon: IoCopy
	},
	[HistoryActionTypeEnum.COPY]: {
		name: "复制",
		icon: IoCopy
	},
	[HistoryActionTypeEnum.CUT]: {
		name: "剪切",
		icon: IoPencil
	},
	[HistoryActionTypeEnum.TOP]: {
		name: "置顶",
		icon: IoLayers
	},
	[HistoryActionTypeEnum.BOTTOM]: {
		name: "置底",
		icon: IoLayers
	},
	[HistoryActionTypeEnum.UP]: {
		name: "上移",
		icon: IoLayers
	},
	[HistoryActionTypeEnum.DOWN]: {
		name: "下移",
		icon: IoLayers
	},
	[HistoryActionTypeEnum.LOCK]: {
		name: "锁定",
		icon: IoLockClosedOutline
	},
	[HistoryActionTypeEnum.UNLOCK]: {
		name: "解锁",
		icon: IoLockOpenOutline
	},
	[HistoryActionTypeEnum.HIDE]: {
		name: "隐藏",
		icon: IoEyeOffOutline
	},
	[HistoryActionTypeEnum.SHOW]: {
		name: "显示",
		icon: IoEyeOutline
	}
};
