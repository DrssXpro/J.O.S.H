import { memo } from "react";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, Input, InputNumber, Select, Switch } from "antd";
import { FontWeightEnum, FontWeightObject } from "../config";
import { ChartConfigComponentProps } from "@/materials/types";

const fontWeightOptions = [
	{
		label: FontWeightEnum.NORMAL,
		value: FontWeightObject[FontWeightEnum.NORMAL]
	},
	{
		label: FontWeightEnum.BOLD,
		value: FontWeightObject[FontWeightEnum.BOLD]
	}
];

const TextBarrageConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JCollapseBox name="信息" unfold>
				<JSettingBox name="文字">
					<JSettingItem>
						<Input.TextArea
							value={chartOptions.dataset}
							onChange={(e) => {
								update(chartIndex, "option", "dataset", e.target.value);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
			</JCollapseBox>
			<JCollapseBox name="样式" unfold>
				<>
					<JSettingBox name="文字">
						<div className="config-layout">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.fontColor}
									onChange={(val) => {
										const color = val.toHexString();
										val && update(chartIndex, "option", "fontColor", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="字体大小"
									min={12}
									value={chartOptions.fontSize}
									onChange={(val) => {
										update(chartIndex, "option", "fontSize", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体粗细">
								<Select
									className="w-full"
									value={chartOptions.fontWeight}
									options={fontWeightOptions}
									onChange={(val) => {
										update(chartIndex, "option", "fontWeight", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字间距">
								<InputNumber
									className="w-full"
									placeholder="输入字间距"
									min={0}
									value={chartOptions.letterSpacing}
									onChange={(val) => {
										update(chartIndex, "option", "letterSpacing", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="阴影">
						<div className="config-layout">
							<JSettingItem text="展示阴影">
								<Switch
									value={chartOptions.showShadow}
									onChange={(val) => {
										update(chartIndex, "option", "showShadow", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.colorShadow}
									onChange={(val) => {
										const color = val.toHexString();
										val && update(chartIndex, "option", "colorShadow", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="x">
								<InputNumber
									className="w-full"
									value={chartOptions.hShadow}
									onChange={(val) => {
										update(chartIndex, "option", "hShadow", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="y">
								<InputNumber
									className="w-full"
									value={chartOptions.vShadow}
									onChange={(val) => {
										update(chartIndex, "option", "vShadow", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="模糊">
								<InputNumber
									className="w-full"
									min={0}
									value={chartOptions.blurShadow}
									onChange={(val) => {
										update(chartIndex, "option", "blurShadow", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="动画">
						<div className="config-layout">
							<JSettingItem text="动画速度">
								<InputNumber
									className="w-full"
									placeholder="输入动画速度"
									min={0}
									value={chartOptions.animationSpeed}
									onChange={(val) => {
										update(chartIndex, "option", "animationSpeed", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="动画间隔">
								<InputNumber
									className="w-full"
									placeholder="输入动画间隔"
									min={0}
									value={chartOptions.animationTime}
									onChange={(val) => {
										update(chartIndex, "option", "animationTime", val);
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

export default TextBarrageConfigComponent;
