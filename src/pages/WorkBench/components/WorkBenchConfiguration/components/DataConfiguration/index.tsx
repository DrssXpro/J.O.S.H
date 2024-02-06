import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import { RequestDataLabelEnum, RequestDataValueEnum } from "@/types/HttpTypes";
import { Select } from "antd";
import StaticData from "./components/StaticData";

interface IDataOptions {
	label: RequestDataLabelEnum;
	value: RequestDataValueEnum;
	disabled?: boolean;
}

const dataOptions: IDataOptions[] = [
	{
		label: RequestDataLabelEnum.STATIC,
		value: RequestDataValueEnum.STATIC
	},
	{
		label: RequestDataLabelEnum.AJAX,
		value: RequestDataValueEnum.AJAX
	},
	{
		label: RequestDataLabelEnum.Pond,
		value: RequestDataValueEnum.Pond
	}
];

const DataConfiguration = () => {
	return (
		<>
			<JSettingBox name="请求方式">
				<Select className="w-full" defaultValue={RequestDataLabelEnum.STATIC} options={dataOptions} />
			</JSettingBox>
			<StaticData />
		</>
	);
};

export default DataConfiguration;
