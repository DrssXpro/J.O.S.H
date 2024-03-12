import { ChartComponentProps } from "@/materials/types";
import { CSSProperties, useMemo } from "react";

const TextGradientComponent = (props: ChartComponentProps) => {
	const { dataset, size, gradient } = props.chartConfig.option;

	const computedTextGrandient = useMemo<CSSProperties>(
		() => ({
			color: "#0000",
			fontSize: `${size}px`,
			backgroundClip: "text",
			WebkitBackgroundClip: "text",
			backgroundImage: `linear-gradient(${gradient.deg}deg, ${gradient.from}, ${gradient.to})`
		}),
		[props.chartConfig.option]
	);
	return (
		<div className="w-full h-full flex items-center justify-center">
			<span style={{ ...computedTextGrandient }}>{dataset}</span>
		</div>
	);
};

export default TextGradientComponent;
