import { ChartComponentProps } from "@/materials/types";
import { alpha } from "@/utils/colorStyle";
import { nanoid } from "nanoid";

const Border03Component = (props: ChartComponentProps) => {
	const { w, h } = props.chartConfig.attr;
	const { colors, backgroundColor } = props.chartConfig.option;
	const filterId = `border-box-03-filterId-${nanoid(5)}`;

	return (
		<div className="w-full h-full">
			<svg width={w} height={h}>
				<defs>
					<filter id={filterId} height="150%" width="150%" x="-25%" y="-25%">
						<feMorphology operator="dilate" radius="1" in="SourceAlpha" result="thicken" />
						<feGaussianBlur in="thicken" stdDeviation="2" result="blurred" />
						<feFlood flood-color={alpha(colors[1], 0.7)} result="glowColor">
							<animate
								attributeName="flood-color"
								values={`
              ${alpha(colors[1], 0.7)};
              ${alpha(colors[1], 0.3)};
              ${alpha(colors[1], 0.7)};
            `}
								dur="3s"
								begin="0s"
								repeatCount="indefinite"
							/>
						</feFlood>
						<feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
						<feMerge>
							<feMergeNode in="softGlowColored" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>

				<path
					v-if="w && h"
					fill={backgroundColor}
					stroke-width="2"
					stroke={colors[0]}
					d={`
        M15 5 L ${w - 15} 5 Q ${w - 5} 5, ${w - 5} 15
        L ${w - 5} ${h - 15} Q ${w - 5} ${h - 5}, ${w - 15} ${h - 5}
        L 15, ${h - 5} Q 5 ${h - 5} 5 ${h - 15} L 5 15
        Q 5 5 15 5
      `}
				/>

				<path
					stroke-width="2"
					fill="transparent"
					stroke-linecap="round"
					filter={`url(#${filterId})`}
					stroke={colors[1]}
					d="M 20 5 L 15 5 Q 5 5 5 15 L 5 20"
				/>

				<path
					stroke-width="2"
					fill="transparent"
					stroke-linecap="round"
					filter={`url(#${filterId})`}
					stroke={colors[1]}
					d={`M ${w - 20} 5 L ${w - 15} 5 Q ${w - 5} 5 ${w - 5} 15 L ${w - 5} 20`}
				/>

				<path
					stroke-width="2"
					fill="transparent"
					stroke-linecap="round"
					filter={`url(#${filterId})`}
					stroke={colors[1]}
					d={`
          M ${w - 20} ${h - 5} L ${w - 15} ${h - 5}
          Q ${w - 5} ${h - 5} ${w - 5} ${h - 15}
          L ${w - 5} ${h - 20}
        `}
				/>

				<path
					stroke-width="2"
					fill="transparent"
					stroke-linecap="round"
					filter={`url(#${filterId})`}
					stroke={colors[1]}
					d={`
          M 20 ${h - 5} L 15 ${h - 5}
          Q 5 ${h - 5} 5 ${h - 15}
          L 5 ${h - 20}
        `}
				/>
			</svg>
		</div>
	);
};

export default Border03Component;
