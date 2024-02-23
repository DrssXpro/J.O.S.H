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
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";
import useCanvasStore from "@/store/canvasStore/canvasStore";

const JPosSetting = () => {
	const { canvasConfig } = useCanvasStore();
	const { updateChartConfig } = useChartStore();
	const { getTargetData, getTargetChartIndex } = useEditCharts();
	const component = getTargetData()!;
	const chartIndex = getTargetChartIndex()!;

	const positionList = [
		{
			key: "AlignHorizontalLeft",
			label: "局左",
			icon: <JIcon icon={<AlignHorizontalLeft />} size={18} />,
			clickHandle: () => {
				updateChartConfig(chartIndex, "attr", null, {
					...component.attr,
					x: 0
				});
			}
		},
		{
			key: "AlignVerticalCenter",
			label: "X轴居中",
			icon: <JIcon icon={<AlignVerticalCenter />} size={18} />,
			clickHandle: () => {
				updateChartConfig(chartIndex, "attr", null, {
					...component.attr,
					y: (canvasConfig.canvasHeight - component.attr.h) / 2
				});
			}
		},
		{
			key: "AlignHorizontalRight",
			label: "局右",
			icon: <JIcon icon={<AlignHorizontalRight />} size={18} />,
			clickHandle: () => {
				updateChartConfig(chartIndex, "attr", null, {
					...component.attr,
					x: canvasConfig.canvasWidth - component.attr.w
				});
			}
		},
		{
			key: "AlignVerticalTop",
			label: "顶部",
			icon: <JIcon icon={<AlignVerticalTop />} size={18} />,
			clickHandle: () => {
				updateChartConfig(chartIndex, "attr", null, { ...component.attr, y: 0 });
			}
		},
		{
			key: "AlignHorizontalCenter",
			label: "Y轴居中",
			icon: <JIcon icon={<AlignHorizontalCenter />} size={18} />,
			clickHandle: () => {
				updateChartConfig(chartIndex, "attr", null, {
					...component.attr,
					x: (canvasConfig.canvasWidth - component.attr.w) / 2
				});
			}
		},
		{
			key: "AlignVerticalBottom",
			label: "底部",
			icon: <JIcon icon={<AlignVerticalBottom />} size={18} />,
			clickHandle: () => {
				updateChartConfig(chartIndex, "attr", null, {
					...component.attr,
					y: canvasConfig.canvasHeight - component.attr.h
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
						value={component.attr.y}
						onChange={(val) => {
							val && updateChartConfig(chartIndex, "attr", null, { ...component.attr, y: val });
						}}
					/>
					<InputNumber
						addonBefore={<Typography.Text>左</Typography.Text>}
						className="flex-1"
						value={component.attr.x}
						onChange={(val) => {
							val && updateChartConfig(chartIndex, "attr", null, { ...component.attr, x: val });
						}}
					/>
				</div>
			</JSettingBox>
		</>
	);
};

export default JPosSetting;
