import { memo } from "react";
import { Button, Divider, InputNumber, Tooltip, Typography } from "antd";
import JSettingBox from "../public/JSettingBox";
import {
	MdAlignHorizontalLeft,
	MdAlignHorizontalRight,
	MdAlignVerticalBottom,
	MdAlignVerticalTop,
	MdAlignHorizontalCenter,
	MdAlignVerticalCenter
} from "react-icons/md";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { chartInitConfig } from "@/settings/designSetting";
import { UpdateChartConfigType } from "@/store/chartStore/types";

interface IPosSettingProps {
	chartIndex: number;
	attr: typeof chartInitConfig;
	update: UpdateChartConfigType;
}

const JPosSetting = memo((props: IPosSettingProps) => {
	const { canvasConfig } = useCanvasStore();
	const { chartIndex, attr, update } = props;

	const positionList = [
		{
			key: "AlignHorizontalLeft",
			label: "局左",
			icon: <MdAlignHorizontalLeft />,
			clickHandle: () => {
				update(chartIndex, "attr", null, {
					...attr,
					x: 0
				});
			}
		},
		{
			key: "AlignVerticalCenter",
			label: "X轴居中",
			icon: <MdAlignVerticalCenter />,
			clickHandle: () => {
				update(chartIndex, "attr", null, {
					...attr,
					y: (canvasConfig.canvasHeight - attr.h) / 2
				});
			}
		},
		{
			key: "AlignHorizontalRight",
			label: "局右",
			icon: <MdAlignHorizontalRight />,
			clickHandle: () => {
				update(chartIndex, "attr", null, {
					...attr,
					x: canvasConfig.canvasWidth - attr.w
				});
			}
		},
		{
			key: "AlignVerticalTop",
			label: "顶部",
			icon: <MdAlignVerticalTop />,
			clickHandle: () => {
				update(chartIndex, "attr", null, { ...attr, y: 0 });
			}
		},
		{
			key: "AlignHorizontalCenter",
			label: "Y轴居中",
			icon: <MdAlignHorizontalCenter />,
			clickHandle: () => {
				update(chartIndex, "attr", null, {
					...attr,
					x: (canvasConfig.canvasWidth - attr.w) / 2
				});
			}
		},
		{
			key: "AlignVerticalBottom",
			label: "底部",
			icon: <MdAlignVerticalBottom />,
			clickHandle: () => {
				update(chartIndex, "attr", null, {
					...attr,
					y: canvasConfig.canvasHeight - attr.h
				});
			}
		}
	];
	return (
		<>
			<Divider className="my-4" />
			<div className="flex items-center gap-2 mb-4">
				{positionList.map((item) => (
					<Tooltip title={item.label} key={item.key}>
						<Button icon={item.icon} onClick={item.clickHandle} size="large" className="flex-1" />
					</Tooltip>
				))}
			</div>
			<JSettingBox name="位置">
				<div className="w-full flex gap-2">
					<InputNumber
						addonBefore={<Typography.Text>上</Typography.Text>}
						className="flex-1"
						value={attr.y}
						onChange={(val) => {
							val && update(chartIndex, "attr", null, { ...attr, y: val });
						}}
					/>
					<InputNumber
						addonBefore={<Typography.Text>左</Typography.Text>}
						className="flex-1"
						value={attr.x}
						onChange={(val) => {
							val && update(chartIndex, "attr", null, { ...attr, x: val });
						}}
					/>
				</div>
			</JSettingBox>
		</>
	);
});

export default JPosSetting;
