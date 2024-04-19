import { memo } from "react";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { Button, ColorPicker, InputNumber } from "antd";
import { option } from "../config";
import { ChartConfigComponentProps } from "@/materials/types";

const Border01ConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
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
			<JCollapseBox name="动画" unfold>
				<JSettingBox name="速度(s)">
					<InputNumber
						className="w-30"
						value={chartOptions.dur}
						step={0.5}
						min={0.5}
						onChange={(val) => {
							update(chartIndex, "option", "dur", val);
						}}
					/>
				</JSettingBox>
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
export default Border01ConfigComponent;
