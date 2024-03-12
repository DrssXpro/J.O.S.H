import { ChartComponentProps } from "@/materials/types";
import { CSSProperties } from "react";

const Border06Component = (props: ChartComponentProps) => {
	const { w, h } = props.chartConfig.attr;
	const { colors, backgroundColor } = props.chartConfig.option;

	const borderLineStyle = (width: number): CSSProperties => ({
		fill: "none",
		strokeLinecap: "round",
		strokeWidth: width
	});
	return (
		<div
			className="w-full h-full"
			style={{
				boxShadow: `inset 0 0 40px ${colors[0]}`,
				border: `1px solid ${colors[1]}`,
				backgroundColor: backgroundColor
			}}
		>
			<svg width={w} height={h}>
				<polyline style={{ ...borderLineStyle(2) }} stroke={colors[0]} points="0, 25 0, 0 25, 0" />
				<polyline
					style={{ ...borderLineStyle(2) }}
					stroke={colors[0]}
					points={`${w - 25}, 0 ${w}, 0 ${w}, 25`}
				/>
				<polyline
					style={{ ...borderLineStyle(2) }}
					stroke={colors[0]}
					points={`${w - 25}, ${h} ${w}, ${h} ${w}, ${h - 25}`}
				/>
				<polyline
					style={{ ...borderLineStyle(2) }}
					stroke={colors[0]}
					points={`0, ${h - 25} 0, ${h} 25, ${h}`}
				/>

				<polyline style={{ ...borderLineStyle(5) }} stroke={colors[1]} points="0, 10 0, 0 10, 0" />
				<polyline
					style={{ ...borderLineStyle(5) }}
					stroke={colors[1]}
					points={`${w - 10}, 0 ${w}, 0 ${w}, 10`}
				/>
				<polyline
					style={{ ...borderLineStyle(5) }}
					stroke={colors[1]}
					points={`${w - 10}, ${h} ${w}, ${h} ${w}, ${h - 10}`}
				/>
				<polyline
					style={{ ...borderLineStyle(5) }}
					stroke={colors[1]}
					points={`0, ${h - 10} 0, ${h} 10, ${h}`}
				/>
			</svg>
		</div>
	);
};

export default Border06Component;
