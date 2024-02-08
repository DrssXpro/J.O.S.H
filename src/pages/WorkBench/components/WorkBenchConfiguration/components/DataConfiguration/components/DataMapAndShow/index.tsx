import { useState } from "react";
import { Badge, Button, Steps, Table, TableProps, Tooltip, Upload, UploadProps, message } from "antd";
import { DocumentAdd, DocumentDownload } from "@ricons/carbon";
import { HelpCircleOutline } from "@ricons/ionicons5";
import JIcon from "@/components/JIcon";
import JCodeMirror from "@/components/JCodeMirror";
import { FileTypeEnum } from "@/types/FileTypes";
import { downloadTextFile, readFile } from "@/utils/fileUtils";

const DataShow = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [code, setCode] = useState("");

	const uploadProps: UploadProps = {
		showUploadList: false,
		customRequest(options) {
			const { file } = options;
			readFile(file as File)
				.then((res) => {
					// data = JSON.parse(res);
					setCode(res);
					messageApi.success("导入数据成功!");
				})
				.catch(() => {
					messageApi.error("导入数据失败!");
				});
		},
		beforeUpload(file) {
			const type = file.type;
			const size = file.size;
			if (size > 1024 * 1024) {
				messageApi.warning(`文件超出 1M 限制，请重新上传!`);
				return false;
			}
			if (type !== FileTypeEnum.JSON && type !== FileTypeEnum.TXT) {
				messageApi.warning("文件格式不符合，请重新上传!");
				return false;
			}
			return true;
		}
	};

	const downloadData = () => {
		try {
			downloadTextFile(code, undefined, "json");
			messageApi.success("下载成功!");
		} catch (error) {
			messageApi.error("下载失败，数据错误!");
		}
	};

	return (
		<>
			<div className="flex items-center gap-2">
				<Upload {...uploadProps}>
					<Button icon={<JIcon icon={<DocumentAdd />} />}>{"导入(json / txt)"}</Button>
				</Upload>

				<Button icon={<JIcon icon={<DocumentDownload />} />} onClick={downloadData}>
					下载
				</Button>
				<Tooltip title="点击【下载】查看完整数据">
					<div>
						<JIcon icon={<HelpCircleOutline />} size={22} />
					</div>
				</Tooltip>
			</div>
			<div className="my-2">
				<JCodeMirror code={code} lan="json" disabled={true} height={400} />
			</div>
			{contextHolder}
		</>
	);
};

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

const DataMapAndShow = () => {
	return (
		<Steps
			direction="vertical"
			progressDot
			current={1}
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
