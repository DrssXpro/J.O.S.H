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
import { useEffect, useState } from "react";
import { produce } from "immer";
import { ComponentType } from "@/materials/types";
import useCanvasStore from "@/store/canvasStore/canvasStore";

const JPosSetting = () => {
	const { canvasConfig } = useCanvasStore();
	const { updateChartConfig } = useChartStore();
	const { getTargetData, getTargetChartIndex } = useEditCharts();
	const component = getTargetData();
	const chartIndex = getTargetChartIndex()!;
	const [globalConfig, setGlobalGonfig] = useState<{
		attr: Pick<ComponentType, "attr">["attr"];
		updateKey: keyof ComponentType["attr"] | "";
	}>({
		attr: component!.attr,
		updateKey: ""
	});
	useEffect(() => {
		globalConfig.updateKey &&
			updateChartConfig(chartIndex, "attr", globalConfig.updateKey, globalConfig["attr"][globalConfig.updateKey]);
	}, [globalConfig]);

	useEffect(() => {
		component &&
			setGlobalGonfig({
				attr: component.attr,
				updateKey: ""
			});
	}, [chartIndex]);

	const positionList = [
		{
			key: "AlignHorizontalLeft",
			label: "局左",
			icon: <JIcon icon={<AlignHorizontalLeft />} size={18} />,
			clickHandle: () => {
				setGlobalGonfig(
					produce((draft) => {
						draft.attr.x = 0;
						draft.updateKey = "x";
					})
				);
			}
		},
		{
			key: "AlignVerticalCenter",
			label: "X轴居中",
			icon: <JIcon icon={<AlignVerticalCenter />} size={18} />,
			clickHandle: () => {
				setGlobalGonfig(
					produce((draft) => {
						draft.attr.y = (canvasConfig.canvasHeight - draft.attr.h) / 2;
						draft.updateKey = "y";
					})
				);
			}
		},
		{
			key: "AlignHorizontalRight",
			label: "局右",
			icon: <JIcon icon={<AlignHorizontalRight />} size={18} />,
			clickHandle: () => {
				setGlobalGonfig(
					produce((draft) => {
						draft.attr.x = canvasConfig.canvasWidth - draft.attr.w;
						draft.updateKey = "x";
					})
				);
			}
		},
		{
			key: "AlignVerticalTop",
			label: "顶部",
			icon: <JIcon icon={<AlignVerticalTop />} size={18} />,
			clickHandle: () => {
				setGlobalGonfig(
					produce((draft) => {
						draft.attr.y = 0;
						draft.updateKey = "y";
					})
				);
			}
		},
		{
			key: "AlignHorizontalCenter",
			label: "Y轴居中",
			icon: <JIcon icon={<AlignHorizontalCenter />} size={18} />,
			clickHandle: () => {
				setGlobalGonfig(
					produce((draft) => {
						draft.attr.x = (canvasConfig.canvasWidth - draft.attr.w) / 2;
						draft.updateKey = "x";
					})
				);
			}
		},
		{
			key: "AlignVerticalBottom",
			label: "底部",
			icon: <JIcon icon={<AlignVerticalBottom />} size={18} />,
			clickHandle: () => {
				setGlobalGonfig(
					produce((draft) => {
						draft.attr.y = canvasConfig.canvasHeight - draft.attr.h;
						draft.updateKey = "y";
					})
				);
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
						value={globalConfig.attr.y}
						onChange={(val) => {
							val &&
								setGlobalGonfig(
									produce((draft) => {
										draft.attr.y = val;
										draft.updateKey = "y";
									})
								);
						}}
					/>
					<InputNumber
						addonBefore={<Typography.Text>左</Typography.Text>}
						className="flex-1"
						value={globalConfig.attr.x}
						onChange={(val) => {
							val &&
								setGlobalGonfig(
									produce((draft) => {
										draft.attr.x = val;
										draft.updateKey = "x";
									})
								);
						}}
					/>
				</div>
			</JSettingBox>
		</>
	);
};

export default JPosSetting;
