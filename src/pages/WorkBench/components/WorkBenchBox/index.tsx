import { AiOutlineLeft } from "react-icons/ai";
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
			{showTop && (
				<div className="flex w-full h-10">
					<div className="w-full flex items-center justify-between px-2 py-1 border-b-1 border-b-solid border-[#000]">
						<div className="flex items-center gap-1">
							<div>{topTitle}</div>
							{topIcon}
						</div>
						<div className="flex items-center gap-2">
							{TopOperator}
							{showTopHidden && (
								<div className="cursor-pointer" onClick={() => hiddenBox && hiddenBox()}>
									<AiOutlineLeft />
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			<div className="flex w-full" style={{ height: showTop ? "calc(100vh - 104px)" : "calc(100vh - 64px)" }}>
				{Array.isArray(children) ? children.map((child) => child) : children}
			</div>
		</Card>
	);
};

export default WorkBenchBox;
