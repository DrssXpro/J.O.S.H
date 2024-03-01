import ChartPng from "@/assets/bar_x.png";
import { ComponentType } from "@/materials/types";
import { LayerModeEnum } from "@/types/LayoutTypes";
import { Typography, theme } from "antd";
import { AiOutlineUnlock, AiOutlineEye } from "react-icons/ai";

interface LayerCardProps {
	detail: ComponentType;
	isSelect: boolean;
	mode?: LayerModeEnum;
}

const LayerCard = (props: LayerCardProps) => {
	const { token } = theme.useToken();
	const { mode = LayerModeEnum.THUMBNAIL, detail, isSelect } = props;
	return (
		<div
			className={`w-full ${
				mode === LayerModeEnum.THUMBNAIL ? "h-13" : "h-9"
			} flex items-center justify-between gap-2 p-2 mb-2 cursor-pointer group hover:bg-[#313132] rounded-md transition-all transform`}
			style={{
				background: isSelect ? token.colorPrimaryActive : undefined
			}}
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
			<div className="flex items-center gap-2 invisible group-hover:visible">
				<AiOutlineUnlock />
				<AiOutlineEye />
			</div>
		</div>
	);
};

export default LayerCard;
