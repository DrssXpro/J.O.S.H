import { memo } from "react";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ChartConfigComponentProps } from "@/materials/types";
import { Input, InputNumber, Select } from "antd";

// 适应类型
const fitList = [
	{
		value: "fill",
		label: "fill"
	},
	{
		value: "contain",
		label: "contain"
	},
	{
		value: "cover",
		label: "cover"
	},
	{
		value: "none",
		label: "none"
	}
];

const ImageConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;

	return (
		<JCollapseBox name="属性" unfold>
			<>
				<JSettingBox name="路径">
					<Input
						value={chartOptions.dataset}
						onChange={(e) => {
							update(chartIndex, "option", "dataset", e.target.value);
						}}
					/>
				</JSettingBox>
				<JSettingBox name="样式">
					<div className="config-items-layout">
						<JSettingItem text="类型">
							<Select
								className="w-full"
								options={fitList}
								value={chartOptions.fit}
								onChange={(val) => {
									update(chartIndex, "option", "fit", val);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="圆角">
							<InputNumber
								className="w-full"
								min={0}
								value={chartOptions.borderRadius}
								onChange={(val) => {
									update(chartIndex, "option", "borderRadius", val);
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
			</>
		</JCollapseBox>
	);
});

export default ImageConfigComponent;
