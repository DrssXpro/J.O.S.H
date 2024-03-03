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
	const { handleSetChartIsHidden } = useChartsWithHistory();
	const { mode = LayerModeEnum.THUMBNAIL, detail, isSelect, selectChart } = props;
	return (
		<div
			className={`w-full ${
				mode === LayerModeEnum.THUMBNAIL ? "h-13" : "h-9"
			} flex items-center justify-between gap-2 p-2 mb-2 cursor-pointer group hover:bg-[#313132] rounded-md transition-all transform`}
			style={{
				background: isSelect ? token.colorPrimaryActive : undefined
			}}
			onClick={() => selectChart(detail.id)}
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
			<div className="flex items-center invisible group-hover:visible">
				{detail.status.lock ? (
					<Button size="small" type="text" icon={<AiOutlineLock />} />
				) : (
					<Button size="small" type="text" icon={<AiOutlineUnlock />} />
				)}
				{detail.status.hide ? (
					<Button
						size="small"
						type="text"
						onClick={() => handleSetChartIsHidden(false)}
						icon={<AiOutlineEyeInvisible />}
					/>
				) : (
					<Button
						size="small"
						type="text"
						onClick={() => handleSetChartIsHidden(true)}
						icon={<AiOutlineEye />}
					/>
				)}
			</div>
		</div>
	);
};

export default LayerCard;
