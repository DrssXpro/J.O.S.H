import { memo } from "react";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select } from "antd";
import { ChartConfigComponentProps } from "@/materials/types";
import { shapes } from "../config";

const WaterPoloConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;

	return (
		<JCollapseBox name="水球" unfold>
			<>
				<JSettingBox name="内容">
					<div className="config-items-layout">
						<JSettingItem text="形状">
							<Select
								className="w-full"
								options={shapes}
								value={chartOptions.series[0].shape}
								onChange={(val) => {
									update(chartIndex, "option", "series", [{ ...chartOptions.series[0], shape: val }]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="文本大小">
							<InputNumber
								className="w-full"
								min={0}
								step={1}
								value={chartOptions.series[0].label.fontSize}
								onChange={(val) => {
									update(chartIndex, "option", "series", [
										{
											...chartOptions.series[0],
											label: { ...chartOptions.series[0].label, fontSize: val }
										}
									]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="颜色1">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.series[0].color[0].colorStops[0].color}
								onChange={(val) => {
									const color = val.toHexString();
									update(chartIndex, "option", "series", [
										{
											...chartOptions.series[0],
											color: [
												{
													...chartOptions.series[0].color[0],
													colorStops: [
														{ ...chartOptions.series[0].color[0].colorStops[0], color },
														chartOptions.series[0].color[0].colorStops[1]
													]
												}
											]
										}
									]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="颜色2">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.series[0].color[0].colorStops[1].color}
								onChange={(val) => {
									const color = val.toHexString();
									update(chartIndex, "option", "series", [
										{
											...chartOptions.series[0],
											color: [
												{
													...chartOptions.series[0].color[0],
													colorStops: [
														chartOptions.series[0].color[0].colorStops[0],
														{ ...chartOptions.series[0].color[0].colorStops[1], color }
													]
												}
											]
										}
									]);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="背景">
					<JSettingItem text="颜色">
						<ColorPicker
							className="w-full"
							showText
							value={chartOptions.series[0].backgroundStyle.color}
							onChange={(val) => {
								const color = val.toHexString();
								update(chartIndex, "option", "series", [
									{
										...chartOptions.series[0],
										backgroundStyle: { ...chartOptions.series[0].backgroundStyle, color }
									}
								]);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
			</>
		</JCollapseBox>
	);
});

export default WaterPoloConfigComponent;
