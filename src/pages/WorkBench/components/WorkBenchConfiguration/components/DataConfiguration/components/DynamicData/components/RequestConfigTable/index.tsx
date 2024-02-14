import { useState } from "react";
import { Button, Input, Table, TableColumnsType, Tag } from "antd";
import { nanoid } from "nanoid";

interface IDataType {
	id: string;
	key: string;
	value: string;
	result: boolean;
}

interface IRequestConfigTableProps {
	disabled?: boolean;
}

const dataSource: IDataType[] = [{ id: nanoid(5), key: "", value: "", result: true }];

const RequestConfigTable = (props: IRequestConfigTableProps) => {
	const { disabled = false } = props;
	const [list, setList] = useState(dataSource);

	const addItem = (pos: number) => {
		const newList = [...list];
		const item = { id: nanoid(5), key: "", value: "", result: true };
		newList.splice(pos, 0, item);
		setList([...newList]);
	};

	const removeItem = (id: string) => {
		if (list.length === 1) return;
		setList(list.filter((item) => item.id !== id));
	};

	const changeValue = (index: number, value: string, type: "key" | "value") => {
		const tempList = [...list];
		const item = tempList[index];
		type === "value" ? (item.value = value) : (item.key = value);
		setList(tempList);
	};

	const columns: TableColumnsType<IDataType> = [
		{
			title: "Key",
			dataIndex: "Key",
			key: "Key",
			align: "center",
			render: (text, _, index) => (
				<Input
					value={text}
					placeholder="请输入内容"
					disabled={disabled}
					onChange={(e) => {
						changeValue(index, e.target.value, "key");
					}}
				/>
			)
		},
		{
			title: "Value",
			dataIndex: "Value",
			key: "Value",
			align: "center",
			render: (text, _, index) => (
				<Input
					value={text}
					placeholder="请输入内容"
					disabled={disabled}
					onChange={(e) => {
						changeValue(index, e.target.value, "value");
					}}
				/>
			)
		},
		{
			title: "操作",
			dataIndex: "operator",
			key: "operator",
			align: "center",
			width: 100,
			render: (_, { id }, index) => (
				<div className="flex items-center gap-2">
					<Button type="primary" ghost size="small" disabled={disabled} onClick={() => addItem(index + 1)}>
						+
					</Button>
					<Button danger ghost size="small" disabled={disabled} onClick={() => removeItem(id)}>
						-
					</Button>
				</div>
			)
		},
		{
			title: "结果",
			dataIndex: "result",
			key: "result",
			align: "center",
			width: 120,
			render: (text) => (text ? <Tag color="processing">格式通过</Tag> : <Tag color="error">格式错误</Tag>)
		}
	];
	return (
		<Table
			bordered
			rowKey={"id"}
			columns={columns}
			dataSource={list}
			indentSize={1}
			pagination={false}
			rowClassName={"bg-[#1D1D1D]"}
		/>
	);
};

export default RequestConfigTable;
