import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ColorPicker, InputNumber, Select, Switch } from "antd";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";
import { axisConfig } from "@/materials/echartsConfig";

const LineGradientSingleConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<>
			<JGlobalChartSetting chartIndex={chartIndex} />
			{component.option.series.map((i: any, index: number) => (
				<JCollapseBox name="单折线面积图" key={index} unfold>
					<>
						<JSettingBox name="线条">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="宽度">
									<InputNumber
										className="w-full"
										value={i.lineStyle.width}
										onChange={(val) => {
											const series = component.option.series[0];
											updateChartConfig(chartIndex, "option", "series", [
												{ ...series, lineStyle: { ...series.lineStyle, width: val } }
											]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="类型">
									<Select
										value={i.lineStyle.type}
										className="w-full"
										options={axisConfig.splitLint.lineStyle}
										onChange={(val) => {
											const series = component.option.series[0];
											updateChartConfig(chartIndex, "option", "series", [
												{ ...series, lineStyle: { ...series.lineStyle, type: val } }
											]);
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
											const series = component.option.series[0];
											updateChartConfig(chartIndex, "option", "series", [
												{ ...series, symbolSize: val }
											]);
										}}
									/>
								</JSettingItem>
							</div>
						</JSettingBox>
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch
										value={i.label.show}
										onChange={(val) => {
											const series = component.option.series[0];
											updateChartConfig(chartIndex, "option", "series", [
												{ ...series, label: { ...series.label, show: val } }
											]);
										}}
									/>
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber
										className="w-full"
										value={i.label.fontSize}
										onChange={(val) => {
											const series = component.option.series[0];
											val &&
												updateChartConfig(chartIndex, "option", "series", [
													{ ...series, label: { ...series.label, fontSize: val } }
												]);
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
											const series = component.option.series[0];
											val &&
												updateChartConfig(chartIndex, "option", "series", [
													{ ...series, label: { ...series.label, color } }
												]);
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
											const series = component.option.series[0];
											val &&
												updateChartConfig(chartIndex, "option", "series", [
													{ ...series, label: { ...series.label, position: val } }
												]);
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

export default LineGradientSingleConfigComponent;
