import { memo } from "react";
import { ChartConfigComponentProps } from "@/materials/types";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Slider, Switch } from "antd";
import { RadarShapeEnumList } from "../config";

const RadarConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JGlobalChartSetting {...props} />
			<JCollapseBox name="雷达" unfold>
				<>
					<JSettingBox name="样式">
						<div className="config-items-layout">
							<JSettingItem text="背景">
								<Switch
									value={chartOptions.radar.splitArea.show}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											splitArea: { ...chartOptions.radar.splitArea, show: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="分割线">
								<Switch
									value={chartOptions.radar.splitLine.show}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											splitLine: { ...chartOptions.radar.splitLine, show: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="雷达形状">
								<Select
									className="w-full"
									options={RadarShapeEnumList}
									value={chartOptions.radar.shape}
									onChange={(val) => {
										update(chartIndex, "option", "radar", { ...chartOptions.radar, shape: val });
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="坐标轴">
						<div className="config-items-layout">
							<JSettingItem text="轴线">
								<Switch
									value={chartOptions.radar.axisLine.show}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											axisLine: { ...chartOptions.radar.axisLine, show: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="刻度">
								<Switch
									value={chartOptions.radar.axisTick.show}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											axisTick: { ...chartOptions.radar.axisTick, show: val }
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="范围">
						<div className="config-items-layout">
							<JSettingItem text={`最小值：${chartOptions.radar.radius[0]}`}>
								<Slider
									className="w-full"
									min={0}
									max={100}
									value={parseInt(chartOptions.radar.radius[0])}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											radius: [`${val}%`, chartOptions.radar.radius[1]]
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text={`最大值：${chartOptions.radar.radius[1]}`}>
								<Slider
									className="w-full"
									min={0}
									max={100}
									value={parseInt(chartOptions.radar.radius[1])}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											radius: [chartOptions.radar.radius[0], `${val}%`]
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="偏移">
						<div className="config-items-layout">
							<JSettingItem text={`X 轴值：${chartOptions.radar.center[0]}`}>
								<Slider
									className="w-full"
									min={0}
									max={100}
									value={parseInt(chartOptions.radar.center[0])}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											center: [`${val}%`, chartOptions.radar.center[1]]
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text={`Y 轴值：${chartOptions.radar.center[1]}`}>
								<Slider
									className="w-full"
									min={0}
									max={100}
									value={parseInt(chartOptions.radar.center[1])}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											center: [chartOptions.radar.center[0], `${val}%`]
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="指示器">
						<div className="config-items-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.radar.axisName.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											axisName: { ...chartOptions.radar.axisName, color }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber
									className="w-full"
									min={9}
									value={chartOptions.radar.axisName.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											axisName: { ...chartOptions.radar.axisName, fontSize: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="文字标签">
								<Switch
									value={chartOptions.radar.axisName.show}
									onChange={(val) => {
										update(chartIndex, "option", "radar", {
											...chartOptions.radar,
											axisName: { ...chartOptions.radar.axisName, show: val }
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="背景">
						<div className="config-items-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].areaStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												areaStyle: { ...chartOptions.series[0].areaStyle, color }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="透明度">
								<InputNumber
									className="w-full"
									min={0}
									max={1}
									step={0.1}
									value={chartOptions.series[0].areaStyle.opacity}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												areaStyle: { ...chartOptions.series[0].areaStyle, opacity: val }
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

export default RadarConfigComponent;
