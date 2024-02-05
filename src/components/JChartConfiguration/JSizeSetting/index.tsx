import { InputNumber, Typography } from "antd";
import JSettingBox from "../JSettingBox";

const JSizeSetting = () => {
	return (
		<JSettingBox name="尺寸">
			<div className="w-full flex gap-2">
				<InputNumber
					addonBefore={<Typography.Text>宽度</Typography.Text>}
					className="flex-1"
					defaultValue={800}
				/>
				<InputNumber
					addonBefore={<Typography.Text>高度</Typography.Text>}
					className="flex-1"
					defaultValue={600}
				/>
			</div>
		</JSettingBox>
	);
};

export default JSizeSetting;
