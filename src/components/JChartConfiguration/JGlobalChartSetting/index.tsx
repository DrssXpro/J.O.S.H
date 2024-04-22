import { ColorPicker, Input, InputNumber, Select, Switch } from "antd";
import JCollapseBox from "../public/JCollapseBox";
import JSettingBox from "../public/JSettingBox";
import JSettingItem from "../public/JSettingItem";
import { axisConfig, legendConfig } from "@/materials/echartsConfig";
import JChartRendererSetting from "../JChartRendererSetting";
import { UpdateChartConfigType } from "@/store/chartStore/types";

interface IJGlobalChartSettingProps {
	chartIndex: number;
	chartRendererType?: any;
	chartOptions: any;
	update: UpdateChartConfigType;
}

const JGlobalChartSetting = (props: IJGlobalChartSettingProps) => {
	const { chartIndex, chartRendererType, chartOptions, update } = props;

	return (
		<>
			<JCollapseBox name="渲染器">
				<>
					<JSettingBox name="全局">
						<JChartRendererSetting
							value={chartRendererType!}
							onChange={(value) => {
								update(chartIndex, "rendererType", null, value);
							}}
						/>
					</JSettingBox>
					<JSettingBox name="当前">
						<JChartRendererSetting
							value={chartRendererType!}
							onChange={(value) => {
								update(chartIndex, "rendererType", null, value);
							}}
						/>
					</JSettingBox>
				</>
			</JCollapseBox>
			{chartOptions.grid && (
				<JCollapseBox name="容器">
					<JSettingBox name="距离">
						<div className="config-items-layout">
							<JSettingItem text="左侧距离">
								<Input
									value={chartOptions.grid.left}
									onChange={(e) => {
										update(chartIndex, "option", "grid", {
											...chartOptions.grid,
											left: e.target.value
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="右侧距离">
								<Input
									value={chartOptions.grid.right}
									onChange={(e) => {
										update(chartIndex, "option", "grid", {
											...chartOptions.grid,
											right: e.target.value
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="上侧距离">
								<Input
									value={chartOptions.grid.top}
									onChange={(e) => {
										update(chartIndex, "option", "grid", {
											...chartOptions.grid,
											top: e.target.value
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="下侧距离">
								<Input
									value={chartOptions.grid.bottom}
									onChange={(e) => {
										update(chartIndex, "option", "grid", {
											...chartOptions.grid,
											bottom: e.target.value
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</JCollapseBox>
			)}
			{chartOptions.xAxis && (
				<JCollapseBox
					name="X轴"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={chartOptions.xAxis.show}
							onChange={(val) => {
								update(chartIndex, "option", "xAxis", {
									...chartOptions.xAxis,
									show: val
								});
							}}
						/>
					}
				>
					<>
						<JSettingBox name="单位">
							<div className="config-items-layout">
								<JSettingItem text="名称">
									<Input
										placeholder="请输入"
										value={chartOptions.xAxis.name}
										onChange={(e) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												name: e.target.value
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.xAxis.nameTextStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												nameTextStyle: {
													...chartOptions.xAxis.nameTextStyle,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={12}
										value={chartOptions.xAxis.nameTextStyle.fontSize}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												nameTextStyle: {
													...chartOptions.xAxis.nameTextStyle,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={5}
										value={chartOptions.xAxis.nameGap}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												nameGap: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.xAxis.axisLabel.show}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLabel: {
													...chartOptions.xAxis.axisLabel,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.xAxis.axisLabel.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLabel: {
													...chartOptions.xAxis.axisLabel,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={8}
										value={chartOptions.xAxis.axisLabel.fontSize}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLabel: {
													...chartOptions.xAxis.axisLabel,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={-90}
										max={90}
										value={chartOptions.xAxis.axisLabel.rotate}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLabel: {
													...chartOptions.xAxis.axisLabel,
													rotate: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="轴线">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.xAxis.axisLine.show}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLine: {
													...chartOptions.xAxis.axisLine,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.xAxis.axisLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLine: {
													...chartOptions.xAxis.axisLine,
													lineStyle: {
														...chartOptions.xAxis.axisLine.lineStyle,
														color
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.xAxis.axisLine.lineStyle.width}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLine: {
													...chartOptions.xAxis.axisLine,
													lineStyle: {
														...chartOptions.xAxis.axisLine.lineStyle,
														width: val
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										className="w-full"
										options={axisConfig.xposition}
										value={chartOptions.xAxis.position}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												position: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="对齐零">
									<Switch
										value={chartOptions.xAxis.axisLine.onZero}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisLine: {
													...chartOptions.xAxis.axisLine,
													onZero: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反向">
									<Switch
										value={chartOptions.xAxis.inverse}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												inverse: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="刻度">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.xAxis.axisTick.show}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisTick: {
													...chartOptions.xAxis.axisTick,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="长度">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.xAxis.axisTick.length}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												axisTick: {
													...chartOptions.xAxis.axisTick,
													length: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="分割线">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.xAxis.splitLine.show}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												splitLine: {
													...chartOptions.xAxis.splitLine,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.xAxis.splitLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												splitLine: {
													...chartOptions.xAxis.splitLine,
													lineStyle: {
														...chartOptions.xAxis.splitLine.lineStyle,
														color
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.xAxis.splitLine.lineStyle.width}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												splitLine: {
													...chartOptions.xAxis.splitLine,
													lineStyle: {
														...chartOptions.xAxis.splitLine.lineStyle,
														width: val
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="类型">
									<Select
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										value={chartOptions.xAxis.splitLine.lineStyle.type}
										onChange={(val) => {
											update(chartIndex, "option", "xAxis", {
												...chartOptions.xAxis,
												splitLine: {
													...chartOptions.xAxis.splitLine,
													lineStyle: {
														...chartOptions.xAxis.splitLine.lineStyle,
														type: val
													}
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			)}

			{chartOptions.yAxis && (
				<JCollapseBox
					name="Y轴"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={chartOptions.yAxis.show}
							onChange={(val) => {
								update(chartIndex, "option", "yAxis", {
									...chartOptions.yAxis,
									show: val
								});
							}}
						/>
					}
				>
					<>
						<JSettingBox name="单位">
							<div className="config-items-layout">
								<JSettingItem text="名称">
									<Input
										placeholder="请输入"
										value={chartOptions.yAxis.name}
										onChange={(e) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												name: e.target.value
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.yAxis.nameTextStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												nameTextStyle: {
													...chartOptions.yAxis.nameTextStyle,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={8}
										value={chartOptions.yAxis.nameTextStyle.fontSize}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												nameTextStyle: {
													...chartOptions.yAxis.nameTextStyle,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={5}
										value={chartOptions.yAxis.nameGap}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												nameGap: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.yAxis.axisLabel.show}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLabel: {
													...chartOptions.yAxis.axisLabel,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.yAxis.axisLabel.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLabel: {
													...chartOptions.yAxis.axisLabel,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={8}
										value={chartOptions.yAxis.axisLabel.fontSize}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLabel: {
													...chartOptions.yAxis.axisLabel,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={-90}
										max={90}
										value={chartOptions.yAxis.axisLabel.rotate}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLabel: {
													...chartOptions.yAxis.axisLabel,
													rotate: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="轴线">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.yAxis.axisLine.show}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLine: {
													...chartOptions.yAxis.axisLine,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.yAxis.axisLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLine: {
													...chartOptions.yAxis.axisLine,
													lineStyle: {
														...chartOptions.yAxis.axisLine.lineStyle,
														color
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.yAxis.axisLine.lineStyle.width}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLine: {
													...chartOptions.yAxis.axisLine,
													lineStyle: {
														...chartOptions.yAxis.axisLine.lineStyle,
														width: val
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										className="w-full"
										options={axisConfig.yposition}
										value={chartOptions.yAxis.position}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												position: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="对齐零">
									<Switch
										value={chartOptions.yAxis.axisLine.onZero}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisLine: {
													...chartOptions.yAxis.axisLine,
													onZero: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反向">
									<Switch
										value={chartOptions.yAxis.inverse}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												inverse: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="刻度">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.yAxis.axisTick.show}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisTick: {
													...chartOptions.yAxis.axisTick,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="长度">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.yAxis.axisTick.length}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												axisTick: {
													...chartOptions.yAxis.axisTick,
													length: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="分割线">
							<div className="config-items-layout">
								<JSettingItem text="展示">
									<Switch
										value={chartOptions.yAxis.splitLine.show}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												splitLine: {
													...chartOptions.yAxis.splitLine,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.yAxis.splitLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												splitLine: {
													...chartOptions.yAxis.splitLine,
													lineStyle: {
														...chartOptions.yAxis.splitLine.lineStyle,
														color
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="粗细">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.yAxis.splitLine.lineStyle.width}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												splitLine: {
													...chartOptions.yAxis.splitLine,
													lineStyle: {
														...chartOptions.yAxis.splitLine.lineStyle,
														width: val
													}
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="类型">
									<Select
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										value={chartOptions.yAxis.splitLine.lineStyle.type}
										onChange={(val) => {
											update(chartIndex, "option", "yAxis", {
												...chartOptions.yAxis,
												splitLine: {
													...chartOptions.yAxis.splitLine,
													lineStyle: {
														...chartOptions.yAxis.splitLine.lineStyle,
														type: val
													}
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			)}
			{chartOptions.legend && (
				<JCollapseBox
					name="图例"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={chartOptions.legend.show}
							onChange={(val) => {
								update(chartIndex, "option", "legend", {
									...chartOptions.legend,
									show: val
								});
							}}
						/>
					}
				>
					<>
						<JSettingBox name="图例文字">
							<div className="config-items-layout">
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={chartOptions.legend.textStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												textStyle: {
													...chartOptions.legend.textStyle,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.legend.textStyle.fontSize}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												textStyle: {
													...chartOptions.legend.textStyle,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="图例位置">
							<div className="config-items-layout">
								<JSettingItem text="x轴">
									<Select
										className="w-full"
										options={legendConfig.lengendX}
										value={chartOptions.legend.x}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												x: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="y轴">
									<Select
										defaultValue="top"
										className="w-full"
										options={legendConfig.lengendY}
										value={chartOptions.legend.y}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												y: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="图例信息">
							<div className="config-items-layout">
								<JSettingItem text="方向">
									<Select
										className="w-full"
										options={legendConfig.orient}
										value={chartOptions.legend.orient}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												orient: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="形状">
									<Select
										className="w-full"
										options={legendConfig.shape}
										value={chartOptions.legend.icon}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												icon: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="图例大小">
							<div className="config-items-layout">
								<JSettingItem text="宽">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.legend.itemWidth}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												itemWidth: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="高">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={1}
										value={chartOptions.legend.itemHeight}
										onChange={(val) => {
											update(chartIndex, "option", "legend", {
												...chartOptions.legend,
												itemHeight: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
					</>
				</JCollapseBox>
			)}
			{chartOptions.visualMap && (
				<JCollapseBox
					name="视觉映射"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={chartOptions.visualMap.show}
							onChange={(val) => {
								update(chartIndex, "option", "visualMap", {
									...chartOptions.visualMap,
									show: val
								});
							}}
						/>
					}
				>
					<>
						<JSettingBox name="范围">
							<div className="config-items-layout">
								<JSettingItem text="最小值">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.visualMap.min}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												min: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="最大值">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.visualMap.max}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												max: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="颜色">
							<div className="config-items-layout">
								{chartOptions.visualMap.inRange.color.map((item: any, index: number) => (
									<JSettingItem text={`层级-${index + 1}`} key={index}>
										<ColorPicker
											className="w-full"
											showText
											value={item}
											onChange={(val) => {
												const color = val.toHexString();
												const colors = [...chartOptions.visualMap.inRange.color];
												colors[index] = color;
												update(chartIndex, "option", "visualMap", {
													...chartOptions.visualMap,
													inRange: {
														...chartOptions.visualMap.inRange,
														color: [...colors]
													}
												});
											}}
										/>
									</JSettingItem>
								))}
							</div>
						</JSettingBox>
						<JSettingBox name="控制块">
							<div className="config-items-layout">
								<JSettingItem text="放置方向">
									<Select
										className="w-full"
										options={axisConfig.visualMap.orient}
										value={chartOptions.visualMap.orient}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												orient: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="宽度">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.visualMap.itemWidth}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												itemWidth: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="高度">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.visualMap.itemHeight}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												itemHeight: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反转">
									<Switch
										value={chartOptions.visualMap.inverse}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												inverse: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="拖拽组件实时更新">
									<Switch
										value={chartOptions.visualMap.realtime}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												realtime: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="位置">
							<div className="config-items-layout">
								<JSettingItem text={`偏移 X：${chartOptions.visualMap.left || 0}px`}>
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.visualMap.left}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												left: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text={`偏移 Y：${chartOptions.visualMap.top || 0}px`}>
									<InputNumber
										className="w-full"
										placeholder="请输入"
										value={chartOptions.visualMap.top}
										onChange={(val) => {
											update(chartIndex, "option", "visualMap", {
												...chartOptions.visualMap,
												top: val
											});
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
