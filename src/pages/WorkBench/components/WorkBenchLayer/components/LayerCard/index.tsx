import { useEffect, useState } from "react";
import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import useContextMenuHandle from "@/hooks/useContextMenuHandle";
import { fetchImages } from "@/materials/components";
import { ComponentType } from "@/materials/types";
import { LayerModeEnum } from "@/types/LayoutTypes";
import { Button, Dropdown, Typography, theme } from "antd";
import { AiOutlineUnlock, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface LayerCardProps {
	detail: ComponentType;
	isSelect: boolean;
	selectChart: (id: string) => void;
	mode?: LayerModeEnum;
}

const LayerCard = (props: LayerCardProps) => {
	const { mode = LayerModeEnum.THUMBNAIL, detail, isSelect, selectChart } = props;
	const { token } = theme.useToken();
	const { handleSetChartIsHiddenOrLock } = useChartsWithHistory();
	const { menuItems, setChartMenuItems } = useContextMenuHandle();
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		getImageUrl();
	}, []);

	const getImageUrl = async () => {
		const image = await fetchImages(props.detail.chartConfig);
		setImageUrl(image);
	};

	return (
		<Dropdown trigger={["contextMenu"]} menu={{ items: menuItems }}>
			<div
				className={`w-full ${mode === LayerModeEnum.THUMBNAIL ? "h-13" : "h-9"} ${
					detail.status.lock || "cursor-pointer"
				} flex items-center justify-between gap-2 p-2 mb-2 group hover:bg-[#313132] rounded-md transition-all transform`}
				style={{
					background: isSelect ? token.colorPrimaryActive : undefined
				}}
				onMouseDown={() => !detail.status.lock && selectChart(detail.id)}
				onContextMenu={() => {
					setChartMenuItems(detail);
				}}
			>
				<img
					src={imageUrl}
					className={`${mode === LayerModeEnum.THUMBNAIL ? "w-[36%]" : "w-[20%]"}${
						mode === LayerModeEnum.THUMBNAIL ? "rounded-md" : "rounded"
					} h-full transition-all`}
				/>
				<Typography.Text ellipsis className="text-[12px]" title={detail.chartConfig.title}>
					{detail.chartConfig.title}
				</Typography.Text>
				<div className="flex items-center">
					{detail.status.lock ? (
						<Button
							size="small"
							type="link"
							onClick={(e) => {
								e.stopPropagation();
								handleSetChartIsHiddenOrLock(false, detail.id, "lock");
							}}
							icon={<AiOutlineLock />}
						/>
					) : (
						<Button
							size="small"
							type="text"
							className="invisible group-hover:visible"
							onClick={(e) => {
								e.stopPropagation();
								handleSetChartIsHiddenOrLock(true, detail.id, "lock");
							}}
							icon={<AiOutlineUnlock />}
						/>
					)}
					{detail.status.hide ? (
						<Button
							size="small"
							type="link"
							onClick={(e) => {
								e.stopPropagation();
								!detail.status.lock && handleSetChartIsHiddenOrLock(false, detail.id, "hide");
							}}
							icon={<AiOutlineEyeInvisible />}
						/>
					) : (
						<Button
							size="small"
							type="text"
							className="invisible group-hover:visible"
							onClick={(e) => {
								e.stopPropagation();
								!detail.status.lock && handleSetChartIsHiddenOrLock(true, detail.id, "hide");
							}}
							icon={<AiOutlineEye />}
						/>
					)}
				</div>
			</div>
		</Dropdown>
	);
};

export default LayerCard;
