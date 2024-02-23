import { useEffect, useState } from "react";
import { Button, Input, Table, TableColumnsType, Tag } from "antd";
import { nanoid } from "nanoid";
import { RequestParamsObjType } from "@/types/HttpTypes";
import { produce } from "immer";

interface IDataType {
	id: string;
	key: string;
	value: string;
	result: boolean;
}

interface IRequestConfigTableProps {
	disabled?: boolean;
	dataParams: RequestParamsObjType;
	updateParams: (value: RequestParamsObjType) => void;
}

const RequestConfigTable = (props: IRequestConfigTableProps) => {
	const { disabled = false, dataParams, updateParams } = props;
	const [list, setList] = useState<IDataType[]>([]);

	useEffect(() => {
		let arr: IDataType[] = [];

		Object.entries(dataParams).forEach(([key, value]) => {
			arr.push({
				id: nanoid(5),
				key,
				value,
				result: true
			});
		});
		if (!arr.length) arr = [{ id: nanoid(5), key: "", value: "", result: true }];
		setList([...arr]);
	}, [dataParams]);

	const handleBlur = () => {
		let successNum = 0;
		setList(
			produce((draft) => {
				draft.forEach((item) => {
					if ((item.key !== "" && item.value == "") || (item.key === "" && item.value !== "")) {
						// 错误
						item.result = false;
					} else {
						// 正确
						successNum++;
						item.result = true;
					}
				});
				if (successNum === draft.length) {
					updateParams(
						draft.reduce<RequestParamsObjType>((prev, current) => {
							prev[current.key] = current.value;
							return prev;
						}, {})
					);
				}
			})
		);
	};

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

	const changeValue = (index: number, val: string, type: "key" | "value") => {
		setList(
			produce((draft) => {
				type === "value" ? (draft[index].value = val) : (draft[index].key = val);
			})
		);
	};

	const columns: TableColumnsType<IDataType> = [
		{
			title: "Key",
			dataIndex: "Key",
			key: "Key",
			align: "center",
			render: (_text, _record, index) => {
				return (
					<Input
						value={list[index].key}
						placeholder="请输入内容"
						disabled={disabled}
						onBlur={handleBlur}
						onChange={(e) => {
							changeValue(index, e.target.value, "key");
						}}
					/>
				);
			}
		},
		{
			title: "Value",
			dataIndex: "Value",
			key: "Value",
			align: "center",
			render: (_text, _record, index) => (
				<Input
					value={list[index].value}
					placeholder="请输入内容"
					disabled={disabled}
					onBlur={handleBlur}
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
				<div className="flex items-center justify-center gap-2">
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
			size="small"
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
