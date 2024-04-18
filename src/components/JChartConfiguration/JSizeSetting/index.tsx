import { memo } from "react";
import { InputNumber, Typography } from "antd";
import JSettingBox from "../public/JSettingBox";
import { chartInitConfig } from "@/settings/designSetting";
import { UpdateChartConfigType } from "@/store/chartStore/types";

interface ISizeSettingProps {
	chartIndex: number;
	attr: typeof chartInitConfig;
	update: UpdateChartConfigType;
}

const JSizeSetting = memo((props: ISizeSettingProps) => {
	const { chartIndex, attr, update } = props;

	return (
		<JSettingBox name="尺寸">
			<div className="w-full flex gap-2">
				<InputNumber
					addonBefore={<Typography.Text>宽度</Typography.Text>}
					className="flex-1"
					value={attr.w}
					onChange={(val) => {
						val && update(chartIndex, "attr", null, { ...attr, w: val });
					}}
				/>
				<InputNumber
					addonBefore={<Typography.Text>高度</Typography.Text>}
					className="flex-1"
					value={attr.h}
					onChange={(val) => {
						val && update(chartIndex, "attr", null, { ...attr, h: val });
					}}
				/>
			</div>
		</JSettingBox>
	);
});

export default JSizeSetting;
