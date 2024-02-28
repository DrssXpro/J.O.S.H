import { Input } from "antd";
import JSettingBox from "../public/JSettingBox";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";

const JNameSetting = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<JSettingBox name="名称">
			<Input
				count={{ show: true, max: 12 }}
				maxLength={12}
				placeholder="请输入图表名称"
				allowClear
				value={component.chartConfig.title}
				onChange={(e) => {
					updateChartConfig(chartIndex, "chartConfig", "title", e.target.value);
				}}
			/>
		</JSettingBox>
	);
};

export default JNameSetting;
