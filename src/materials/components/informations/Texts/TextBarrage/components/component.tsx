import { ChartComponentProps } from "@/materials/types";
import { CSSProperties, useMemo } from "react";
import "./barrageStyle.css";
const TextBarrageComponent = (props: ChartComponentProps) => {
	const { w } = props.chartConfig.attr;
	const {
		fontColor,
		fontSize,
		letterSpacing,
		fontWeight,
		animationTime,
		animationSpeed,
		hShadow,
		vShadow,
		blurShadow,
		colorShadow,
		showShadow,
		dataset
	} = props.chartConfig.option;

	const transitionDuration = useMemo(() => Math.floor(w / animationSpeed), [w, animationSpeed]);

	const boxStyle = useMemo<CSSProperties>(
		() => ({
			color: fontColor,
			fontSize: `${fontSize}px`,
			letterSpacing: `${letterSpacing}px`,
			fontWeight,
			textShadow: showShadow ? `${hShadow}px ${vShadow}px ${blurShadow}px ${colorShadow}` : "none",
			animation: `barrage ${transitionDuration}s linear ${animationTime}s infinite`
		}),
		[props.chartConfig.option]
	);

	return (
		<div className="w-full h-full flex items-center overflow-hidden">
			<div className="w-full relative" style={{ ...boxStyle }}>
				<span>{dataset}</span>
			</div>
		</div>
	);
};

export default TextBarrageComponent;
