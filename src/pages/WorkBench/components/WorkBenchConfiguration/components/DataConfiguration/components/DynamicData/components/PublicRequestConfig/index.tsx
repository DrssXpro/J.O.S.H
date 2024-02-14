import { Tabs, TabsProps } from "antd";
import RequestConfigTable from "../RequestConfigTable";

interface IPublicRequestConfig {
	isEdit: boolean;
}

const PublicRequestConfig = (props: IPublicRequestConfig) => {
	const { isEdit } = props;
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Header",
			children: <RequestConfigTable disabled={isEdit} />
		}
	];

	return <Tabs items={items}></Tabs>;
};

export default PublicRequestConfig;
