import { memo } from "react";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ChartConfigComponentProps } from "@/materials/types";
import { Button, ColorPicker } from "antd";
import { option } from "../config";

const Border02ConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JCollapseBox name="边框" unfold>
				<>
					{chartOptions.colors.map((_: any, index: any) => (
						<JSettingBox name={`颜色-${index + 1}`} key={index}>
							<div className="grid grid-cols-2 gap-2">
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
export default Border02ConfigComponent;
