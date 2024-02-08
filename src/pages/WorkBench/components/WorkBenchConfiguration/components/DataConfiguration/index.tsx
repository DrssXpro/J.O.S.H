import { useState } from "react";
import { Select } from "antd";
import { RequestDataLabelEnum, RequestDataValueEnum } from "@/types/HttpTypes";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import StaticData from "./components/StaticData";
import DynamicData from "./components/DynamicData";
import PublicData from "./components/PublicData";

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
		label: RequestDataLabelEnum.DYNAMIC,
		value: RequestDataValueEnum.DYNAMIC
	},
	{
		label: RequestDataLabelEnum.PUBLIC,
		value: RequestDataValueEnum.PUBLIC
	}
];

const ConfigurationComponentMap: Record<RequestDataValueEnum, JSX.Element> = {
	[RequestDataValueEnum.STATIC]: <StaticData />,
	[RequestDataValueEnum.DYNAMIC]: <DynamicData />,
	[RequestDataValueEnum.PUBLIC]: <PublicData />
};

const DataConfiguration = () => {
	const [currentSelect, setCurrentSelect] = useState<RequestDataValueEnum>(RequestDataValueEnum.STATIC);
	return (
		<>
			<JSettingBox name="请求方式">
				<Select
					className="w-full"
					defaultValue={RequestDataValueEnum.STATIC}
					options={dataOptions}
					onChange={(value) => {
						setCurrentSelect(value);
					}}
				/>
			</JSettingBox>
			{ConfigurationComponentMap[currentSelect]}
		</>
	);
};

export default DataConfiguration;
