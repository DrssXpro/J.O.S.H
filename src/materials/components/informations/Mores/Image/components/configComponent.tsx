import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { Input, InputNumber, Select } from "antd";

// 适应类型
const fitList = [
	{
		value: "fill",
		label: "fill"
	},
	{
		value: "contain",
		label: "contain"
	},
	{
		value: "cover",
		label: "cover"
	},
	{
		value: "none",
		label: "none"
	}
];

const ImageConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	return (
		<JCollapseBox name="属性" unfold>
			<>
				<JSettingBox name="路径">
					<Input
						value={component.option.dataset}
						onChange={(e) => {
							updateChartConfig(chartIndex, "option", "dataset", e.target.value);
						}}
					/>
				</JSettingBox>
				<JSettingBox name="样式">
					<div className="grid grid-cols-2 gap-2">
						<JSettingItem text="类型">
							<Select
								className="w-full"
								options={fitList}
								value={component.option.fit}
								onChange={(val) => {
									updateChartConfig(chartIndex, "option", "fit", val);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="圆角">
							<InputNumber
								className="w-full"
								min={0}
								value={component.option.borderRadius}
								onChange={(val) => {
									updateChartConfig(chartIndex, "option", "borderRadius", val);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
			</>
		</JCollapseBox>
	);
};

export default ImageConfigComponent;
