import { InputNumber, Typography } from "antd";
import JSettingBox from "../public/JSettingBox";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";

const JSizeSetting = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<JSettingBox name="尺寸">
			<div className="w-full flex gap-2">
				<InputNumber
					addonBefore={<Typography.Text>宽度</Typography.Text>}
					className="flex-1"
					value={component.attr.w}
					onChange={(val) => {
						val && updateChartConfig(chartIndex, "attr", null, { ...component.attr, w: val });
					}}
				/>
				<InputNumber
					addonBefore={<Typography.Text>高度</Typography.Text>}
					className="flex-1"
					value={component.attr.h}
					onChange={(val) => {
						val && updateChartConfig(chartIndex, "attr", null, { ...component.attr, h: val });
					}}
				/>
			</div>
		</JSettingBox>
	);
};

export default JSizeSetting;
