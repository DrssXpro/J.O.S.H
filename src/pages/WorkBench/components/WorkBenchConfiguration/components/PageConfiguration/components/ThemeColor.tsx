import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { chartColors } from "@/theme";

const ThemeColor = () => {
	const computedGradientColor = (c1: string, c2: string) => `linear-gradient(to right, ${c1} 0%, ${c2} 100%)`;
	return (
		<div>
			<Button ghost type="primary" block size="large">
				<div className="flex items-center justify-between">
					<div>自定义图表颜色</div>
					<div>
						<PlusOutlined />
					</div>
				</div>
			</Button>
			<div className="mt-4 flex flex-col gap-4">
				{chartColors.map((i, index1) => (
					<div
						className="relative flex items-center cursor-pointer justify-between bg-[#2C2C2D] border-[rgba(255,255,255,0.09)] border-1 p-2 rounded-lg"
						key={index1}
					>
						<div>{i.name}</div>
						<div className="flex items-center gap-2">
							{i.color.slice(0, 6).map((c, index2) => (
								<div className="w-5 h-5 rounded-md" style={{ background: `${c}` }} key={index2}></div>
							))}
						</div>
						<div
							className="absolute w-[95%] -bottom-[2px] left-2 h-[3px] rounded"
							style={{ background: computedGradientColor(i.color[0], i.color[5]) }}
						></div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ThemeColor;
