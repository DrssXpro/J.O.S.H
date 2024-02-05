import { ColorPicker, Input, InputNumber, Select, Switch } from "antd";
import JCollapseBox from "../JCollapseBox";
import JSettingBox from "../JSettingBox";
import JSettingItem from "../JSettingItem";
import { axisConfig, legendConfig } from "@/materials/echartsConfig";

const JGlobalChartSetting = () => {
	return (
		<>
			<JCollapseBox name="容器">
				<JSettingBox name="距离">
					<div className="grid grid-cols-2 gap-2">
						<JSettingItem text="左侧距离">
							<Input />
						</JSettingItem>
						<JSettingItem text="右侧距离">
							<Input />
						</JSettingItem>
						<JSettingItem text="上侧距离">
							<Input />
						</JSettingItem>
						<JSettingItem text="下侧距离">
							<Input />
						</JSettingItem>
					</div>
				</JSettingBox>
			</JCollapseBox>
			<JCollapseBox
				name="X轴"
				operator={<Switch defaultChecked checkedChildren="启用" unCheckedChildren="关闭" />}
			>
				<>
					<JSettingBox name="单位">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="名称">
								<Input placeholder="请输入" />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
							<JSettingItem text="偏移量">
								<InputNumber className="w-full" defaultValue={15} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="标签">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
							<JSettingItem text="偏移量">
								<InputNumber className="w-full" defaultValue={15} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="轴线">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="粗细">
								<InputNumber className="w-full" defaultValue={1} />
							</JSettingItem>
							<JSettingItem text="位置">
								<Select defaultValue="bottom" className="w-full" options={axisConfig.xposition} />
							</JSettingItem>
							<JSettingItem text="对齐零">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="反向">
								<Switch />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="刻度">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="长度">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="分割线">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="粗细">
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
				</>
			</JCollapseBox>
			<JCollapseBox
				name="Y轴"
				operator={<Switch defaultChecked checkedChildren="启用" unCheckedChildren="关闭" />}
			>
				<>
					<JSettingBox name="单位">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="名称">
								<Input placeholder="请输入" />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
							<JSettingItem text="偏移量">
								<InputNumber className="w-full" defaultValue={15} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="标签">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
							<JSettingItem text="偏移量">
								<InputNumber className="w-full" defaultValue={15} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="轴线">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="粗细">
								<InputNumber className="w-full" defaultValue={1} />
							</JSettingItem>
							<JSettingItem text="位置">
								<Select defaultValue="left" className="w-full" options={axisConfig.yposition} />
							</JSettingItem>
							<JSettingItem text="对齐零">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="反向">
								<Switch />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="刻度">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch defaultChecked />
							</JSettingItem>
							<JSettingItem text="长度">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="分割线">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="展示">
								<Switch />
							</JSettingItem>
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="粗细">
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
				</>
			</JCollapseBox>
			<JCollapseBox name="图例">
				<>
					<JSettingBox name="图例文字">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="颜色">
								<ColorPicker className="w-full" defaultValue="#1677ff" showText />
							</JSettingItem>
							<JSettingItem text="大小">
								<InputNumber className="w-full" defaultValue={12} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="图例位置">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="x轴">
								<Select defaultValue="left" className="w-full" options={legendConfig.lengendX} />
							</JSettingItem>
							<JSettingItem text="y轴">
								<Select defaultValue="top" className="w-full" options={legendConfig.lengendY} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="图例信息">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="方向">
								<Select defaultValue="horizontal" className="w-full" options={legendConfig.orient} />
							</JSettingItem>
							<JSettingItem text="形状">
								<Select defaultValue="circle" className="w-full" options={legendConfig.shape} />
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="图例大小">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="宽">
								<InputNumber className="w-full" defaultValue={15} />
							</JSettingItem>
							<JSettingItem text="高">
								<InputNumber className="w-full" defaultValue={15} />
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
};

export default JGlobalChartSetting;
