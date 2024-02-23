import { Select } from "antd";
import { RequestDataLabelEnum, RequestDataValueEnum } from "@/types/HttpTypes";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import StaticData from "./components/StaticData";
import DynamicData from "./components/DynamicData";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";

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
	}
];

const ConfigurationComponentMap: Record<RequestDataValueEnum, JSX.Element> = {
	[RequestDataValueEnum.STATIC]: <StaticData />,
	[RequestDataValueEnum.DYNAMIC]: <DynamicData />
};

const DataConfiguration = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<>
			<JSettingBox name="请求方式">
				<Select
					className="w-full"
					options={dataOptions}
					value={component.request.requestDataType}
					onChange={(value) => {
						updateChartConfig(chartIndex, "request", "requestDataType", value);
					}}
				/>
			</JSettingBox>
			{ConfigurationComponentMap[component.request.requestDataType]}
		</>
	);
};

export default DataConfiguration;
