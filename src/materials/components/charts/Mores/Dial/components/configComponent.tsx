import { memo } from "react";
import { ColorPicker, InputNumber } from "antd";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ChartConfigComponentProps } from "@/materials/types";

const DialConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;

	return (
		<JCollapseBox name="表盘" unfold>
			<>
				<JSettingBox name="字体">
					<div className="config-items-layout">
						<JSettingItem text="颜色">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.series[0].axisLabel.color}
								onChange={(val) => {
									const color = val.toHexString();
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [
										{ ...seriesOption, axisLabel: { ...seriesOption.axisLabel, color } },
										chartOptions.series[1]
									]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="字体大小">
							<InputNumber
								className="w-full"
								min={0}
								step={1}
								value={chartOptions.series[0].axisLabel.fontSize}
								onChange={(val) => {
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [
										{ ...seriesOption, axisLabel: { ...seriesOption.axisLabel, fontSize: val } },
										chartOptions.series[1]
									]);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="表盘外部">
					<JSettingItem text="颜色">
						<ColorPicker
							className="w-32"
							showText
							value={chartOptions.series[1].axisLine.lineStyle.color[1][1]}
							onChange={(val) => {
								const color = val.toHexString();
								const seriesOption = chartOptions.series[1];
								update(chartIndex, "option", "series", [
									chartOptions.series[0],
									{
										...seriesOption,
										axisLine: {
											...seriesOption.axisLine,
											lineStyle: {
												...seriesOption.axisLine.lineStyle,
												color: [seriesOption.axisLine.lineStyle.color[0], [1, color]]
											}
										}
									}
								]);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="指针">
					<div className="config-items-layout">
						<JSettingItem text="颜色">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.series[0].data[0].itemStyle.color}
								onChange={(val) => {
									const color = val.toHexString();
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [
										{
											...seriesOption,
											data: [
												{
													...seriesOption.data[0],
													itemStyle: { ...seriesOption.data[0].itemStyle, color }
												}
											]
										},
										chartOptions.series[1]
									]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="宽度">
							<InputNumber
								className="w-full"
								min={0}
								step={1}
								value={chartOptions.series[0].pointer.width}
								onChange={(val) => {
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [
										{ ...seriesOption, pointer: { ...seriesOption.pointer, width: val } },
										chartOptions.series[1]
									]);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="刻度">
					<div className="config-items-layout">
						<JSettingItem text="最小值">
							<InputNumber
								className="w-full"
								min={0}
								step={1}
								value={chartOptions.series[0].min}
								onChange={(val) => {
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [
										{ ...seriesOption, min: val },
										chartOptions.series[1]
									]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="最大值">
							<InputNumber
								className="w-full"
								min={0}
								step={1}
								value={chartOptions.series[0].max}
								onChange={(val) => {
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [
										{ ...seriesOption, max: val },
										chartOptions.series[1]
									]);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="颜色">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.series[1].axisTick.lineStyle.color}
								onChange={(val) => {
									const color = val.toHexString();
									const seriesOption = chartOptions.series[1];
									update(chartIndex, "option", "series", [
										chartOptions.series[0],
										{
											...seriesOption,
											axisTick: {
												...seriesOption.axisTick,
												lineStyle: { ...seriesOption.axisTick.lineStyle, color }
											}
										}
									]);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
			</>
		</JCollapseBox>
	);
});

export default DialConfigComponent;
