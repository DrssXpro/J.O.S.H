import { useEffect, useState } from "react";
import { produce } from "immer";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Switch } from "antd";
import { axisConfig } from "@/materials/echartsConfig";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";

const BarLineConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	const [globalConfig, setGlobalConfig] = useState({
		series: [component!.option.series[0], component!.option.series[1]],
		updateKey: ""
	});

	useEffect(() => {
		globalConfig.updateKey && updateChartConfig(chartIndex, "option", "series", globalConfig.series);
	}, [globalConfig]);

	useEffect(() => {
		component &&
			setGlobalConfig({
				series: component.option.series,
				updateKey: ""
			});
	}, [chartIndex]);

	return (
		<>
			<JGlobalChartSetting chartIndex={chartIndex} />
			{globalConfig.series.map((i: any, index: number) => (
				<JCollapseBox name={i.type === "bar" ? "柱状图" : "折线图"} key={index} unfold>
					<>
						{i.type === "bar" && (
							<JSettingBox name="图形">
								<div className="grid grid-cols-2 gap-2">
									<JSettingItem text="宽度">
										<InputNumber
											className="w-full"
											value={i.barWidth}
											onChange={(val) => {
												setGlobalConfig(
													produce((draft) => {
														draft.series[0].barWidth = val;
														draft.updateKey = "bar";
													})
												);
											}}
										/>
									</JSettingItem>
									<JSettingItem text="圆角">
										<InputNumber
											className="w-full"
											value={i.itemStyle.borderRadius}
											onChange={(val) => {
												setGlobalConfig(
													produce((draft) => {
														draft.series[0].itemStyle.borderRadius = val;
														draft.updateKey = "bar";
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
												value={i.lineStyle.width}
												onChange={(val) => {
													setGlobalConfig(
														produce((draft) => {
															draft.series[1].lineStyle.width = val;
															draft.updateKey = "line";
														})
													);
												}}
											/>
										</JSettingItem>
										<JSettingItem text="类型">
											<Select
												value={i.lineStyle.type}
												className="w-full"
												options={axisConfig.splitLint.lineStyle}
												onChange={(val) => {
													setGlobalConfig(
														produce((draft) => {
															draft.series[1].lineStyle.type = val;
															draft.updateKey = "line";
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
												value={i.symbolSize}
												onChange={(val) => {
													setGlobalConfig(
														produce((draft) => {
															draft.series[1].symbolSize = val;
															draft.updateKey = "line";
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
										value={i.label.show}
										onChange={(val) => {
											i.type === "bar"
												? setGlobalConfig(
														produce((draft) => {
															draft.series[0].label.show = val;
															draft.updateKey = "bar";
														})
													)
												: setGlobalConfig(
														produce((draft) => {
															draft.series[1].label.show = val;
															draft.updateKey = "line";
														})
													);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										value={i.label.fontSize}
										onChange={(val) => {
											val &&
												(i.type === "bar"
													? setGlobalConfig(
															produce((draft) => {
																draft.series[0].label.fontSize = val;
																draft.updateKey = "bar";
															})
														)
													: setGlobalConfig(
															produce((draft) => {
																draft.series[1].label.fontSize = val;
																draft.updateKey = "line";
															})
														));
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
											i.type === "bar"
												? setGlobalConfig(
														produce((draft) => {
															draft.series[0].label.color = color;
															draft.updateKey = "bar";
														})
													)
												: setGlobalConfig(
														produce((draft) => {
															draft.series[1].label.color = color;
															draft.updateKey = "line";
														})
													);
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
											i.type === "bar"
												? setGlobalConfig(
														produce((draft) => {
															draft.series[0].label.position = val;
															draft.updateKey = "bar";
														})
													)
												: setGlobalConfig(
														produce((draft) => {
															draft.series[1].label.position = val;
															draft.updateKey = "line";
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
