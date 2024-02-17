import { ColorPicker, Input, InputNumber, Select, Switch } from "antd";
import JCollapseBox from "../public/JCollapseBox";
import JSettingBox from "../public/JSettingBox";
import JSettingItem from "../public/JSettingItem";
import { axisConfig, legendConfig } from "@/materials/echartsConfig";
import useEditCharts from "@/hooks/useEditCharts";
import { useEffect, useState } from "react";
import { produce } from "immer";
import useChartStore from "@/store/chartStore/chartStore";

const JGlobalChartSetting = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetData } = useEditCharts();
	const component = getTargetData();
	const [globalConfig, setGlobalGonfig] = useState({
		options: component!.option,
		updateKey: ""
	});

	useEffect(() => {
		updateChartConfig(0, globalConfig.updateKey, globalConfig["options"][globalConfig.updateKey]);
	}, [globalConfig]);
	return (
		<>
			{globalConfig.options.grid && (
				<JCollapseBox name="容器">
					<JSettingBox name="距离">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="左侧距离">
								<Input
									value={globalConfig.options.grid.left}
									onChange={(e) => {
										setGlobalGonfig(
											produce((draft: any) => {
												draft.options.grid.left = e.target.value;
												draft.updateKey = "grid";
											})
										);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="右侧距离">
								<Input
									value={globalConfig.options.grid.right}
									onChange={(e) => {
										setGlobalGonfig(
											produce((draft: any) => {
												draft.options.grid.right = e.target.value;
												draft.updateKey = "grid";
											})
										);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="上侧距离">
								<Input
									value={globalConfig.options.grid.top}
									onChange={(e) => {
										setGlobalGonfig(
											produce((draft: any) => {
												draft.options.grid.top = e.target.value;
												draft.updateKey = "grid";
											})
										);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="下侧距离">
								<Input
									value={globalConfig.options.grid.bottom}
									onChange={(e) => {
										setGlobalGonfig(
											produce((draft: any) => {
												draft.options.grid.bottom = e.target.value;
												draft.updateKey = "grid";
											})
										);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</JCollapseBox>
			)}
			{globalConfig.options.xAxis && (
				<JCollapseBox
					name="X轴"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={globalConfig.options.xAxis.show}
							onChange={(val) => {
								setGlobalGonfig(
									produce((draft: any) => {
										draft.options.xAxis.show = val;
										draft.updateKey = "xAxis";
									})
								);
							}}
						/>
					}
				>
					<>
						<JSettingBox name="单位">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="名称">
									<Input
										placeholder="请输入"
										value={globalConfig.options.xAxis.name}
										onChange={(e) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.name = e.target.value;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.xAxis.nameTextStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.nameTextStyle.color = color;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={12}
										value={globalConfig.options.xAxis.nameTextStyle.fontSize}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.nameTextStyle.fontSize = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={5}
										value={globalConfig.options.xAxis.nameGap}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.nameGap = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.xAxis.axisLabel.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLabel.show = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.xAxis.axisLabel.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLabel.color = color;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={8}
										value={globalConfig.options.xAxis.axisLabel.fontSize}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLabel.fontSize = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={-90}
										max={90}
										value={globalConfig.options.xAxis.axisLabel.rotate}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLabel.rotate = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="轴线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.xAxis.axisLine.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLine.show = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.xAxis.axisLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLine.lineStyle.color = color;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.xAxis.axisLine.lineStyle.width}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLine.lineStyle.width = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										className="w-full"
										options={axisConfig.xposition}
										value={globalConfig.options.xAxis.position}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.position = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="对齐零">
									<Switch
										value={globalConfig.options.xAxis.axisLine.onZero}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisLine.onZero = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反向">
									<Switch
										value={globalConfig.options.xAxis.inverse}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.inverse = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="刻度">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.xAxis.axisTick.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisTick.show = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="长度">
									<InputNumber
										className="w-full"
										value={globalConfig.options.xAxis.axisTick.length}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.axisTick.length = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="分割线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.xAxis.splitLine.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.splitLine.show = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.xAxis.splitLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.splitLine.lineStyle.color = color;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.xAxis.splitLine.lineStyle.width}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.splitLine.lineStyle.width = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="类型">
									<Select
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										value={globalConfig.options.xAxis.splitLine.lineStyle.type}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.xAxis.splitLine.lineStyle.type = val;
													draft.updateKey = "xAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			)}

			{globalConfig.options.yAxis && (
				<JCollapseBox
					name="Y轴"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={globalConfig.options.yAxis.show}
							onChange={(val) => {
								setGlobalGonfig(
									produce((draft: any) => {
										draft.options.yAxis.show = val;
										draft.updateKey = "yAxis";
									})
								);
							}}
						/>
					}
				>
					<>
						<JSettingBox name="单位">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="名称">
									<Input
										placeholder="请输入"
										value={globalConfig.options.yAxis.name}
										onChange={(e) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.name = e.target.value;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.yAxis.nameTextStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.nameTextStyle.color = color;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={8}
										value={globalConfig.options.yAxis.nameTextStyle.fontSize}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.nameTextStyle.fontSize = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={5}
										value={globalConfig.options.yAxis.nameGap}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.nameGap = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.yAxis.axisLabel.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLabel.show = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.yAxis.axisLabel.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLabel.color = color;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={8}
										value={globalConfig.options.yAxis.axisLabel.fontSize}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLabel.fontSize = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={-90}
										max={90}
										value={globalConfig.options.yAxis.axisLabel.rotate}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLabel.rotate = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="轴线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.yAxis.axisLine.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLine.show = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.yAxis.axisLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLine.lineStyle.color = color;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.yAxis.axisLine.lineStyle.width}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLine.lineStyle.width = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										className="w-full"
										options={axisConfig.yposition}
										value={globalConfig.options.yAxis.position}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.position = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="对齐零">
									<Switch
										value={globalConfig.options.yAxis.axisLine.onZero}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisLine.onZero = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反向">
									<Switch
										value={globalConfig.options.yAxis.inverse}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.inverse = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="刻度">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.yAxis.axisTick.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisTick.show = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="长度">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.yAxis.axisTick.length}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.axisTick.length = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="分割线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={globalConfig.options.yAxis.splitLine.show}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.splitLine.show = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.yAxis.splitLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.splitLine.lineStyle.color = color;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.yAxis.splitLine.lineStyle.width}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.splitLine.lineStyle.width = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="类型">
									<Select
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										value={globalConfig.options.yAxis.splitLine.lineStyle.type}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.yAxis.splitLine.lineStyle.type = val;
													draft.updateKey = "yAxis";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			)}
			{globalConfig.options.legend && (
				<JCollapseBox
					name="图例"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={globalConfig.options.legend.show}
							onChange={(val) => {
								setGlobalGonfig(
									produce((draft: any) => {
										draft.options.legend.show = val;
										draft.updateKey = "legend";
									})
								);
							}}
						/>
					}
				>
					<>
						<JSettingBox name="图例文字">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={globalConfig.options.legend.textStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.textStyle.color = color;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.legend.textStyle.fontSize}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.textStyle.fontSize = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="图例位置">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="x轴">
									<Select
										className="w-full"
										options={legendConfig.lengendX}
										value={globalConfig.options.legend.x}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.x = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="y轴">
									<Select
										defaultValue="top"
										className="w-full"
										options={legendConfig.lengendY}
										value={globalConfig.options.legend.y}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.y = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="图例信息">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="方向">
									<Select
										className="w-full"
										options={legendConfig.orient}
										value={globalConfig.options.legend.orient}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.orient = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="形状">
									<Select
										className="w-full"
										options={legendConfig.shape}
										value={globalConfig.options.legend.icon}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.icon = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="图例大小">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="宽">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.legend.itemWidth}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.itemWidth = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="高">
									<InputNumber
										className="w-full"
										min={1}
										value={globalConfig.options.legend.itemHeight}
										onChange={(val) => {
											setGlobalGonfig(
												produce((draft: any) => {
													draft.options.legend.itemHeight = val;
													draft.updateKey = "legend";
												})
											);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			)}
		</>
	);
};

export default JGlobalChartSetting;
