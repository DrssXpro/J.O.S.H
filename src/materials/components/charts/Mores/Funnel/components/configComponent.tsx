import { memo } from "react";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import { ChartConfigComponentProps } from "@/materials/types";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Slider, Switch } from "antd";
import { FunnelLabelPositionEnumList, FunnelOrderEnumList } from "../config";

const FunnelConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JGlobalChartSetting {...props} />
			<JCollapseBox name="漏斗图" unfold>
				<>
					<JSettingBox name="排序">
						<JSettingItem>
							<Select
								className="w-full"
								options={FunnelOrderEnumList}
								value={chartOptions.series[0].sort}
								onChange={(val) => {
									update(chartIndex, "option", "series", [{ ...chartOptions.series[0], sort: val }]);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="范围">
						<JSettingItem text={`顶部距离：${chartOptions.series[0].top}px`}>
							<Slider
								min={0}
								max={300}
								tooltip={{ formatter: (value) => `${value}px` }}
								value={chartOptions.series[0].top}
								onChange={(val) => {
									update(chartIndex, "option", "series", [{ ...chartOptions.series[0], top: val }]);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="区块">
						<div className="config-layout">
							<JSettingItem text="边框大小">
								<InputNumber
									className="w-full"
									min={0}
									max={10}
									value={chartOptions.series[0].itemStyle.borderWidth}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												itemStyle: { ...chartOptions.series[0].itemStyle, borderWidth: val }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="边框颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].itemStyle.borderColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												itemStyle: { ...chartOptions.series[0].itemStyle, borderColor: color }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="间隔">
								<InputNumber
									className="w-full"
									min={0}
									max={20}
									value={chartOptions.series[0].gap}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{ ...chartOptions.series[0], gap: val }
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="标签">
						<div className="config-layout">
							<JSettingItem text="是否显示">
								<Switch
									value={chartOptions.series[0].label.show}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												label: { ...chartOptions.series[0].label, show: val }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="位置">
								<Select
									className="w-full"
									options={FunnelLabelPositionEnumList}
									value={chartOptions.series[0].label.position}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												label: { ...chartOptions.series[0].label, position: val }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber
									className="w-full"
									min={0}
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
							<JSettingItem text="悬停时大小">
								<InputNumber
									className="w-full"
									min={0}
									value={chartOptions.series[0].emphasis.label.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												emphasis: {
													...chartOptions.series[0].emphasis,
													label: { ...chartOptions.series[0].RiEmphasis.label, fontSize: val }
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
		</>
	);
});

export default FunnelConfigComponent;
