import ChartPng from "@/assets/bar_x.png";
import { LayerModeEnum } from "@/types/LayoutTypes";
import { UnlockOutlined, EyeOutlined } from "@ant-design/icons";

interface LayerCardProps {
	mode?: LayerModeEnum;
}

const LayerCard = (props: LayerCardProps) => {
	const { mode = LayerModeEnum.THUMBNAIL } = props;
	return (
		<div
			className={`w-full ${
				mode === LayerModeEnum.THUMBNAIL ? "h-13" : "h-9"
			} flex items-center justify-between gap-2 p-2  cursor-pointer group hover:bg-[#313132] rounded-md transition-all transform`}
		>
			<img
				src={ChartPng}
				className={`${mode === LayerModeEnum.THUMBNAIL ? "w-[36%]" : "w-[20%]"}${
					mode === LayerModeEnum.THUMBNAIL ? "rounded-md" : "rounded"
				} h-full transition-all`}
			/>
			<div className="text-[12px] flex-1">折线图</div>
			<div className="flex items-center gap-2 invisible group-hover:visible">
				<UnlockOutlined />
				<EyeOutlined />
			</div>
		</div>
	);
};

export default LayerCard;
