import { RendererTypeEnum } from "@/materials/types";
import { Radio, Tooltip } from "antd";

interface IJChartRendererSettingProps {
	value: RendererTypeEnum;
	onChange: (value: RendererTypeEnum) => void;
}

const JChartRendererSetting = (props: IJChartRendererSettingProps) => {
	const { value, onChange } = props;
	const rendererList = [
		{
			value: "svg",
			desc: "在缩放场景下具有更好的表现"
		},
		{
			value: "canvas",
			desc: "数据量较大（经验判断 > 1k）、较多交互时，建议选择"
		}
	];

	return (
		<Radio.Group name="radiogroup" value={value} onChange={(e) => onChange(e.target.value)}>
			{rendererList.map((i) => (
				<Tooltip title={i.desc} key={i.value}>
					<Radio value={i.value}>{i.value}</Radio>
				</Tooltip>
			))}
		</Radio.Group>
	);
};

export default JChartRendererSetting;
