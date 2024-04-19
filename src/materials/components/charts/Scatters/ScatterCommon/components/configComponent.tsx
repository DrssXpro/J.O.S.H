import { memo } from "react";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { InputNumber, Select } from "antd";
import { ScatterEffectTypeEnumList, SymbolEnumList } from "../../shared";
import { axisConfig } from "@/materials/echartsConfig";
import { ChartConfigComponentProps } from "@/materials/types";

const ScatterCommonConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JGlobalChartSetting {...props} />
			{chartOptions.series.map((item: any, index: number) => (
				<JCollapseBox key={index} name={`散点-${index + 1}`} unfold>
					<>
						<JSettingBox name="样式">
							<div className="config-layout">
								<JSettingItem text="类型">
									<Select
										className="w-full"
										options={ScatterEffectTypeEnumList}
										value={item.type}
										onChange={(val) => {
											const series = chartOptions.series;
											index === 0
												? update(chartIndex, "option", "series", [
														{ ...series[0], type: val },
														series[1]
													])
												: update(chartIndex, "option", "series", [
														series[0],
														{ ...series[1], type: val }
													]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={1}
										value={item.symbolSize}
										onChange={(val) => {
											const series = chartOptions.series;
											index === 0
												? update(chartIndex, "option", "series", [
														{ ...series[0], symbolSize: val },
														series[1]
													])
												: update(chartIndex, "option", "series", [
														series[0],
														{ ...series[1], symbolSize: val }
													]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标域">
							<div className="config-layout">
								<JSettingItem text="粗细(0不显示)">
									<InputNumber
										className="w-full"
										min={0}
										value={item.markArea.itemStyle.borderWidth}
										onChange={(val) => {
											const series = chartOptions.series;
											index === 0
												? update(chartIndex, "option", "series", [
														{
															...series[0],
															markArea: {
																...series[0].markArea,
																itemStyle: {
																	...series[0].markArea.itemStyle,
																	borderWidth: val
																}
															}
														},
														series[1]
													])
												: update(chartIndex, "option", "series", [
														series[0],
														{
															...series[1],
															markArea: {
																...series[1].markArea,
																itemStyle: {
																	...series[1].markArea.itemStyle,
																	borderWidth: val
																}
															}
														}
													]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="符号">
									<Select
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										value={item.markArea.itemStyle.borderType}
										onChange={(val) => {
											const series = chartOptions.series;
											index === 0
												? update(chartIndex, "option", "series", [
														{
															...series[0],
															markArea: {
																...series[0].markArea,
																itemStyle: {
																	...series[0].markArea.itemStyle,
																	borderType: val
																}
															}
														},
														series[1]
													])
												: update(chartIndex, "option", "series", [
														series[0],
														{
															...series[1],
															markArea: {
																...series[1].markArea,
																itemStyle: {
																	...series[1].markArea.itemStyle,
																	borderType: val
																}
															}
														}
													]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标点">
							<div className="config-layout">
								<JSettingItem text="形状">
									<Select
										className="w-full"
										options={SymbolEnumList}
										value={item.markPoint.symbol}
										onChange={(val) => {
											const series = chartOptions.series;
											index === 0
												? update(chartIndex, "option", "series", [
														{
															...series[0],
															markPoint: {
																...series[0].markPoint,
																symbol: val
															}
														},
														series[1]
													])
												: update(chartIndex, "option", "series", [
														series[0],
														{
															...series[1],
															markPoint: {
																...series[1].markPoint,
																symbol: val
															}
														}
													]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={0}
										value={item.markPoint.symbolSize}
										onChange={(val) => {
											const series = chartOptions.series;
											index === 0
												? update(chartIndex, "option", "series", [
														{
															...series[0],
															markPoint: {
																...series[0].markPoint,
																symbolSize: val
															}
														},
														series[1]
													])
												: update(chartIndex, "option", "series", [
														series[0],
														{
															...series[1],
															markPoint: {
																...series[1].markPoint,
																symbolSize: val
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
			))}
		</>
	);
});

export default ScatterCommonConfigComponent;
