import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { ColorPicker, Input, InputNumber, Select } from "antd";
import { FontWeightEnum, FontWeightObject, WritingModeEnum, WritingModeObject } from "../config";

const linkHeadOptions = [
	{ label: "http://", value: "http://" },
	{ label: "https://", value: "https://" }
];

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

const verticalOptions = [
	{
		label: WritingModeEnum.HORIZONTAL,
		value: WritingModeObject[WritingModeEnum.HORIZONTAL]
	},
	{
		label: WritingModeEnum.VERTICAL,
		value: WritingModeObject[WritingModeEnum.VERTICAL]
	}
];

const textAlignOptions = [
	{ label: "左对齐", value: "start" },
	{ label: "居中", value: "center" },
	{ label: "右对齐", value: "end" }
];

const TextCommonConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<>
			<JCollapseBox name="信息" unfold>
				<>
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
					<JSettingBox name="链接">
						<JSettingItem>
							<div className="flex items-center">
								<>
									<Input.Search
										value={component.option.link}
										placeholder="请输入"
										enterButton="跳转"
										onChange={(e) => {
											updateChartConfig(chartIndex, "option", "link", e.target.value);
										}}
										addonBefore={
											<Select
												className="w-21"
												value={component.option.linkHead}
												options={linkHeadOptions}
												onChange={(val) => {
													updateChartConfig(chartIndex, "option", "linkHead", val);
												}}
											/>
										}
										onSearch={() => {
											window.open(component.option.linkHead + component.option.link);
										}}
									/>
								</>
							</div>
						</JSettingItem>
					</JSettingBox>
				</>
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
							<JSettingItem text="X轴内边距">
								<InputNumber
									className="w-full"
									min={0}
									value={component.option.paddingX}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "paddingX", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="Y轴内边距">
								<InputNumber
									className="w-full"
									min={0}
									value={component.option.paddingY}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "paddingY", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="水平对齐">
								<Select
									className="w-full"
									value={component.option.textAlign}
									options={textAlignOptions}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "textAlign", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="文本方向">
								<Select
									className="w-full"
									value={component.option.writingMode}
									options={verticalOptions}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "writingMode", val);
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
					<JSettingBox name="边框">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="宽度">
								<InputNumber
									className="w-full"
									placeholder="输入圆角"
									min={0}
									value={component.option.borderWidth}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "borderWidth", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.borderColor}
									onChange={(val) => {
										const color = val.toHexString();
										val && updateChartConfig(chartIndex, "option", "borderColor", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="圆角">
								<InputNumber
									className="w-full"
									placeholder="输入圆角"
									min={0}
									value={component.option.borderRadius}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "borderRadius", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="背景">
						<JSettingItem text="背景颜色">
							<ColorPicker
								className="w-full"
								showText
								value={component.option.backgroundColor}
								onChange={(val) => {
									const color = val.toHexString();
									val && updateChartConfig(chartIndex, "option", "backgroundColor", color);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
};

export default TextCommonConfigComponent;
