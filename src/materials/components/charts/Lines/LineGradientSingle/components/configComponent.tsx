import { memo } from "react";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Switch } from "antd";
import { axisConfig } from "@/materials/echartsConfig";
import { ChartConfigComponentProps } from "@/materials/types";

const LineGradientSingleConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;

	return (
		<>
			<JGlobalChartSetting {...props} />
			{chartOptions.series.map((i: any, index: number) => (
				<JCollapseBox name="单折线面积图" key={index} unfold>
					<>
						<JSettingBox name="线条">
							<div className="config-items-layout">
								<JSettingItem text="宽度">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={i.lineStyle.width}
										onChange={(val) => {
											const series = chartOptions.series[0];
											update(chartIndex, "option", "series", [
												{ ...series, lineStyle: { ...series.lineStyle, width: val } }
											]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="类型">
									<Select
										value={i.lineStyle.type}
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										onChange={(val) => {
											const series = chartOptions.series[0];
											update(chartIndex, "option", "series", [
												{ ...series, lineStyle: { ...series.lineStyle, type: val } }
											]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="实心点">
							<div className="config-items-layout">
								<JSettingItem text="宽度">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={i.symbolSize}
										onChange={(val) => {
											const series = chartOptions.series[0];
											update(chartIndex, "option", "series", [{ ...series, symbolSize: val }]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={i.label.show}
										onChange={(val) => {
											const series = chartOptions.series[0];
											update(chartIndex, "option", "series", [
												{ ...series, label: { ...series.label, show: val } }
											]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={i.label.fontSize}
										onChange={(val) => {
											const series = chartOptions.series[0];
											val &&
												update(chartIndex, "option", "series", [
													{ ...series, label: { ...series.label, fontSize: val } }
												]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="tip颜色">
									<ColorPicker
										className="w-full"
										showText
										value={i.label.color}
										onChange={(val) => {
											const color = val.toHexString();
											const series = chartOptions.series[0];
											val &&
												update(chartIndex, "option", "series", [
													{ ...series, label: { ...series.label, color } }
												]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										value={i.label.position}
										className="w-full"
										options={[
											{ label: "top", value: "top" },
											{ label: "left", value: "left" },
											{ label: "right", value: "right" },
											{ label: "bottom", value: "bottom" }
										]}
										onChange={(val) => {
											const series = chartOptions.series[0];
											val &&
												update(chartIndex, "option", "series", [
													{ ...series, label: { ...series.label, position: val } }
												]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			))}
		</>
	);
});

export default LineGradientSingleConfigComponent;
