import { Input } from "antd";
import JSettingBox from "../JSettingBox";

const JNameSetting = () => {
	return (
		<JSettingBox name="名称">
			<Input count={{ show: true, max: 12 }} maxLength={12} placeholder="请输入图表名称" allowClear />
		</JSettingBox>
	);
};

export default JNameSetting;
