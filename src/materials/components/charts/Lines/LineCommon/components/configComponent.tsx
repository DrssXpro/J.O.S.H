import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Switch } from "antd";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";
import { axisConfig } from "@/materials/echartsConfig";

const LineCommonConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<>
			<JGlobalChartSetting chartIndex={chartIndex} />
			{component.option.series.map((i: any, index: number) => (
				<JCollapseBox name={index === 0 ? "折线图-1" : "折线图-2"} key={index} unfold>
					<>
						<JSettingBox name="线条">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="宽度">
									<InputNumber
										className="w-full"
										value={i.lineStyle.width}
										onChange={(val) => {
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											index === 0
												? updateChartConfig(chartIndex, "option", "series", [
														{ ...series1, lineStyle: { ...series1.lineStyle, width: val } },
														{ ...series2 }
													])
												: updateChartConfig(chartIndex, "option", "series", [
														{ ...series1 },
														{ ...series2, lineStyle: { ...series2.lineStyle, width: val } }
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
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											index === 0
												? updateChartConfig(chartIndex, "option", "series", [
														{ ...series1, lineStyle: { ...series1.lineStyle, type: val } },
														{ ...series2 }
													])
												: updateChartConfig(chartIndex, "option", "series", [
														{ ...series1 },
														{ ...series2, lineStyle: { ...series2.lineStyle, type: val } }
													]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="实心点">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="宽度">
									<InputNumber
										className="w-full"
										value={i.symbolSize}
										onChange={(val) => {
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											index === 0
												? updateChartConfig(chartIndex, "option", "series", [
														{ ...series1, symbolSize: val },
														{ ...series2 }
													])
												: updateChartConfig(chartIndex, "option", "series", [
														{ ...series1 },
														{ ...series2, symbolSize: val }
													]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={i.label.show}
										onChange={(val) => {
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											index === 0
												? updateChartConfig(chartIndex, "option", "series", [
														{ ...series1, label: { ...series1.label, show: val } },
														{ ...series2 }
													])
												: updateChartConfig(chartIndex, "option", "series", [
														{ ...series1 },
														{ ...series2, label: { ...series2.label, show: val } }
													]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										value={i.label.fontSize}
										onChange={(val) => {
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											val &&
												(index === 0
													? updateChartConfig(chartIndex, "option", "series", [
															{ ...series1, label: { ...series1.label, fontSize: val } },
															{ ...series2 }
														])
													: updateChartConfig(chartIndex, "option", "series", [
															{ ...series1 },
															{ ...series2, label: { ...series2.label, fontSize: val } }
														]));
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
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											val &&
												(index === 0
													? updateChartConfig(chartIndex, "option", "series", [
															{ ...series1, label: { ...series1.label, color } },
															{ ...series2 }
														])
													: updateChartConfig(chartIndex, "option", "series", [
															{ ...series1 },
															{ ...series2, label: { ...series2.label, color } }
														]));
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
											const series1 = component.option.series[0];
											const series2 = component.option.series[1];
											val &&
												(index === 0
													? updateChartConfig(chartIndex, "option", "series", [
															{ ...series1, label: { ...series1.label, position: val } },
															{ ...series2 }
														])
													: updateChartConfig(chartIndex, "option", "series", [
															{ ...series1 },
															{ ...series2, label: { ...series2.label, position: val } }
														]));
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
};

export default LineCommonConfigComponent;
