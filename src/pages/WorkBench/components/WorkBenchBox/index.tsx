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
	children: JSX.Element[] | JSX.Element;
}

const WorkBenchBox = (props: WorkBenchBoxProps) => {
	const { bgColor, showTop, topTitle, showTopHidden = false, topIcon, TopOperator, hiddenBox, children } = props;

	return (
		<Card
			className="w-full h-full"
			bodyStyle={{ padding: 0, height: "100%", backgroundColor: bgColor, overflow: "auto" }}
			style={{ borderRadius: "0" }}
			bordered={false}
		>
			<div className="flex w-full h-10">
				{showTop && (
					<div className="w-full flex items-center justify-between px-2 py-1 border-b-1 border-[#000]">
						<div className="flex items-center gap-1">
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
			<div className="flex w-full h-full">
				{Array.isArray(children) ? children.map((child) => child) : children}
			</div>
		</Card>
	);
};

export default WorkBenchBox;
