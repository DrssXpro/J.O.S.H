import { useState } from "react";
import {
	Badge,
	Button,
	Divider,
	Modal,
	Steps,
	Table,
	TableProps,
	Tag,
	Tooltip,
	Typography,
	Upload,
	UploadProps,
	message
} from "antd";
import { DocumentAdd, Filter, DocumentDownload, Document } from "@ricons/carbon";
import { HelpCircleOutline } from "@ricons/ionicons5";
import JIcon from "@/components/JIcon";
import JCodeMirror from "@/components/JCodeMirror";
import { FileTypeEnum } from "@/types/FileTypes";
import { downloadTextFile, readFile } from "@/utils/fileUtils";

const DataFilber = () => {
	const [isOpen, setIsOpen] = useState(false);
	const code = `return data`;
	return (
		<>
			<div className="flex flex-col gap-2">
				<Typography.Text type="secondary">过滤器默认处理接口返回值的「data」字段</Typography.Text>
				<Button icon={<JIcon icon={<Filter />} size={18} />} onClick={() => setIsOpen(true)}>
					新增过滤器
				</Button>
			</div>
			<Modal
				open={isOpen}
				width={1200}
				closable={false}
				styles={{ header: { background: "none" } }}
				title="过滤器：函数编辑器"
				centered
				footer={
					<div className="w-full h-10 flex items-center justify-between">
						<div className="flex items-center justify-center">
							<Tag icon={<JIcon icon={<Document />} />} color="processing">
								规则
							</Tag>
							<Typography.Text type="secondary">过滤器默认处理接口返回值的「data」字段</Typography.Text>
						</div>
						<div className="flex items-center justify-center">
							<Button onClick={() => setIsOpen(false)}>取消</Button>
							<Button type="primary" onClick={() => setIsOpen(false)}>
								保存
							</Button>
						</div>
					</div>
				}
			>
				<div className="w-full h-[70vh] flex gap-5">
					<div className="flex-1 h-[100%]">
						<div
							color="processing"
							className="mb-2 font-semibold text-lg border-1 inline-block px-1"
							style={{
								borderColor: "rgba(112, 192, 232, 0.3)",
								fontFamily:
									'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
							}}
						>
							<span className="text-[#569cd6]">function</span>&nbsp;
							<span className="text-[#dcdcaa]">filter</span>(<span className="text-[#9cdcfe]">data</span>
							,&nbsp;
							<span className="text-[#9cdcfe]">res</span>)&nbsp;
							{"{"}
						</div>
						<JCodeMirror code={code} lan="javascript" height={440} />
						<div
							color="processing"
							className="mt-2 text-base border-1 px-1 inline-block"
							style={{
								borderColor: "rgba(112, 192, 232, 0.3)",
								fontFamily:
									'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
							}}
						>
							{"}"}
						</div>
					</div>
					<Divider type="vertical" style={{ height: "100%" }} />
					<div className="flex-1">
						<div className="flex items-center gap-2 p-5 mb-4 bg-[#212122] rounded">
							<Typography.Text type="secondary">默认过滤数据(data)：</Typography.Text>
							<div>暂无</div>
						</div>
						<div className="flex items-center gap-2 p-5 mb-4 bg-[#212122] rounded">
							<Typography.Text type="secondary">接口返回数据(res)：</Typography.Text>
							<div>暂无</div>
						</div>
						<div className="flex items-center gap-2 p-5 mb-4 bg-[#212122] rounded">
							<Typography.Text type="secondary">过滤器结果：</Typography.Text>
							<div>暂无</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

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
			current={4}
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
					title: "数据过滤",
					description: <DataFilber />
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
