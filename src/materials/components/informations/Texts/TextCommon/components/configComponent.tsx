import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, Input, InputNumber, Select } from "antd";
import { FontWeightEnum, FontWeightObject, WritingModeEnum, WritingModeObject } from "../config";
import { ChartConfigComponentProps } from "@/materials/types";
import { memo } from "react";

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

const TextCommonConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;

	return (
		<>
			<JCollapseBox name="信息" unfold>
				<>
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
					<JSettingBox name="链接">
						<JSettingItem>
							<div className="flex items-center">
								<>
									<Input.Search
										value={chartOptions.link}
										placeholder="请输入"
										enterButton="跳转"
										onChange={(e) => {
											update(chartIndex, "option", "link", e.target.value);
										}}
										addonBefore={
											<Select
												className="w-21"
												value={chartOptions.linkHead}
												options={linkHeadOptions}
												onChange={(val) => {
													update(chartIndex, "option", "linkHead", val);
												}}
											/>
										}
										onSearch={() => {
											window.open(chartOptions.linkHead + chartOptions.link);
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
						<div className="config-items-layout">
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
									placeholder="请输入"
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
							<JSettingItem text="X轴内边距">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.paddingX}
									onChange={(val) => {
										update(chartIndex, "option", "paddingX", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="Y轴内边距">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.paddingY}
									onChange={(val) => {
										update(chartIndex, "option", "paddingY", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="水平对齐">
								<Select
									className="w-full"
									value={chartOptions.textAlign}
									options={textAlignOptions}
									onChange={(val) => {
										update(chartIndex, "option", "textAlign", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="文本方向">
								<Select
									className="w-full"
									value={chartOptions.writingMode}
									options={verticalOptions}
									onChange={(val) => {
										update(chartIndex, "option", "writingMode", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字间距">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.letterSpacing}
									onChange={(val) => {
										update(chartIndex, "option", "letterSpacing", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="边框">
						<div className="config-items-layout">
							<JSettingItem text="宽度">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.borderWidth}
									onChange={(val) => {
										update(chartIndex, "option", "borderWidth", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.borderColor}
									onChange={(val) => {
										const color = val.toHexString();
										val && update(chartIndex, "option", "borderColor", color);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="圆角">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.borderRadius}
									onChange={(val) => {
										update(chartIndex, "option", "borderRadius", val);
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
								value={chartOptions.backgroundColor}
								onChange={(val) => {
									const color = val.toHexString();
									val && update(chartIndex, "option", "backgroundColor", color);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
});

export default TextCommonConfigComponent;
