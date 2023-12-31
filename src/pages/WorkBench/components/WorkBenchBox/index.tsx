import { LeftOutlined } from "@ant-design/icons";
import { Card } from "antd";

interface WorkBenchBoxProps {
	bgColor: string;
	showTop: boolean;
	showTopHidden?: boolean;
	topTitle?: string;
	topIcon?: JSX.Element;
	TopOperator?: JSX.Element;
	hiddenBox?: () => void;
	children: JSX.Element[];
}

const WorkBenchBox = (props: WorkBenchBoxProps) => {
	const { bgColor, showTop, topTitle, showTopHidden = false, topIcon, TopOperator, hiddenBox, children } = props;

	return (
		<Card
			className="w-full h-full"
			bodyStyle={{ padding: 0, height: "100%", backgroundColor: bgColor }}
			style={{ borderRadius: "0" }}
			bordered={false}
		>
			<div className={` flex`}>
				{showTop && (
					<div className="w-full flex items-center justify-between px-3 py-2 border-b-1 border-[#000]">
						<div className="flex items-center gap-2">
							<div>{topTitle}</div>
							{topIcon}
						</div>
						<div className="flex items-center gap-2">
							{TopOperator}
							{showTopHidden && (
								<div className="cursor-pointer" onClick={() => hiddenBox && hiddenBox()}>
									<LeftOutlined />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
			<div className="flex h-full">{children.map((child) => child)}</div>
		</Card>
	);
};

export default WorkBenchBox;
