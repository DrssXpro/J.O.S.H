import { memo, useMemo, useState } from "react";
import { Button, Col, Row } from "antd";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import { animationsList } from "@/settings/animationSetting";
import { UpdateChartConfigType } from "@/store/chartStore/types";

import { ConfigurationProps } from "@/materials/types";

interface AnimationConfigurationProps {
	chartIndex: number;
	animations: string[];
	update: UpdateChartConfigType;
}

const AnimationConfiguration = memo(({ chartIndex, animations, update }: AnimationConfigurationProps) => {
	const selectAnimate = useMemo(() => (animations.length ? animations[0] : ""), [animations]);
	const [hoverAnimate, setHoverAnimate] = useState("");

	console.log("rneder");
	return (
		<div className="flex flex-col gap-4">
			<Button
				block
				disabled={!selectAnimate}
				onClick={() => {
					update(chartIndex, "styles", "animations", [""]);
				}}
			>
				清除动画
			</Button>
			<div>
				{animationsList.map((item, index) => (
					<JCollapseBox name={item.label} key={index} unfold>
						<Row gutter={[10, 10]}>
							{item.children.map((i) => (
								<Col className="gutter-row" key={i.value} span={8}>
									<div
										className={`${
											hoverAnimate === i.value && `animate__animated  animate__${i.value}`
										} ${
											selectAnimate === i.value && "text-[#1677FF] border-[#1677FF]"
										} py-3 px-2 text-[14px] text-center border-[#3E3E3F] border-1 border-solid rounded cursor-pointer hover:border-[#1677FF] hover:text-[#1677FF] transition-all`}
										onMouseOver={() => {
											setHoverAnimate(i.value);
										}}
										onClick={() => {
											update(chartIndex, "styles", "animations", [i.value]);
										}}
									>
										{i.label}
									</div>
								</Col>
							))}
						</Row>
					</JCollapseBox>
				))}
			</div>
		</div>
	);
});

// 包裹使用 context，内部组件传入 props 并使用 memo，避免重复渲染
const AnimationConfigurationWrapper = (props: ConfigurationProps) => {
	const { chartIndex, component, update } = props;
	return <AnimationConfiguration chartIndex={chartIndex} animations={component.styles.animations} update={update} />;
};

export default AnimationConfigurationWrapper;
