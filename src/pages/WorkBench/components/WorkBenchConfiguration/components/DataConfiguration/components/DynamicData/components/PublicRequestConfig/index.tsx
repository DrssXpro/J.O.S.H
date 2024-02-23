import { Tabs, TabsProps } from "antd";
import RequestConfigTable from "../RequestConfigTable";
import useChartStore from "@/store/chartStore/chartStore";
import { RequestParamsTypeEnum } from "@/types/HttpTypes";

interface IPublicRequestConfig {
	isEdit: boolean;
}

const PublicRequestConfig = (props: IPublicRequestConfig) => {
	const { isEdit } = props;
	const { requestGlobalConfig, updateGlobalRequestParams } = useChartStore();
	const { requestParams } = requestGlobalConfig;

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Header",
			children: (
				<RequestConfigTable
					disabled={isEdit}
					dataParams={requestParams[RequestParamsTypeEnum.HEADER]}
					updateParams={(value) => {
						updateGlobalRequestParams(RequestParamsTypeEnum.HEADER, value);
					}}
				/>
			)
		}
	];

	return <Tabs items={items}></Tabs>;
};

export default PublicRequestConfig;
