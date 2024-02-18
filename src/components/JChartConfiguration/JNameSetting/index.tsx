import { Input } from "antd";
import JSettingBox from "../public/JSettingBox";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";
import { useEffect, useState } from "react";
import { produce } from "immer";
import { ComponentType } from "@/materials/types";

const JNameSetting = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	const [globalConfig, setGlobalConfig] = useState<{
		chartConfig: Pick<ComponentType, "chartConfig">["chartConfig"];
		updateKey: keyof ComponentType["chartConfig"] | "";
	}>({
		chartConfig: component.chartConfig,
		updateKey: ""
	});

	useEffect(() => {
		globalConfig.updateKey &&
			updateChartConfig(chartIndex, "chartConfig", globalConfig.updateKey, globalConfig.chartConfig.title);
	}, [globalConfig]);

	useEffect(() => {
		component &&
			setGlobalConfig({
				chartConfig: component.chartConfig,
				updateKey: ""
			});
	}, [chartIndex]);
	return (
		<JSettingBox name="名称">
			<Input
				count={{ show: true, max: 12 }}
				maxLength={12}
				placeholder="请输入图表名称"
				allowClear
				value={globalConfig.chartConfig.title}
				onChange={(e) => {
					setGlobalConfig(
						produce((draft) => {
							draft.chartConfig.title = e.target.value;
							draft.updateKey = "title";
						})
					);
				}}
			/>
		</JSettingBox>
	);
};

export default JNameSetting;
