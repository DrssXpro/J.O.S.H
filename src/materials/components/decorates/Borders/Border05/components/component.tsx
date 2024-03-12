import { ChartComponentProps } from "@/materials/types";

const borders = [
	{},
	{ right: 0, transform: "rotateY(180deg)" },
	{ bottom: 0, transform: "rotateX(180deg)" },
	{ right: 0, bottom: 0, transform: "rotateX(180deg) rotateY(180deg)" }
];

const Border05Component = (props: ChartComponentProps) => {
	const { w, h } = props.chartConfig.attr;
	const { colors, backgroundColor } = props.chartConfig.option;
	return (
		<div className="w-full h-full" style={{ boxShadow: `inset 0 0 25px 3px ${colors[0]}` }}>
			<svg width={w} height={h}>
				<polygon
					fill={backgroundColor}
					points={`
        4, 0 ${w - 4}, 0 ${w}, 4 ${w}, ${h - 4} ${w - 4}, ${h}
        4, ${h} 0, ${h - 4} 0, 4
      `}
				/>
			</svg>
			{borders.map((item, index) => (
				<svg width={w} height={h} key={index} className="absolute top-0 left-0" style={{ ...item }}>
					<polygon fill={colors[1]} points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3" />
				</svg>
			))}
		</div>
	);
};

export default Border05Component;
