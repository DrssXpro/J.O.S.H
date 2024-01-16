import { Card } from "antd";
import { cardColorMap } from "@/config/color";
import chartPng from "@/assets/bar_x.png";
import { MaterialsModeEnum } from "@/types/LayoutTypes";
import { IMaterialConfigType } from "@/materials/types";

interface IMaterialCardProps {
	mode: MaterialsModeEnum;
	detail: IMaterialConfigType;
}

const MaterialCard = (props: IMaterialCardProps) => {
	const { mode, detail } = props;
	return (
		<Card
			bodyStyle={{ padding: 0, backgroundColor: "#232324", overflow: "hidden", borderRadius: "8px" }}
			bordered={false}
			className="cursor-pointer group"
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
				className={`w-full ${
					mode === MaterialsModeEnum.SINGLE ? "h-24 py-2 px-4" : "h-12 p-2"
				}  transition-all`}
			>
				<img
					src={chartPng}
					className="object-cover w-full h-full transform group-hover:scale-110 transition-all"
				/>
			</div>
			<div
				className="text-[12px] text-[rgb(150,150,150)] px-2 pb-2"
				style={{ display: mode === MaterialsModeEnum.SINGLE ? "none" : "block" }}
			>
				{detail.title}
			</div>
		</Card>
	);
};

export default MaterialCard;
