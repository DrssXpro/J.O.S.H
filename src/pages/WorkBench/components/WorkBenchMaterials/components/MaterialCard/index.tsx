import { DragEvent, useMemo } from "react";
import { Card, Typography } from "antd";
import { cardColorMap } from "@/config/color";
import { MaterialsModeEnum } from "@/types/LayoutTypes";
import { IMaterialConfigType } from "@/materials/types";
import ChartGlobImage from "../ChartGlobImage";
import { DragKeyEnum } from "@/types/EditCanvasTypes";

interface IMaterialCardProps {
	mode: MaterialsModeEnum;
	detail: IMaterialConfigType;
}

const MaterialCard = (props: IMaterialCardProps) => {
	const { mode, detail } = props;

	const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData(DragKeyEnum.DRAG_KEY, JSON.stringify(detail));
	};

	const updateImageIconStyle = useMemo<React.CSSProperties>(() => {
		return mode === MaterialsModeEnum.DOUBLE ? { width: "50px", height: "50px" } : { width: "70%" };
	}, [mode]);

	// 单击事件（上传图片使用）
	const clickHandle = (item: IMaterialConfigType) => {
		item?.configEvents?.uploadImage();
	};

	return (
		<Card
			bodyStyle={{ padding: 0, backgroundColor: "#232324", overflow: "hidden", borderRadius: "8px" }}
			bordered={false}
			className="cursor-pointer group"
			onClick={() => clickHandle(detail)}
		>
			<div
				className={`w-full flex justify-between ${
					mode === MaterialsModeEnum.DOUBLE ? "py-1 px-2" : "py-2 px-3"
				} bg-[#2A2A2B]`}
			>
				<div className="flex gap-1">
					{cardColorMap.map((color) => (
						<div
							className={`${
								mode === MaterialsModeEnum.SINGLE ? "w-2 h-2" : "w-1.5 h-1.5"
							} rounded-full  transition-all`}
							style={{ backgroundColor: color }}
							key={color}
						></div>
					))}
				</div>
				<div
					className="text-[12px] text-[rgb(150,150,150)]"
					style={{ display: mode === MaterialsModeEnum.SINGLE ? "block" : "none" }}
				>
					{detail.title}
				</div>
			</div>
			<div
				className={`w-full flex items-center justify-center ${
					mode === MaterialsModeEnum.SINGLE ? "h-24 py-2 px-4" : "h-12 p-2"
				}  transition-all`}
				draggable={!detail.disabled}
				onDragStart={handleDragStart}
			>
				<ChartGlobImage detail={detail} imageStyle={detail.title === "上传图片" ? updateImageIconStyle : {}} />
			</div>

			<Typography.Text
				ellipsis
				className="text-[12px] text-[rgb(150,150,150)] px-2 pb-2"
				style={{ display: mode === MaterialsModeEnum.SINGLE ? "none" : "block" }}
			>
				{detail.title}
			</Typography.Text>
		</Card>
	);
};

export default MaterialCard;
