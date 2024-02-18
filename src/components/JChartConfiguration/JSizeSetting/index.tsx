import { useEffect, useState } from "react";
import { InputNumber, Typography } from "antd";
import JSettingBox from "../public/JSettingBox";

import useEditCharts from "@/hooks/useEditCharts";
import { ComponentType } from "@/materials/types";
import useChartStore from "@/store/chartStore/chartStore";
import { produce } from "immer";

const JSizeSetting = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
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
	return (
		<JSettingBox name="尺寸">
			<div className="w-full flex gap-2">
				<InputNumber
					addonBefore={<Typography.Text>宽度</Typography.Text>}
					className="flex-1"
					value={globalConfig.attr.w}
					onChange={(val) => {
						val &&
							setGlobalGonfig(
								produce((draft) => {
									draft.attr.w = val;
									draft.updateKey = "w";
								})
							);
					}}
				/>
				<InputNumber
					addonBefore={<Typography.Text>高度</Typography.Text>}
					className="flex-1"
					value={globalConfig.attr.h}
					onChange={(val) => {
						val &&
							setGlobalGonfig(
								produce((draft) => {
									draft.attr.h = val;
									draft.updateKey = "h";
								})
							);
					}}
				/>
			</div>
		</JSettingBox>
	);
};

export default JSizeSetting;
