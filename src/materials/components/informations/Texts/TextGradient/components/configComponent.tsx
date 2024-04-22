import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ChartConfigComponentProps } from "@/materials/types";
import { ColorPicker, Input, InputNumber } from "antd";
import { memo } from "react";

const TextGradientConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JCollapseBox name="信息" unfold>
				<JSettingBox name="文字">
					<JSettingItem>
						<Input.TextArea
							className="w-full"
							value={chartOptions.dataset}
							onChange={(e) => {
								update(chartIndex, "option", "dataset", e.target.value);
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
								className="w-32"
								placeholder="请输入"
								min={12}
								value={chartOptions.size}
								onChange={(val) => {
									update(chartIndex, "option", "size", val);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="渐变参数">
						<div className="config-items-layout">
							<JSettingItem text="起始值">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.gradient.from}
									onChange={(val) => {
										const color = val.toHexString();
										val &&
											update(chartIndex, "option", "gradient", {
												...chartOptions.gradient,
												from: color
											});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="结束值">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.gradient.to}
									onChange={(val) => {
										const color = val.toHexString();
										val &&
											update(chartIndex, "option", "gradient", {
												...chartOptions.gradient,
												to: color
											});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="偏移角度">
								<InputNumber
									className="w-32"
									placeholder="请输入"
									value={chartOptions.gradient.deg}
									onChange={(val) => {
										update(chartIndex, "option", "gradient", {
											...chartOptions.gradient,
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
});

export default TextGradientConfigComponent;
