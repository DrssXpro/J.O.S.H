import { InputNumber, Slider, Switch } from "antd";
import JCollapseBox from "../public/JCollapseBox";
import JSettingBox from "../public/JSettingBox";
import JSettingItem from "../public/JSettingItem";

const JStylesSetting = () => {
	return (
		<JCollapseBox
			name="滤镜 / 变换"
			operator={<Switch defaultChecked checkedChildren="启用" unCheckedChildren="关闭" />}
		>
			<div>
				<JSettingBox name="亮度">
					<JSettingItem text="值: 100 deg">
						<Slider style={{ margin: "0", marginTop: "5px" }} />
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="透明度">
					<JSettingItem text="值: 100 %">
						<Slider style={{ margin: "0", marginTop: "5px" }} />
					</JSettingItem>
				</JSettingBox>
				<JSettingBox name="旋转°">
					<div className="config-layout">
						<JSettingItem text="Z轴(平面) - 旋转">
							<InputNumber className="w-full" defaultValue={600} />
						</JSettingItem>
						<JSettingItem text="X轴 - 旋转">
							<InputNumber className="w-full" defaultValue={600} />
						</JSettingItem>
						<JSettingItem text="Y轴 - 旋转">
							<InputNumber className="w-full" defaultValue={600} />
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="倾斜°">
					<div className="config-layout">
						<JSettingItem text="X轴 - 倾斜">
							<InputNumber className="w-full" defaultValue={600} />
						</JSettingItem>
						<JSettingItem text="Y轴 - 倾斜">
							<InputNumber className="w-full" defaultValue={600} />
						</JSettingItem>
					</div>
				</JSettingBox>
			</div>
		</JCollapseBox>
	);
};

export default JStylesSetting;
