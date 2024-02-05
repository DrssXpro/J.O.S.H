import { Collapse, CollapseProps, Divider, Typography } from "antd";

interface IJCollapseBoxProps {
	name: string;
	operator?: JSX.Element;
	children: JSX.Element;
}

const JCollapseBox = (props: IJCollapseBoxProps) => {
	const { name, children, operator } = props;
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: (
				<div className="w-full flex items-center justify-between">
					<Typography.Text>{name}</Typography.Text>
					{operator && (
						<div
							onClick={(e) => {
								// Collapse 与 Switch 冲突问题
								e.stopPropagation();
							}}
						>
							{operator}
						</div>
					)}
				</div>
			),
			children
		}
	];
	return (
		<>
			<Divider style={{ margin: 0 }} />
			<Collapse ghost items={items} />
		</>
	);
};

export default JCollapseBox;
