import { useMemo } from "react";
import { Select } from "antd";
import { RequestConfigType, RequestDataLabelEnum, RequestDataValueEnum } from "@/types/HttpTypes";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import StaticData from "./components/StaticData";
import DynamicData from "./components/DynamicData";
import { ChartFrameEnum, ConfigurationProps, IMaterialConfigType } from "@/materials/types";
import { UpdateChartConfigType } from "@/store/chartStore/types";

interface IDataOptions {
	label: RequestDataLabelEnum;
	value: RequestDataValueEnum;
	disabled?: boolean;
}

export interface DataConfigProps {
	chartIndex: number;
	chartFilter: string;
	chartOptions: any;
	chartConfig: IMaterialConfigType;
	chartRequestConfig: RequestConfigType;
	update: UpdateChartConfigType;
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

const ConfigurationComponentMap: Record<RequestDataValueEnum, (props: ConfigurationProps) => JSX.Element> = {
	[RequestDataValueEnum.STATIC]: ({ component, update, chartIndex }) => (
		<StaticData
			chartIndex={chartIndex}
			chartFilter={component.filter || ""}
			chartOptions={component.option}
			chartConfig={component.chartConfig}
			chartRequestConfig={component.request}
			update={update}
		/>
	),
	[RequestDataValueEnum.DYNAMIC]: ({ component, update, chartIndex }) => (
		<DynamicData
			chartIndex={chartIndex}
			chartFilter={component.filter || ""}
			chartOptions={component.option}
			chartConfig={component.chartConfig}
			chartRequestConfig={component.request}
			update={update}
		/>
	)
};

const DataConfiguration = (props: ConfigurationProps) => {
	const { component, update, chartIndex } = props;
	//无数据源
	const isNotData = useMemo(() => {
		return (
			component.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
			typeof component.option?.dataset === "undefined"
		);
	}, [component]);

	return (
		<>
			<JSettingBox name="请求方式">
				<Select
					className="w-full"
					options={dataOptions}
					value={component.request.requestDataType}
					disabled={isNotData}
					onChange={(value) => {
						update(chartIndex, "request", "requestDataType", value);
					}}
				/>
			</JSettingBox>
			{ConfigurationComponentMap[component.request.requestDataType]({
				component: component,
				chartIndex: chartIndex,
				update: update
			})}
			{}
		</>
	);
};

export default DataConfiguration;
