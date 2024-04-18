import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { ColorPicker, InputNumber, Select } from "antd";

const PieCircleConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	return (
		<>
			<JCollapseBox name="圆环" unfold>
				<>
					<JSettingBox name="数据">
						<JSettingItem text="数值">
							<InputNumber
								className="w-32"
								min={0}
								max={1}
								step={0.01}
								value={component.option.dataset}
								onChange={(val) => {
									updateChartConfig(chartIndex, "option", "dataset", val);
								}}
							/>
						</JSettingItem>
					</JSettingBox>
					<JSettingBox name="标题">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.title.textStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										updateChartConfig(chartIndex, "option", "title", {
											...component.option.title,
											textStyle: { ...component.option.title.textStyle, color: color }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									min={0}
									step={1}
									value={component.option.title.textStyle.fontSize}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "title", {
											...component.option.title,
											textStyle: { ...component.option.title.textStyle, fontSize: val }
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="进度条">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.series[0].data[0].itemStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = component.option.series[0];
										const updateData = { ...seriesOption.data[0] };
										updateData.itemStyle = { ...updateData.itemStyle, color };
										updateChartConfig(chartIndex, "option", "series", [
											{
												...seriesOption,
												data: [updateData, seriesOption.data[1]]
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="阴影模糊等级">
								<InputNumber
									className="w-full"
									min={0}
									max={50}
									step={1}
									value={component.option.series[0].data[0].itemStyle.shadowBlur}
									onChange={(val) => {
										const seriesOption = component.option.series[0];
										const updateData = { ...seriesOption.data[0] };
										updateData.itemStyle = { ...updateData.itemStyle, shadowBlur: val };
										updateChartConfig(chartIndex, "option", "series", [
											{
												...seriesOption,
												data: [updateData, seriesOption.data[1]]
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="阴影颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.series[0].data[0].itemStyle.shadowColor}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = component.option.series[0];
										const updateData = { ...seriesOption.data[0] };
										updateData.itemStyle = { ...updateData.itemStyle, shadowColor: color };
										updateChartConfig(chartIndex, "option", "series", [
											{
												...seriesOption,
												data: [updateData, seriesOption.data[1]]
											}
										]);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="轨道">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.series[0].data[1].itemStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = component.option.series[0];
										const updateData = { ...seriesOption.data[1] };
										updateData.itemStyle = { ...updateData.itemStyle, color };
										updateChartConfig(chartIndex, "option", "series", [
											{
												...seriesOption,
												data: [seriesOption.data[0], updateData]
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="阴影模糊等级">
								<InputNumber
									className="w-full"
									min={0}
									max={50}
									step={1}
									value={component.option.series[0].data[1].itemStyle.shadowBlur}
									onChange={(val) => {
										const seriesOption = component.option.series[0];
										const updateData = { ...seriesOption.data[1] };
										updateData.itemStyle = { ...updateData.itemStyle, shadowBlur: val };
										updateChartConfig(chartIndex, "option", "series", [
											{
												...seriesOption,
												data: [seriesOption.data[0], updateData]
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="阴影颜色">
								<ColorPicker
									className="w-full"
									showText
									value={component.option.series[0].data[1].itemStyle.shadowColor}
									onChange={(val) => {
										const color = val.toHexString();
										const seriesOption = component.option.series[0];
										const updateData = { ...seriesOption.data[1] };
										updateData.itemStyle = { ...updateData.itemStyle, shadowColor: color };
										updateChartConfig(chartIndex, "option", "series", [
											{
												...seriesOption,
												data: [seriesOption.data[0], updateData]
											}
										]);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="轨道宽度">
								<Select
									className="w-full"
									options={[
										{ label: "窄", value: "75%" },
										{ label: "中", value: "60%" },
										{ label: "宽", value: "45%" },
										{ label: "更宽", value: "30%" }
									]}
									value={component.option.series[0].radius[0]}
									onChange={(val) => {
										const seriesOption = component.option.series[0];
										updateChartConfig(chartIndex, "option", "series", [
											{ ...seriesOption, radius: [val, seriesOption.radius[1]] }
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
};

export default PieCircleConfigComponent;
