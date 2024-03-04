import { MenuEnum } from "@/types/EditCanvasTypes";
import { MenuProps } from "antd";
import { useState } from "react";
import {
	IoLockClosedOutline,
	IoLockOpenOutline,
	IoClipboardOutline,
	IoEyeOffOutline,
	IoEyeOutline,
	IoCopyOutline,
	IoChevronDown,
	IoChevronUp,
	IoTrash
} from "react-icons/io5";
import { BiArrowToTop, BiArrowToBottom, BiPaint } from "react-icons/bi";
import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";

const useContextMenuHandle = () => {
	const { handleRemoveComponents, handleSetChartIsHiddenOrLock } = useChartsWithHistory();
	const [clickDetail, setClickDetail] = useState<ComponentType | null>(null);
	const { getTargetData } = useEditCharts();
	const component = getTargetData();

	const chartsMenuItems: MenuProps["items"] = [
		{
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						component && handleSetChartIsHiddenOrLock(true, component.id, "lock");
					}}
				>
					<IoLockClosedOutline />
					锁定
				</div>
			),
			key: MenuEnum.LOCK
		},
		{
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						clickDetail && handleSetChartIsHiddenOrLock(false, clickDetail.id, "lock");
					}}
				>
					<IoLockOpenOutline />
					解锁
				</div>
			),
			key: MenuEnum.UNLOCK
		},
		{
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						component && handleSetChartIsHiddenOrLock(true, component.id, "hide");
					}}
				>
					<IoEyeOffOutline />
					隐藏
				</div>
			),
			key: MenuEnum.HIDE
		},
		{
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => {
						clickDetail && handleSetChartIsHiddenOrLock(false, clickDetail.id, "hide");
					}}
				>
					<IoEyeOutline />
					显示
				</div>
			),
			key: MenuEnum.SHOW
		},
		{
			type: "divider"
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<IoCopyOutline />
					复制
				</div>
			),
			key: MenuEnum.COPY
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<IoClipboardOutline />
					粘贴
				</div>
			),
			key: MenuEnum.PARSE
		},
		{
			type: "divider"
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<BiArrowToTop />
					置顶
				</div>
			),
			key: MenuEnum.TOP
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<BiArrowToBottom />
					置底
				</div>
			),
			key: MenuEnum.BOTTOM
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<IoChevronUp />
					上移
				</div>
			),
			key: MenuEnum.UP
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<IoChevronDown />
					下移
				</div>
			),
			key: MenuEnum.DOWN
		},
		{
			type: "divider"
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<BiPaint />
					清空剪贴板
				</div>
			),
			key: MenuEnum.CLEAR
		},
		{
			label: (
				<div
					className="flex items-center gap-2"
					onClick={() => component && handleRemoveComponents([component.id])}
				>
					<IoTrash />
					删除
				</div>
			),
			key: MenuEnum.DELETE
		}
	];

	const CanvasMenuItems: MenuProps["items"] = [
		{
			label: (
				<div className="flex items-center gap-2">
					<IoClipboardOutline />
					粘贴
				</div>
			),
			key: MenuEnum.PARSE
		},
		{
			label: (
				<div className="flex items-center gap-2">
					<BiPaint />
					清空剪贴板
				</div>
			),
			key: MenuEnum.CLEAR
		}
	];

	const [menuItems, setMenuItems] = useState(chartsMenuItems);

	const setChartMenuItems = (detail: ComponentType) => {
		setClickDetail(detail);
		resetCurrentChartMenus(detail);
	};

	const setCanvasMenuItems = () => {
		setMenuItems(CanvasMenuItems);
	};

	// 根据当前点击的图表过滤 status 相关操作
	const resetCurrentChartMenus = (detail: ComponentType) => {
		const newMenus = chartsMenuItems.filter((item) => {
			if (item && item.key === MenuEnum.LOCK && detail.status.lock) return false;
			if (item && item.key === MenuEnum.UNLOCK && !detail.status.lock) return false;
			if (item && item.key === MenuEnum.HIDE && detail.status.hide) return false;
			if (item && item.key === MenuEnum.SHOW && !detail.status.hide) return false;
			return true;
		});
		setMenuItems(newMenus);
	};

	return {
		menuItems,
		setChartMenuItems,
		setCanvasMenuItems
	};
};

export default useContextMenuHandle;
