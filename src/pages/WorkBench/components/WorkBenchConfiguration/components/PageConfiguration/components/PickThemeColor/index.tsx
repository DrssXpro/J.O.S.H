import { Button } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { chartColors } from "@/theme";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { CanvasConfigTypeEnum } from "@/store/canvasStore/types";
import { useRef, useState } from "react";
import useStoreSelector from "@/hooks/useStoreSelector";
import CreateColorModal, { ColorModalRef } from "../CreateColorModal";
import ColorCard from "../ColorCard";
import useDesignStore from "@/store/designStore/designStore";

const PickThemeColor = () => {
	const { customChartThemeColorList } = useDesignStore(useStoreSelector(["customChartThemeColorList"]));
	const { setCanvasConfig } = useCanvasStore(useStoreSelector(["setCanvasConfig"]));
	const [activeSelect, setActiveSelect] = useState<string>("light");
	const colorModalRef = useRef<ColorModalRef>(null);

	const selectTheme = (theme: string) => {
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
				{customChartThemeColorList.map((color) => (
					<ColorCard
						color={color}
						key={color.id}
						active={activeSelect === color.id}
						clickCard={() => selectTheme(color.id)}
					/>
				))}
				{Object.entries(chartColors).map(([key, i], index) => (
					<ColorCard color={i} key={index} active={activeSelect === key} clickCard={() => selectTheme(key)} />
				))}
			</div>
			<CreateColorModal ref={colorModalRef} />
		</div>
	);
};

export default PickThemeColor;
