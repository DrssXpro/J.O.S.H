import { memo } from "react";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { labelConfig } from "@/materials/echartsConfig";
import { ChartConfigComponentProps } from "@/materials/types";
import { ColorPicker, InputNumber, Select, Switch } from "antd";

const labelFormatterOptions = [
	{ label: "数据名", value: "{b}" },
	{ label: "百分比", value: "{d}" },
	{ label: "列名:百分比", value: "{b}:{d}%" }
];

const TypeOptions = [
	{ label: "环形图", value: false },
	{ label: "玫瑰图", value: "radius" }
];

const PieCommonConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JGlobalChartSetting {...props} />
			<JCollapseBox name="饼图配置" unfold>
				<>
					<JSettingBox name="类型">
						<JSettingItem text="饼图类型">
							<Select
								className="w-32"
								options={TypeOptions}
								value={chartOptions.series[0].roseType}
								onChange={(value) => {
									const seriesOption = chartOptions.series[0];
									update(chartIndex, "option", "series", [{ ...seriesOption, roseType: value }]);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="标签">
						<div className="config-items-layout">
							<JSettingItem text="展示标签">
								<Switch
									value={chartOptions.series[0].label.show}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{ ...seriesOption, label: { ...seriesOption.label, show: value } }
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="引导线">
								<Switch
									value={chartOptions.series[0].labelLine.show}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{ ...seriesOption, labelLine: { ...seriesOption.labelLine, show: value } }
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="位置">
								<Select
									className="w-full"
									options={labelConfig.position}
									value={chartOptions.series[0].label.position}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{ ...seriesOption, label: { ...seriesOption.label, position: value } }
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="展示类型">
								<Select
									className="w-full"
									options={labelFormatterOptions}
									value={chartOptions.series[0].label.formatter}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{ ...seriesOption, label: { ...seriesOption.label, formatter: value } }
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="半径">
						<div className="config-items-layout">
							<JSettingItem text="内半径（单位: %）">
								<InputNumber
									className="w-full"
									min={0}
									value={parseInt(chartOptions.series[0].radius[0])}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										const radius = [...seriesOption.radius];
										radius[0] = `${value}%`;
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												radius: radius
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="外半径（单位: %）">
								<InputNumber
									className="w-full"
									min={0}
									value={parseInt(chartOptions.series[0].radius[1])}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										const radius = [...seriesOption.radius];
										radius[1] = `${value}%`;
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												radius: radius
											}
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="圆心坐标">
						<div className="config-items-layout">
							<JSettingItem text="横坐标（单位: %）">
								<InputNumber
									className="w-full"
									min={0}
									value={parseInt(chartOptions.series[0].center[0])}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										const center = [...seriesOption.center];
										center[0] = `${value}%`;
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												center: center
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="纵坐标（单位: %）">
								<InputNumber
									className="w-full"
									min={0}
									value={parseInt(chartOptions.series[0].center[1])}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										const center = [...seriesOption.center];
										center[1] = `${value}%`;
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												center: center
											}
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="圆角">
						<div className="config-items-layout">
							<JSettingItem text="圆角大小">
								<InputNumber
									className="w-full"
									min={0}
									value={chartOptions.series[0].itemStyle.borderRadius}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												itemStyle: { ...seriesOption.itemStyle, borderRadius: value }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="线条宽度">
								<InputNumber
									className="w-full"
									min={0}
									value={chartOptions.series[0].itemStyle.borderWidth}
									onChange={(value) => {
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												itemStyle: { ...seriesOption.itemStyle, borderWidth: value }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="线条颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].itemStyle.borderColor}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = chartOptions.series[0];
										update(chartIndex, "option", "series", [
											{
												...seriesOption,
												itemStyle: { ...seriesOption.itemStyle, borderColor: color }
											}
										]);
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

export default PieCommonConfigComponent;
