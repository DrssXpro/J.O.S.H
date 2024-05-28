import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { ChartColorsNameType, chartColors } from "@/theme";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { CanvasConfigTypeEnum } from "@/store/canvasStore/types";
import { useRef, useState } from "react";
import useStoreSelector from "@/hooks/useStoreSelector";
import CreateColorModal, { ColorModalRef } from "../CreateColorModal";

const PickThemeColor = () => {
	const { setCanvasConfig } = useCanvasStore(useStoreSelector(["setCanvasConfig"]));
	const [activeSelect, setActiveSelect] = useState<ChartColorsNameType>("light");
	const colorModalRef = useRef<ColorModalRef>(null);
	const computedGradientColor = (c1: string, c2: string) => `linear-gradient(to right, ${c1} 0%, ${c2} 100%)`;

	const selectTheme = (theme: ChartColorsNameType) => {
		setCanvasConfig(CanvasConfigTypeEnum.CHART_THEME_COLOR, theme);
		setActiveSelect(theme);
	};
	return (
		<div>
			<Button
				ghost
				type="primary"
				block
				size="large"
				onClick={() => {
					colorModalRef.current?.controllModal(true);
				}}
			>
				<div className="flex gap-1 items-center justify-between">
					<div>自定义图表颜色</div>
					<AiOutlinePlus />
				</div>
			</Button>
			<div className="mt-4 flex flex-col gap-4">
				{Object.entries(chartColors).map(([key, i], index1) => (
					<div
						className={`relative flex items-center cursor-pointer justify-between bg-[#2C2C2D] border-[rgba(255,255,255,0.09)] border-1 border-solid ${
							activeSelect === key ? "border-[#2C7BE3] border-2" : ""
						} p-2 rounded-lg`}
						key={index1}
						onClick={() => selectTheme(key as ChartColorsNameType)}
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
			<CreateColorModal ref={colorModalRef} />
		</div>
	);
};

export default PickThemeColor;
