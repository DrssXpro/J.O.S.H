import { Card } from "antd";
import { cardColorMap } from "@/config/color";
import chartPng from "@/assets/bar_x.png";

const MaterialCard = () => {
	return (
		<Card
			bodyStyle={{ padding: 0, backgroundColor: "#232324", overflow: "hidden", borderRadius: "8px" }}
			bordered={false}
			className="cursor-pointer group"
		>
			<div className="w-full flex gap-1  py-1 px-2  bg-[#2A2A2B]">
				{cardColorMap.map((color) => (
					<div
						className="w-2 h-2 rounded-full bg-[#2A2A2B]"
						style={{ backgroundColor: color }}
						key={color}
					></div>
				))}
			</div>
			<div className="w-full h-12 p-2 pb-0 ">
				<img
					src={chartPng}
					className="object-cover w-full h-full transform group-hover:scale-110 transition-all"
				/>
			</div>
			<div className="text-[12px] text-[rgb(150,150,150)] p-2">折线图</div>
		</Card>
	);
};

export default MaterialCard;
