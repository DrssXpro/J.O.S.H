import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { Button, ColorPicker, Input, InputNumber } from "antd";
import { option } from "../config";

const Border04ConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	return (
		<>
			<JCollapseBox name="标题" unfold>
				<>
					<JSettingBox name="内容">
						<JSettingItem>
							<Input
								className="w-full"
								value={component.option.borderTitle}
								onChange={(e) => {
									updateChartConfig(chartIndex, "option", "borderTitle", e.target.value);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="样式">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.borderTitleColor}
									onChange={(val) => {
										const color = val.toHexString();
										updateChartConfig(chartIndex, "option", "borderTitleColor", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="文字大小">
								<InputNumber
									className="w-full"
									min={12}
									value={component.option.borderTitleSize}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "borderTitleSize", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="高度">
								<InputNumber
									className="w-full"
									min={24}
									value={component.option.borderTitleHeight}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "borderTitleHeight", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="宽度">
								<InputNumber
									className="w-full"
									min={50}
									step={10}
									value={component.option.borderTitleWidth}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "borderTitleWidth", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
			<JCollapseBox name="边框" unfold>
				<>
					{component.option.colors.map((_: any, index: any) => (
						<JSettingBox name={`颜色-${index + 1}`} key={index}>
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={component.option.colors[index]}
										onChange={(val) => {
											const color = val.toHexString();
											index === 0
												? updateChartConfig(chartIndex, "option", "colors", [
														color,
														component.option.colors[1]
													])
												: updateChartConfig(chartIndex, "option", "colors", [
														component.option.colors[0],
														color
													]);
										}}
									/>
								</JSettingItem>
								<JSettingItem>
									<Button
										onClick={() => {
											index === 0
												? updateChartConfig(chartIndex, "option", "colors", [
														option.colors[0],
														component.option.colors[1]
													])
												: updateChartConfig(chartIndex, "option", "colors", [
														component.option.colors[0],
														option.colors[1]
													]);
										}}
									>
										恢复默认
									</Button>
								</JSettingItem>
							</div>
						</JSettingBox>
					))}
				</>
			</JCollapseBox>
			<JCollapseBox name="背景" unfold>
				<JSettingBox name="颜色">
					<JSettingItem>
						<ColorPicker
							className="w-full"
							showText
							value={component.option.backgroundColor}
							onChange={(val) => {
								const color = val.toHexString();
								updateChartConfig(chartIndex, "option", "backgroundColor", color);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
			</JCollapseBox>
		</>
	);
};

export default Border04ConfigComponent;
