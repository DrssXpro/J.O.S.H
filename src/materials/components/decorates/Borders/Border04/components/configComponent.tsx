import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ChartConfigComponentProps } from "@/materials/types";
import { Button, ColorPicker, Input, InputNumber } from "antd";
import { option } from "../config";
import { memo } from "react";

const Border04ConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JCollapseBox name="标题" unfold>
				<>
					<JSettingBox name="内容">
						<JSettingItem>
							<Input
								className="w-full"
								value={chartOptions.borderTitle}
								onChange={(e) => {
									update(chartIndex, "option", "borderTitle", e.target.value);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="样式">
						<div className="config-items-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.borderTitleColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "borderTitleColor", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="文字大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={12}
									value={chartOptions.borderTitleSize}
									onChange={(val) => {
										update(chartIndex, "option", "borderTitleSize", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="高度">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={24}
									value={chartOptions.borderTitleHeight}
									onChange={(val) => {
										update(chartIndex, "option", "borderTitleHeight", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="宽度">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={50}
									step={10}
									value={chartOptions.borderTitleWidth}
									onChange={(val) => {
										update(chartIndex, "option", "borderTitleWidth", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
			<JCollapseBox name="边框" unfold>
				<>
					{chartOptions.colors.map((_: any, index: any) => (
						<JSettingBox name={`颜色-${index + 1}`} key={index}>
							<div className="config-items-layout">
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.colors[index]}
										onChange={(val) => {
											const color = val.toHexString();
											index === 0
												? update(chartIndex, "option", "colors", [
														color,
														chartOptions.colors[1]
													])
												: update(chartIndex, "option", "colors", [
														chartOptions.colors[0],
														color
													]);
										}}
									/>
								</JSettingItem>
								<JSettingItem>
									<Button
										onClick={() => {
											index === 0
												? update(chartIndex, "option", "colors", [
														option.colors[0],
														chartOptions.colors[1]
													])
												: update(chartIndex, "option", "colors", [
														chartOptions.colors[0],
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
							value={chartOptions.backgroundColor}
							onChange={(val) => {
								const color = val.toHexString();
								update(chartIndex, "option", "backgroundColor", color);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
			</JCollapseBox>
		</>
	);
});

export default Border04ConfigComponent;
