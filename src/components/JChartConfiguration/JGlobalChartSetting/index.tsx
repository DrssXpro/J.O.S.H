import { ColorPicker, Input, InputNumber, Select, Switch } from "antd";
import JCollapseBox from "../public/JCollapseBox";
import JSettingBox from "../public/JSettingBox";
import JSettingItem from "../public/JSettingItem";
import { axisConfig, legendConfig } from "@/materials/echartsConfig";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import JChartRendererSetting from "../JChartRendererSetting";

interface IJGlobalChartSettingProps {
	chartIndex: number;
}

const JGlobalChartSetting = (props: IJGlobalChartSettingProps) => {
	const { chartIndex } = props;
	const { updateChartConfig } = useChartStore();
	const { getTargetData } = useEditCharts();
	const component = getTargetData()!;

	return (
		<>
			<JCollapseBox name="渲染器">
				<>
					<JSettingBox name="全局">
						<JChartRendererSetting
							value={component.rendererType!}
							onChange={(value) => {
								updateChartConfig(chartIndex, "rendererType", null, value);
							}}
						/>
					</JSettingBox>
					<JSettingBox name="当前">
						<JChartRendererSetting
							value={component.rendererType!}
							onChange={(value) => {
								updateChartConfig(chartIndex, "rendererType", null, value);
							}}
						/>
					</JSettingBox>
				</>
			</JCollapseBox>
			{component.option.grid && (
				<JCollapseBox name="容器">
					<JSettingBox name="距离">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="左侧距离">
								<Input
									value={component.option.grid.left}
									onChange={(e) => {
										updateChartConfig(chartIndex, "option", "grid", {
											...component.option.grid,
											left: e.target.value
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="右侧距离">
								<Input
									value={component.option.grid.right}
									onChange={(e) => {
										updateChartConfig(chartIndex, "option", "grid", {
											...component.option.grid,
											right: e.target.value
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="上侧距离">
								<Input
									value={component.option.grid.top}
									onChange={(e) => {
										updateChartConfig(chartIndex, "option", "grid", {
											...component.option.grid,
											top: e.target.value
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="下侧距离">
								<Input
									value={component.option.grid.bottom}
									onChange={(e) => {
										updateChartConfig(chartIndex, "option", "grid", {
											...component.option.grid,
											bottom: e.target.value
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</JCollapseBox>
			)}
			{component.option.xAxis && (
				<JCollapseBox
					name="X轴"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={component.option.xAxis.show}
							onChange={(val) => {
								updateChartConfig(chartIndex, "option", "xAxis", {
									...component.option.xAxis,
									show: val
								});
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
										value={component.option.xAxis.name}
										onChange={(e) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												name: e.target.value
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={component.option.xAxis.nameTextStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												nameTextStyle: {
													...component.option.xAxis.nameTextStyle,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={12}
										value={component.option.xAxis.nameTextStyle.fontSize}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												nameTextStyle: {
													...component.option.xAxis.nameTextStyle,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={5}
										value={component.option.xAxis.nameGap}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												nameGap: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.xAxis.axisLabel.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLabel: {
													...component.option.xAxis.axisLabel,
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
										value={component.option.xAxis.axisLabel.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLabel: {
													...component.option.xAxis.axisLabel,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={8}
										value={component.option.xAxis.axisLabel.fontSize}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLabel: {
													...component.option.xAxis.axisLabel,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={-90}
										max={90}
										value={component.option.xAxis.axisLabel.rotate}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLabel: {
													...component.option.xAxis.axisLabel,
													rotate: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="轴线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.xAxis.axisLine.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLine: {
													...component.option.xAxis.axisLine,
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
										value={component.option.xAxis.axisLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLine: {
													...component.option.xAxis.axisLine,
													lineStyle: {
														...component.option.xAxis.axisLine.lineStyle,
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
										min={1}
										value={component.option.xAxis.axisLine.lineStyle.width}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLine: {
													...component.option.xAxis.axisLine,
													lineStyle: {
														...component.option.xAxis.axisLine.lineStyle,
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
										value={component.option.xAxis.position}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												position: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="对齐零">
									<Switch
										value={component.option.xAxis.axisLine.onZero}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisLine: {
													...component.option.xAxis.axisLine,
													onZero: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反向">
									<Switch
										value={component.option.xAxis.inverse}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												inverse: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="刻度">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.xAxis.axisTick.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisTick: {
													...component.option.xAxis.axisTick,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="长度">
									<InputNumber
										className="w-full"
										value={component.option.xAxis.axisTick.length}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												axisTick: {
													...component.option.xAxis.axisTick,
													length: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="分割线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.xAxis.splitLine.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												splitLine: {
													...component.option.xAxis.splitLine,
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
										value={component.option.xAxis.splitLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												splitLine: {
													...component.option.xAxis.splitLine,
													lineStyle: {
														...component.option.xAxis.splitLine.lineStyle,
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
										min={1}
										value={component.option.xAxis.splitLine.lineStyle.width}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												splitLine: {
													...component.option.xAxis.splitLine,
													lineStyle: {
														...component.option.xAxis.splitLine.lineStyle,
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
										value={component.option.xAxis.splitLine.lineStyle.type}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "xAxis", {
												...component.option.xAxis,
												splitLine: {
													...component.option.xAxis.splitLine,
													lineStyle: {
														...component.option.xAxis.splitLine.lineStyle,
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

			{component.option.yAxis && (
				<JCollapseBox
					name="Y轴"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={component.option.yAxis.show}
							onChange={(val) => {
								updateChartConfig(chartIndex, "option", "yAxis", {
									...component.option.yAxis,
									show: val
								});
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
										value={component.option.yAxis.name}
										onChange={(e) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												name: e.target.value
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="颜色">
									<ColorPicker
										className="w-full"
										showText
										value={component.option.yAxis.nameTextStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												nameTextStyle: {
													...component.option.yAxis.nameTextStyle,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={8}
										value={component.option.yAxis.nameTextStyle.fontSize}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												nameTextStyle: {
													...component.option.yAxis.nameTextStyle,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={5}
										value={component.option.yAxis.nameGap}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												nameGap: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.yAxis.axisLabel.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLabel: {
													...component.option.yAxis.axisLabel,
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
										value={component.option.yAxis.axisLabel.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLabel: {
													...component.option.yAxis.axisLabel,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={8}
										value={component.option.yAxis.axisLabel.fontSize}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLabel: {
													...component.option.yAxis.axisLabel,
													fontSize: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="偏移量">
									<InputNumber
										className="w-full"
										min={-90}
										max={90}
										value={component.option.yAxis.axisLabel.rotate}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLabel: {
													...component.option.yAxis.axisLabel,
													rotate: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="轴线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.yAxis.axisLine.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLine: {
													...component.option.yAxis.axisLine,
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
										value={component.option.yAxis.axisLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLine: {
													...component.option.yAxis.axisLine,
													lineStyle: {
														...component.option.yAxis.axisLine.lineStyle,
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
										min={1}
										value={component.option.yAxis.axisLine.lineStyle.width}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLine: {
													...component.option.yAxis.axisLine,
													lineStyle: {
														...component.option.yAxis.axisLine.lineStyle,
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
										value={component.option.yAxis.position}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												position: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="对齐零">
									<Switch
										value={component.option.yAxis.axisLine.onZero}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisLine: {
													...component.option.yAxis.axisLine,
													onZero: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="反向">
									<Switch
										value={component.option.yAxis.inverse}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												inverse: val
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="刻度">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.yAxis.axisTick.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisTick: {
													...component.option.yAxis.axisTick,
													show: val
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="长度">
									<InputNumber
										className="w-full"
										min={1}
										value={component.option.yAxis.axisTick.length}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												axisTick: {
													...component.option.yAxis.axisTick,
													length: val
												}
											});
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="分割线">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={component.option.yAxis.splitLine.show}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												splitLine: {
													...component.option.yAxis.splitLine,
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
										value={component.option.yAxis.splitLine.lineStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												splitLine: {
													...component.option.yAxis.splitLine,
													lineStyle: {
														...component.option.yAxis.splitLine.lineStyle,
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
										min={1}
										value={component.option.yAxis.splitLine.lineStyle.width}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												splitLine: {
													...component.option.yAxis.splitLine,
													lineStyle: {
														...component.option.yAxis.splitLine.lineStyle,
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
										value={component.option.yAxis.splitLine.lineStyle.type}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "yAxis", {
												...component.option.yAxis,
												splitLine: {
													...component.option.yAxis.splitLine,
													lineStyle: {
														...component.option.yAxis.splitLine.lineStyle,
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
			{component.option.legend && (
				<JCollapseBox
					name="图例"
					operator={
						<Switch
							checkedChildren="启用"
							unCheckedChildren="关闭"
							value={component.option.legend.show}
							onChange={(val) => {
								updateChartConfig(chartIndex, "option", "legend", {
									...component.option.legend,
									show: val
								});
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
										value={component.option.legend.textStyle.color}
										onChange={(val) => {
											const color = val.toHexString();
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
												textStyle: {
													...component.option.legend.textStyle,
													color
												}
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										min={1}
										value={component.option.legend.textStyle.fontSize}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
												textStyle: {
													...component.option.legend.textStyle,
													fontSize: val
												}
											});
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
										value={component.option.legend.x}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
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
										value={component.option.legend.y}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
												y: val
											});
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
										value={component.option.legend.orient}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
												orient: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="形状">
									<Select
										className="w-full"
										options={legendConfig.shape}
										value={component.option.legend.icon}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
												icon: val
											});
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
										value={component.option.legend.itemWidth}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
												itemWidth: val
											});
										}}
									/>
								</JSettingItem>
								<JSettingItem text="高">
									<InputNumber
										className="w-full"
										min={1}
										value={component.option.legend.itemHeight}
										onChange={(val) => {
											updateChartConfig(chartIndex, "option", "legend", {
												...component.option.legend,
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
		</>
	);
};

export default JGlobalChartSetting;
