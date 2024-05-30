import { theme } from "antd";

type ColorType = {
	id?: string;
	name: string;
	color: string[];
};

interface ColorCardProps {
	active: boolean;
	color: ColorType;
	clickCard: (color: ColorType) => void;
}

const ColorCard = (props: ColorCardProps) => {
	const { active, color, clickCard } = props;
	const { token } = theme.useToken();

	const computedGradientColor = (c1: string, c2: string) => `linear-gradient(to right, ${c1} 0%, ${c2} 100%)`;
	return (
		<div
			className="relative flex flex-1 items-center cursor-pointer justify-between bg-[#2C2C2D] border-[rgba(255,255,255,0.09)] border-1 border-solid p-2 rounded-lg"
			style={{
				border: active ? `3px solid ${token.colorPrimary}` : undefined
			}}
			onClick={() => clickCard(color)}
		>
			<div>{color.name}</div>
			<div className="flex items-center gap-2">
				{color.color.slice(0, 6).map((c, index) => (
					<div className="w-5 h-5 rounded-md" style={{ background: `${c}` }} key={index}></div>
				))}
			</div>
			<div
				className="absolute w-[95%] -bottom-[2px] left-2 h-[3px] rounded"
				style={{ background: computedGradientColor(color.color[0], color.color[5]) }}
			></div>
		</div>
	);
};

export default ColorCard;
