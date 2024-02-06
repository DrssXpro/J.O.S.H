import { Badge, Button, Steps, Table, TableProps, Tooltip } from "antd";
import { DocumentAdd, DocumentDownload } from "@ricons/carbon";
import { HelpCircleOutline } from "@ricons/ionicons5";
import JIcon from "@/components/JIcon";

interface IDataType {
	key: string;
	field: string;
	mapping: string;
	result: string;
}

const dataSource: IDataType[] = [
	{
		key: "1",
		field: "通用标识",
		mapping: "product",
		result: "无"
	},
	{
		key: "2",
		field: "数据项-1",
		mapping: "data1",
		result: "匹配成功"
	},
	{
		key: "3",
		field: "数据项-2",
		mapping: "data2",
		result: "匹配成功"
	}
];

const columns: TableProps<IDataType>["columns"] = [
	{
		title: "字段",
		dataIndex: "field",
		key: "field"
	},
	{
		title: "映射",
		dataIndex: "mapping",
		key: "mapping"
	},
	{
		title: "状态",
		dataIndex: "result",
		key: "result",
		render: (value) => (
			<div className="flex items-center gap-2">
				<Badge color={"magenta"} />
				<div>{value}</div>
			</div>
		)
	}
];

const DataShow = () => {
	return (
		<>
			<div className="flex items-center gap-2">
				<Button icon={<JIcon icon={<DocumentAdd />} />}>{"导入(json / txt)"}</Button>
				<Button icon={<JIcon icon={<DocumentDownload />} />}>下载</Button>
				<Tooltip title="点击【下载】查看完整数据">
					<div>
						<JIcon icon={<HelpCircleOutline />} size={22} />
					</div>
				</Tooltip>
			</div>
		</>
	);
};

const DataMapAndShow = () => {
	return (
		<Steps
			direction="vertical"
			progressDot
			current={0}
			items={[
				{
					title: "数据映射",
					description: (
						<Table
							dataSource={dataSource}
							columns={columns}
							pagination={false}
							rowClassName={(_, i) => (i % 2 !== 1 ? "bg-[#141414]" : "bg-[#1D1D1D]")}
						/>
					)
				},
				{
					title: "数据内容",
					description: <DataShow />
				}
			]}
		/>
	);
};

export default DataMapAndShow;
