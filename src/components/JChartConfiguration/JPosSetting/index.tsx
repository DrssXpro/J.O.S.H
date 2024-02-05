import { Button, Divider, InputNumber, Tooltip, Typography } from "antd";
import JSettingBox from "../public/JSettingBox";
import JIcon from "@/components/JIcon";
import {
	AlignHorizontalCenter,
	AlignHorizontalLeft,
	AlignHorizontalRight,
	AlignVerticalBottom,
	AlignVerticalCenter,
	AlignVerticalTop
} from "@ricons/carbon";

const positionList = [
	{
		key: "AlignHorizontalLeft",
		label: "局左",
		icon: <JIcon icon={<AlignHorizontalLeft />} size={18} />
	},
	{
		key: "AlignVerticalCenter",
		label: "X轴居中",
		icon: <JIcon icon={<AlignVerticalCenter />} size={18} />
	},
	{
		key: "AlignHorizontalRight",
		label: "局右",
		icon: <JIcon icon={<AlignHorizontalRight />} size={18} />
	},
	{
		key: "AlignVerticalTop",
		label: "顶部",
		icon: <JIcon icon={<AlignVerticalTop />} size={18} />
	},
	{
		key: "AlignHorizontalCenter",
		label: "Y轴居中",
		icon: <JIcon icon={<AlignHorizontalCenter />} size={18} />
	},
	{
		key: "AlignVerticalBottom",
		label: "底部",
		icon: <JIcon icon={<AlignVerticalBottom />} size={18} />
	}
];

const JPosSetting = () => {
	return (
		<>
			<Divider className="my-4" />
			<div className="flex items-center gap-2 mb-4">
				{positionList.map((item) => (
					<Tooltip title={item.label}>
						<Button key={item.key} icon={item.icon} size="large" className="flex-1" />
					</Tooltip>
				))}
			</div>
			<JSettingBox name="位置">
				<div className="w-full flex gap-2">
					<InputNumber
						addonBefore={<Typography.Text>上</Typography.Text>}
						className="flex-1"
						defaultValue={100}
					/>
					<InputNumber
						addonBefore={<Typography.Text>左</Typography.Text>}
						className="flex-1"
						defaultValue={50}
					/>
				</div>
			</JSettingBox>
		</>
	);
};

export default JPosSetting;
