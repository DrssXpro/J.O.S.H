import { memo, useMemo } from "react";
import { ColorPicker, InputNumber, Select, Switch, Tooltip } from "antd";
import { ChartConfigComponentProps } from "@/materials/types";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import mapChinaJson from "../mapGeojson/china.json";

const MapBaseConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	const mapRegionOptions = useMemo(() => {
		const options = [
			{
				adcode: "china",
				name: "中国"
			}
		];
		mapChinaJson.features.forEach((element: any) => {
			if (element.properties.name) {
				options.push({ ...element.properties });
			}
		});
		return options.map((i) => ({ label: i.name, value: i.adcode }));
	}, []);

	const rippleEffectOptions = useMemo(
		() => [
			{
				value: "fill",
				label: "实心"
			},
			{
				value: "stroke",
				label: "空心"
			}
		],
		[]
	);

	return (
		<>
			<JGlobalChartSetting {...props} />
			<JCollapseBox name="地图" unfold>
				<>
					<JSettingBox name="地图区域">
						<JSettingItem text="默认中国">
							<Select
								className="w-32"
								options={mapRegionOptions}
								value={chartOptions.mapRegion.adcode}
								onChange={(val) => {
									update(chartIndex, "option", "mapRegion", {
										...chartOptions.mapRegion,
										adcode: val
									});
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="区域颜色">
						<div className="config-items-layout">
							<JSettingItem text="0%处颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].itemStyle.areaColor.colorStops[0].color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: {
													...chartOptions.series[1].itemStyle,
													areaColor: {
														...chartOptions.series[1].itemStyle.areaColor,
														colorStops: [
															{
																...chartOptions.series[1].itemStyle.areaColor
																	.colorStops[0],
																color
															},
															chartOptions.series[1].itemStyle.areaColor.colorStops[1]
														]
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="100%处颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].itemStyle.areaColor.colorStops[1].color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: {
													...chartOptions.series[1].itemStyle,
													areaColor: {
														...chartOptions.series[1].itemStyle.areaColor,
														colorStops: [
															chartOptions.series[1].itemStyle.areaColor.colorStops[0],
															{
																...chartOptions.series[1].itemStyle.areaColor
																	.colorStops[1],
																color
															}
														]
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="阴影">
						<div className="config-items-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].itemStyle.shadowColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: { ...chartOptions.series[1].itemStyle, shadowColor: color }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="模糊程度">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.series[1].itemStyle.shadowBlur}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: { ...chartOptions.series[1].itemStyle, shadowBlur: val }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="水平偏移">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									value={chartOptions.series[1].itemStyle.shadowOffsetX}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: { ...chartOptions.series[1].itemStyle, shadowOffsetX: val }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="垂直偏移">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									value={chartOptions.series[1].itemStyle.shadowOffsetY}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: { ...chartOptions.series[1].itemStyle, shadowOffsetY: val }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="地理信息名称">
						<div className="config-items-layout">
							<JSettingItem text="显示">
								<Switch
									value={chartOptions.series[1].label.show}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												label: { ...chartOptions.series[1].label, show: val }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].label.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												label: { ...chartOptions.series[1].label, color }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={1}
									value={chartOptions.series[1].label.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												label: { ...chartOptions.series[1].label, fontSize: val }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="悬浮显示">
						<div className="config-items-layout">
							<JSettingItem text="禁用">
								<Switch
									value={chartOptions.series[1].emphasis.disabled}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												emphasis: { ...chartOptions.series[1].emphasis, disabled: val }
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].emphasis.itemStyle.areaColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												emphasis: {
													...chartOptions.series[1].emphasis,
													itemStyle: {
														...chartOptions.series[1].emphasis.itemStyle,
														areaColor: color
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={1}
									value={chartOptions.series[1].emphasis.label.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												emphasis: {
													...chartOptions.series[1].emphasis,
													label: {
														...chartOptions.series[1].emphasis.label,
														fontSize: val
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="阴影">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].emphasis.itemStyle.shadowColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												emphasis: {
													...chartOptions.series[1].emphasis,
													itemStyle: {
														...chartOptions.series[1].emphasis.itemStyle,
														shadowColor: color
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="边框大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={1}
									value={chartOptions.series[1].emphasis.itemStyle.borderWidth}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												emphasis: {
													...chartOptions.series[1].emphasis,
													itemStyle: {
														...chartOptions.series[1].emphasis.itemStyle,
														borderWidth: val
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="文字颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].emphasis.label.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												emphasis: {
													...chartOptions.series[1].emphasis,
													label: {
														...chartOptions.series[1].emphasis.label,
														color
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="悬浮弹窗">
						<div className="config-items-layout">
							<JSettingItem text="显示">
								<Switch
									value={chartOptions.series[1].tooltip.show}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												tooltip: {
													...chartOptions.series[1].emphasis,
													show: val
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									value={chartOptions.series[1].tooltip.textStyle.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												tooltip: {
													...chartOptions.series[1].tooltip,
													textStyle: {
														...chartOptions.series[1].tooltip.textStyle,
														fontSize: val
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].tooltip.textStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												tooltip: {
													...chartOptions.series[1].tooltip,
													textStyle: {
														...chartOptions.series[1].tooltip.textStyle,
														color
													}
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="背景颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].tooltip.backgroundColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												tooltip: {
													...chartOptions.series[1].tooltip,
													backgroundColor: color
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="区域边框">
						<div className="config-items-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[1].itemStyle.borderColor}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: {
													...chartOptions.series[1].itemStyle,
													borderColor: color
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="宽度大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									value={chartOptions.series[1].itemStyle.borderWidth}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											{
												...chartOptions.series[1],
												itemStyle: {
													...chartOptions.series[1].itemStyle,
													borderWidth: val
												}
											},
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					{chartOptions.mapRegion.adcode === "china" && (
						<JSettingBox name="其他">
							<div className="config-items-layout">
								<JSettingItem text="显示南海群岛">
									<Switch
										value={chartOptions.mapRegion.showHainanIsLands}
										onChange={(val) => {
											update(chartIndex, "option", "mapRegion", {
												...chartOptions.mapRegion,
												showHainanIsLands: val
											});
										}}
									/>
								</JSettingItem>
								{chartOptions.series[2] && (
									<JSettingItem text="点击进入下级">
										<Switch
											value={chartOptions.mapRegion.enter}
											onChange={(val) => {
												update(chartIndex, "option", "mapRegion", {
													...chartOptions.mapRegion,
													enter: val
												});
											}}
										/>
									</JSettingItem>
								)}
							</div>
						</JSettingBox>
					)}
				</>
			</JCollapseBox>
			<JCollapseBox name="标记" unfold>
				<>
					<JSettingBox name="样式">
						<div className="config-items-layout">
							<JSettingItem text="大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.series[0].symbolSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{ ...chartOptions.series[0], symbolSize: val },
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].itemStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												itemStyle: { ...chartOptions.series[0].itemStyle, color }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="文本">
						<div className="config-items-layout">
							<JSettingItem text="显示">
								<Switch
									value={chartOptions.series[0].label.show}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												label: { ...chartOptions.series[0].label, show: val }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.series[0].label.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												label: { ...chartOptions.series[0].label, fontSize: val }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].label.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												label: { ...chartOptions.series[0].label, color }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="涟漪">
						<div className="config-items-layout">
							<JSettingItem text="大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={1}
									value={chartOptions.series[0].rippleEffect.scale}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												rippleEffect: { ...chartOptions.series[0].rippleEffect, scale: val }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[0].rippleEffect.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												rippleEffect: { ...chartOptions.series[0].rippleEffect, color }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="绘制方式">
								<Select
									className="w-full"
									options={rippleEffectOptions}
									value={chartOptions.series[0].rippleEffect.brushType}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											{
												...chartOptions.series[0],
												rippleEffect: { ...chartOptions.series[0].rippleEffect, brushType: val }
											},
											chartOptions.series[1],
											chartOptions.series[2]
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
			<JCollapseBox name="飞线" unfold>
				<>
					<JSettingBox name="箭头">
						<div className="config-items-layout">
							<JSettingItem text="速度">
								<Tooltip title="值越小速度越快">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={0}
										value={chartOptions.series[2].effect.period}
										onChange={(val) => {
											update(chartIndex, "option", "series", [
												chartOptions.series[0],
												chartOptions.series[1],
												{
													...chartOptions.series[2],
													effect: { ...chartOptions.series[2].effect, period: val }
												}
											]);
										}}
									/>
								</Tooltip>
							</JSettingItem>
							<JSettingItem text="尾迹">
								<Tooltip title="特效尾迹长度[0,1]值越大，尾迹越长重">
									<InputNumber
										className="w-full"
										placeholder="请输入"
										min={0}
										max={1}
										step={0.1}
										value={chartOptions.series[2].effect.trailLength}
										onChange={(val) => {
											update(chartIndex, "option", "series", [
												chartOptions.series[0],
												chartOptions.series[1],
												{
													...chartOptions.series[2],
													effect: { ...chartOptions.series[2].effect, trailLength: val }
												}
											]);
										}}
									/>
								</Tooltip>
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.series[2].effect.symbolSize}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											chartOptions.series[1],
											{
												...chartOptions.series[2],
												effect: { ...chartOptions.series[2].effect, symbolSize: val }
											}
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="配置">
						<div className="config-items-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.series[2].lineStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											chartOptions.series[1],
											{
												...chartOptions.series[2],
												lineStyle: { ...chartOptions.series[2].lineStyle, color }
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="宽度">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									value={chartOptions.series[2].lineStyle.width}
									onChange={(val) => {
										update(chartIndex, "option", "series", [
											chartOptions.series[0],
											chartOptions.series[1],
											{
												...chartOptions.series[2],
												lineStyle: { ...chartOptions.series[2].lineStyle, width: val }
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

export default MapBaseConfigComponent;
