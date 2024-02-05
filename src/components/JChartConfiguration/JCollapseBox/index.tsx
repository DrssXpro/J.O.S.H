import { Collapse, CollapseProps, Divider, Switch, Typography } from "antd";

interface IJCollapseBoxProps {
	name: string;
	children: JSX.Element;
}

const JCollapseBox = (props: IJCollapseBoxProps) => {
	const { name, children } = props;
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: (
				<div className="w-full flex items-center justify-between">
					<Typography.Text>{name}</Typography.Text>
					<div
						onClick={(e) => {
							// Collapse 与 Switch 冲突问题
							e.stopPropagation();
						}}
					>
						<Switch defaultChecked checkedChildren="开启" unCheckedChildren="关闭" />
					</div>
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
