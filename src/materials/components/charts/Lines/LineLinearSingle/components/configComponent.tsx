import { memo } from "react";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { axisConfig } from "@/materials/echartsConfig";
import { ChartConfigComponentProps } from "@/materials/types";
import { ColorPicker, InputNumber, Select } from "antd";

const LineLinearSingleConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JGlobalChartSetting {...props} />
			<JCollapseBox name="样式" unfold>
				<>
					<JSettingBox name="线条">
						<div className="config-layout">
							<JSettingItem text="颜色1">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].lineStyle.color.colorStops[0].color}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = chartOptions.series[0];
										const colorStops = [...seriesOption.lineStyle.color.colorStops];
										colorStops[0] = { ...colorStops[0], color: color };
										val &&
											update(chartIndex, "option", "series", [
												{
													...seriesOption,
													lineStyle: {
														...seriesOption.lineStyle,
														color: {
															...seriesOption.lineStyle.color,
															colorStops: [...colorStops]
														}
													}
												}
											]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色2">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].lineStyle.color.colorStops[1].color}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = chartOptions.series[0];
										const colorStops = [...seriesOption.lineStyle.color.colorStops];
										colorStops[1] = { ...colorStops[1], color: color };
										val &&
											update(chartIndex, "option", "series", [
												{
													...seriesOption,
													lineStyle: {
														...seriesOption.lineStyle,
														color: {
															...seriesOption.lineStyle.color,
															colorStops: [...colorStops]
														}
													}
												}
											]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="宽度">
								<InputNumber
									className="w-full"
									value={chartOptions.series[0].lineStyle.width}
									min={1}
									onChange={(val) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{ ...seriesOption, lineStyle: { ...seriesOption.lineStyle, width: val } }
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="类型">
								<Select
									value={chartOptions.series[0].lineStyle.type}
									className="w-full"
									options={axisConfig.splitLint.lineStyle}
									onChange={(val) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{ ...seriesOption, lineStyle: { ...seriesOption.lineStyle, type: val } }
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="实心点">
						<JSettingItem text="大小">
							<InputNumber
								className="w-32"
								value={chartOptions.series[0].symbolSize}
								min={1}
								onChange={(val) => {
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [{ ...seriesOption, symbolSize: val }]);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="阴影">
						<JSettingItem text="颜色">
							<ColorPicker
								className="w-32"
								showText
								value={chartOptions.series[0].lineStyle.shadowColor}
								onChange={(val) => {
									const color = val.toHexString();
									const seriesOption = chartOptions.series[0];
									val &&
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												lineStyle: {
													...seriesOption.lineStyle,
													shadowColor: color
												}
											}
										]);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
});

export default LineLinearSingleConfigComponent;
