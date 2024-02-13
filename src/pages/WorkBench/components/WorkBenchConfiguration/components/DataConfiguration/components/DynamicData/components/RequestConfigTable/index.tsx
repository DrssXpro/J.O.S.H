import { Button, Input, Table, TableColumnsType, Tabs, TabsProps } from "antd";

interface IDataType {
	key: string;
	Key: string;
	value: string;
	result: boolean;
}

const dataSource: IDataType[] = [
	{
		key: "1",
		Key: "",
		value: "",
		result: true
	},
	{
		key: "2",
		Key: "",
		value: "",
		result: true
	}
];

const columns: TableColumnsType<IDataType> = [
	{
		title: "Key",
		dataIndex: "Key",
		key: "Key",
		render: (text) => <Input value={text} placeholder="请输入" />
	},
	{
		title: "Value",
		dataIndex: "Value",
		key: "Value",
		render: (text) => <Input value={text} placeholder="请输入" />
	},
	{
		title: "操作",
		dataIndex: "operator",
		key: "operator",
		width: 120,
		render: () => (
			<div className="flex items-center gap-2">
				<Button type="primary" ghost>
					+
				</Button>
				<Button danger ghost>
					-
				</Button>
			</div>
		)
	},
	{
		title: "结果",
		dataIndex: "result",
		key: "result",
		width: 120,
		render: () => <div>格式通过</div>
	}
];

const ConfigTable = () => {
	return (
		<Table
			columns={columns}
			dataSource={dataSource}
			indentSize={1}
			pagination={false}
			rowClassName={"bg-[#1D1D1D]"}
		/>
	);
};

const items: TabsProps["items"] = [
	{
		key: "1",
		label: "Params",
		children: <ConfigTable />
	},
	{
		key: "2",
		label: "Body",
		children: "Content of Tab Pane 2"
	},
	{
		key: "3",
		label: "Header",
		children: "Content of Tab Pane 3"
	}
];

const RequestConfigTable = () => {
	return (
		<>
			<Tabs items={items} />
		</>
	);
};

export default RequestConfigTable;
