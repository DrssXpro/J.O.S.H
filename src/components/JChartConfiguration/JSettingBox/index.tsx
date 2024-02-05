import { Typography } from "antd";

interface IJSettingBoxProps {
	name: string;
	children: JSX.Element;
}

const JSettingBox = (props: IJSettingBoxProps) => {
	const { name, children } = props;
	return (
		<div className="w-full flex mb-6 gap-4 px-2">
			<div className="w-10">
				<Typography.Text className="text-[12px]">{name}</Typography.Text>
			</div>
			<div className="flex-1">{children}</div>
		</div>
	);
};

export default JSettingBox;
