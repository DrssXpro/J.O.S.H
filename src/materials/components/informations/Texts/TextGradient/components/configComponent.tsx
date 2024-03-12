import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { ColorPicker, Input, InputNumber } from "antd";

const TextGradientConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	return (
		<>
			<JCollapseBox name="信息" unfold>
				<JSettingBox name="文字">
					<JSettingItem>
						<Input.TextArea
							className="w-full"
							value={component.option.dataset}
							onChange={(e) => {
								updateChartConfig(chartIndex, "option", "dataset", e.target.value);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
			</JCollapseBox>
			<JCollapseBox name="样式" unfold>
				<>
					<JSettingBox name="文字">
						<JSettingItem text="字体大小">
							<InputNumber
								min={12}
								value={component.option.size}
								onChange={(val) => {
									updateChartConfig(chartIndex, "option", "size", val);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="渐变参数">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="起始值">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.gradient.from}
									onChange={(val) => {
										const color = val.toHexString();
										val &&
											updateChartConfig(chartIndex, "option", "gradient", {
												...component.option.gradient,
												from: color
											});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="结束值">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.gradient.to}
									onChange={(val) => {
										const color = val.toHexString();
										val &&
											updateChartConfig(chartIndex, "option", "gradient", {
												...component.option.gradient,
												to: color
											});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="偏移角度">
								<InputNumber
									value={component.option.gradient.deg}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "gradient", {
											...component.option.gradient,
											deg: val
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
};

export default TextGradientConfigComponent;
