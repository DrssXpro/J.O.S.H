import ChartPng from "@/assets/bar_x.png";
import useChartsWithHistory from "@/hooks/useChartsWithHistory";
import { ComponentType } from "@/materials/types";
import { LayerModeEnum } from "@/types/LayoutTypes";
import { Button, Typography, theme } from "antd";
import { AiOutlineUnlock, AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface LayerCardProps {
	detail: ComponentType;
	isSelect: boolean;
	selectChart: (id: string) => void;
	mode?: LayerModeEnum;
}

const LayerCard = (props: LayerCardProps) => {
	const { token } = theme.useToken();
	const { handleSetChartIsHidden, handleSetChartIsLock } = useChartsWithHistory();
	const { mode = LayerModeEnum.THUMBNAIL, detail, isSelect, selectChart } = props;
	return (
		<div
			className={`w-full ${mode === LayerModeEnum.THUMBNAIL ? "h-13" : "h-9"} ${
				detail.status.lock || "cursor-pointer"
			} flex items-center justify-between gap-2 p-2 mb-2 group hover:bg-[#313132] rounded-md transition-all transform`}
			style={{
				background: isSelect ? token.colorPrimaryActive : undefined
			}}
			onClick={() => !detail.status.lock && selectChart(detail.id)}
		>
			<img
				src={ChartPng}
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
							handleSetChartIsLock(false, true, detail.id);
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
							handleSetChartIsLock(true);
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
							!detail.status.lock && handleSetChartIsHidden(false);
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
							!detail.status.lock && handleSetChartIsHidden(true);
						}}
						icon={<AiOutlineEye />}
					/>
				)}
			</div>
		</div>
	);
};

export default LayerCard;
