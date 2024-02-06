import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { axisConfig } from "@/materials/echartsConfig";
import { ColorPicker, InputNumber, Select, Switch } from "antd";

const BarLineConfigComponent = () => {
	const list = ["bar", "line"];
	return (
		<>
			<JGlobalChartSetting />
			{list.map((i) => (
				<JCollapseBox name={i === "bar" ? "柱状图" : "折线图"} key={i}>
					<>
						{i === "bar" && (
							<JSettingBox name="圆形">
								<div className="grid grid-cols-2 gap-2">
									<JSettingItem text="宽度">
										<InputNumber className="w-full" defaultValue={12} />
									</JSettingItem>
									<JSettingItem text="圆角">
										<InputNumber className="w-full" defaultValue={2} />
									</JSettingItem>
								</div>
							</JSettingBox>
						)}
						{i !== "bar" && (
							<>
								<JSettingBox name="线条">
									<div className="grid grid-cols-2 gap-2">
										<JSettingItem text="宽度">
											<InputNumber className="w-full" defaultValue={12} />
										</JSettingItem>
										<JSettingItem text="类型">
											<Select
												defaultValue="solid"
												className="w-full"
												options={axisConfig.splitLint.lineStyle}
											/>
										</JSettingItem>
									</div>
								</JSettingBox>
								<JSettingBox name="实心点">
									<div className="grid grid-cols-2 gap-2">
										<JSettingItem text="宽度">
											<InputNumber className="w-full" defaultValue={12} />
										</JSettingItem>
									</div>
								</JSettingBox>
							</>
						)}
						<JSettingBox name="标签">
							<div className="grid grid-cols-2 gap-2">
								<JSettingItem text="展示">
									<Switch defaultChecked />
								</JSettingItem>
								<JSettingItem text="大小">
									<InputNumber className="w-full" defaultValue={2} />
								</JSettingItem>
								<JSettingItem text="tip颜色">
									<ColorPicker className="w-full" defaultValue="#1677ff" showText />
								</JSettingItem>
								<JSettingItem text="位置">
									<Select
										defaultValue="top"
										className="w-full"
										options={[
											{ label: "top", value: "top" },
											{ label: "left", value: "left" },
											{ label: "right", value: "right" },
											{ label: "bottom", value: "bottom" }
										]}
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

export default BarLineConfigComponent;
