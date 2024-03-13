import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { ColorPicker, Input, InputNumber, Select, Switch } from "antd";
import { FontWeightEnum, FontWeightObject } from "../config";

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

const TextBarrageConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	return (
		<>
			<JCollapseBox name="信息" unfold>
				<JSettingBox name="文字">
					<JSettingItem>
						<Input.TextArea
							value={component.option.dataset}
							onChange={(e) => {
								updateChartConfig(chartIndex, "option", "dataset", e.target.value);
							}}
						/>
					</JSettingItem>
				</JSettingBox>
			</JCollapseBox>
			<JCollapseBox name="样式" unfold>
				<>
					<JSettingBox name="文字">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.fontColor}
									onChange={(val) => {
										const color = val.toHexString();
										val && updateChartConfig(chartIndex, "option", "fontColor", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="字体大小"
									min={12}
									value={component.option.fontSize}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "fontSize", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体粗细">
								<Select
									className="w-full"
									value={component.option.fontWeight}
									options={fontWeightOptions}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "fontWeight", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字间距">
								<InputNumber
									className="w-full"
									placeholder="输入字间距"
									min={0}
									value={component.option.letterSpacing}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "letterSpacing", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="阴影">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示阴影">
								<Switch
									value={component.option.showShadow}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "showShadow", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.colorShadow}
									onChange={(val) => {
										const color = val.toHexString();
										val && updateChartConfig(chartIndex, "option", "colorShadow", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="x">
								<InputNumber
									className="w-full"
									value={component.option.hShadow}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "hShadow", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="y">
								<InputNumber
									className="w-full"
									value={component.option.vShadow}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "vShadow", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="模糊">
								<InputNumber
									className="w-full"
									min={0}
									value={component.option.blurShadow}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "blurShadow", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="动画">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="动画速度">
								<InputNumber
									className="w-full"
									placeholder="输入动画速度"
									min={0}
									value={component.option.animationSpeed}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "animationSpeed", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="动画间隔">
								<InputNumber
									className="w-full"
									placeholder="输入动画间隔"
									min={0}
									value={component.option.animationTime}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "animationTime", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
};

export default TextBarrageConfigComponent;
