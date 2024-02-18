import { useEffect, useState } from "react";
import { produce } from "immer";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Switch } from "antd";
import { axisConfig } from "@/materials/echartsConfig";
import { barSeriesItem, lineSeriesItem } from "../config";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";

const optionsConfig = [barSeriesItem, lineSeriesItem];

const BarLineConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const [barConfig, setBarConfig] = useState(barSeriesItem);
	const [lineConfig, setLineConfig] = useState(lineSeriesItem);

	useEffect(() => {
		updateChartConfig(chartIndex, "series", [{ ...barConfig }, { ...lineConfig }]);
	}, [barConfig, lineConfig]);

	return (
		<>
			<JGlobalChartSetting chartIndex={chartIndex} />
			{optionsConfig.map((i: any, index: number) => (
				<JCollapseBox name={i.type === "bar" ? "柱状图" : "折线图"} key={index} unfold>
					<>
						{i.type === "bar" && (
							<JSettingBox name="图形">
								<div className="grid grid-cols-2 gap-2">
									<JSettingItem text="宽度">
										<InputNumber
											className="w-full"
											defaultValue={i.barWidth}
											onChange={(val) => {
												setBarConfig(
													produce((draft) => {
														draft.barWidth = val;
													})
												);
											}}
										/>
									</JSettingItem>
									<JSettingItem text="圆角">
										<InputNumber
											className="w-full"
											defaultValue={i.itemStyle.borderRadius}
											onChange={(val) => {
												setBarConfig(
													produce((draft) => {
														draft.itemStyle.borderRadius = val;
													})
												);
											}}
										/>
									</JSettingItem>
								</div>
							</JSettingBox>
						)}
						{i.type !== "bar" && (
							<>
								<JSettingBox name="线条">
									<div className="grid grid-cols-2 gap-2">
										<JSettingItem text="宽度">
											<InputNumber
												className="w-full"
												defaultValue={i.lineStyle.width}
												onChange={(val) => {
													setLineConfig(
														produce((draft) => {
															draft.lineStyle.width = val;
														})
													);
												}}
											/>
										</JSettingItem>
										<JSettingItem text="类型">
											<Select
												defaultValue={i.lineStyle.type}
												className="w-full"
												options={axisConfig.splitLint.lineStyle}
												onChange={(val) => {
													setLineConfig(
														produce((draft) => {
															draft.lineStyle.type = val;
														})
													);
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
												defaultValue={i.symbolSize}
												onChange={(val) => {
													setLineConfig(
														produce((draft) => {
															draft.symbolSize = val;
														})
													);
												}}
											/>
										</JSettingItem>
									</div>
								</JSettingBox>
							</>
						)}
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										defaultValue={i.label.show}
										onChange={(val) => {
											i.type === "bar"
												? setBarConfig(
														produce((draft) => {
															draft.label.show = val;
														})
													)
												: setLineConfig(
														produce((draft) => {
															draft.label.show = val;
														})
													);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										defaultValue={i.label.fontSize}
										onChange={(val) => {
											val &&
												(i.type === "bar"
													? setBarConfig(
															produce((draft) => {
																draft.label.fontSize = val;
															})
														)
													: setLineConfig(
															produce((draft) => {
																draft.label.fontSize = val;
															})
														));
										}}
									/>
								</JSettingItem>
								<JSettingItem text="tip颜色">
									<ColorPicker
										className="w-full"
										showText
										defaultValue={i.label.color}
										onChange={(val) => {
											const color = val.toHexString();
											i.type === "bar"
												? setBarConfig(
														produce((draft) => {
															draft.label.color = color;
														})
													)
												: setLineConfig(
														produce((draft) => {
															draft.label.color = color;
														})
													);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										defaultValue={i.label.position}
										className="w-full"
										options={[
											{ label: "top", value: "top" },
											{ label: "left", value: "left" },
											{ label: "right", value: "right" },
											{ label: "bottom", value: "bottom" }
										]}
										onChange={(val) => {
											i.type === "bar"
												? setBarConfig(
														produce((draft) => {
															draft.label.position = val;
														})
													)
												: setLineConfig(
														produce((draft) => {
															draft.label.position = val;
														})
													);
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

export default BarLineConfigComponent;
