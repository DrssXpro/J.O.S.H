import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import { animations } from "@/settings/animationSetting";
import { Button, Col, Row } from "antd";
import { useState } from "react";

const AnimationConfiguration = () => {
	const [hoverAnimate, setHoverAnimate] = useState("");
	const [selectAnimate, setSelectAnimate] = useState("");
	return (
		<div className="flex flex-col gap-4">
			<Button
				block
				disabled={!selectAnimate}
				onClick={() => {
					setSelectAnimate("");
				}}
			>
				清除动画
			</Button>
			<div>
				{animations.map((item, index) => (
					<JCollapseBox name={item.label} key={index}>
						<Row gutter={[10, 10]}>
							{item.children.map((i) => (
								<Col className="gutter-row" key={i.value} span={8}>
									<div
										className={`${
											hoverAnimate === i.value && `animate__animated  animate__${i.value}`
										} ${
											selectAnimate === i.value && "text-[#1677FF] border-[#1677FF]"
										} py-3 px-2 text-[14px] text-center border-[#3E3E3F] border-1 rounded cursor-pointer hover:border-[#1677FF] hover:text-[#1677FF] transition-all`}
										onMouseOver={() => {
											setHoverAnimate(i.value);
										}}
										onClick={() => {
											setSelectAnimate(i.value);
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
};

export default AnimationConfiguration;
