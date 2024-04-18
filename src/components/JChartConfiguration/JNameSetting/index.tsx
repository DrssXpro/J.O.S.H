import { memo } from "react";
import { Input } from "antd";
import JSettingBox from "../public/JSettingBox";
import { UpdateChartConfigType } from "@/store/chartStore/types";

interface INameSettingProps {
	chartIndex: number;
	title: string;
	update: UpdateChartConfigType;
}

const JNameSetting = memo((props: INameSettingProps) => {
	const { chartIndex, title, update } = props;
	return (
		<JSettingBox name="名称">
			<Input
				count={{ show: true, max: 12 }}
				maxLength={12}
				placeholder="请输入图表名称"
				allowClear
				value={title}
				onChange={(e) => {
					update(chartIndex, "chartConfig", "title", e.target.value);
				}}
			/>
		</JSettingBox>
	);
});

export default JNameSetting;
