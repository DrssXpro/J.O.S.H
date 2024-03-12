import { ChartComponentProps } from "@/materials/types";

const Border01Component = (props: ChartComponentProps) => {
	const { w, h } = props.chartConfig.attr;
	const { colors, backgroundColor } = props.chartConfig.option;
	return (
		<div className="w-full h-full">
			<svg width={w} height={h}>
				<path
					fill={backgroundColor}
					stroke={colors[0]}
					d={`
    M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
    L ${w - 20} 10 L ${w - 5} 25
    L ${w - 5} ${h - 5} L 20 ${h - 5}
    L 5 ${h - 20} L 5 20
  `}
				/>

				<path
					fill="transparent"
					stroke-w="3"
					stroke-linecap="round"
					stroke-dasharray="10, 5"
					stroke={colors[0]}
					d="M 16 9 L 61 9"
				/>

				<path fill="transparent" stroke={colors[1]} d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10" />

				<path
					fill="transparent"
					stroke={colors[1]}
					d={`M ${w - 5} ${h - 30} L ${w - 5} ${h - 5} L ${w - 30} ${h - 5}`}
				/>
			</svg>
		</div>
	);
};
export default Border01Component;
