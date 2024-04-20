import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Divider, Modal, Steps, Table, TableProps, Tag, Tooltip, Typography } from "antd";
import {
	HiOutlineDocumentDownload,
	HiOutlineFilter,
	HiOutlineDocumentReport,
	HiOutlinePencilAlt
} from "react-icons/hi";
import { IoHelpCircleOutline } from "react-icons/io5";
import JCodeMirror from "@/components/JCodeMirror";
import { downloadTextFile } from "@/utils/fileUtils";
import JEditCode from "@/components/JChartConfiguration/JEditCode";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { ChartFrameEnum } from "@/materials/types";
import useFilter from "./hooks/useFilter.hook";
import { safeJSONParse } from "@/utils/utils";

// 数据映射 table 结构
interface IDataType {
	key: string;
	field: string;
	mapping: string;
	result: DataResultEnum;
}

// 数据映射匹配结果
enum DataResultEnum {
	NULL = 0,
	SUCCESS = 1,
	FAILURE = 2
}

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
				{value === 0 ? "无" : <div>匹配{value === 1 ? "成功" : "失败"}</div>}
			</div>
		)
	}
];

const DataMapAndShow = () => {
	const { requestGlobalConfig, updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	const { isOpenFilter, filterCode, filterError, showFilter, filterRes, sourceData, setIsOpenFilter, setFilterCode } =
		useFilter(component, requestGlobalConfig);
	// 图表数据源展示
	const [code, setCode] = useState(component.option.dataset || "此组件无数据源");
	// 编辑图表数据源 modal
	const [isOpenEditModal, setIsOpenEditModal] = useState(false);
	const [editCode, setEditCode] = useState(code);

	const isCharts = useMemo(() => component.chartConfig.chartFrame === ChartFrameEnum.ECHARTS, [component]);

	const isNotData = useMemo(() => {
		return (
			component.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
			typeof component?.option?.dataset === "undefined"
		);
	}, [component]);

	// 针对 dataset 图表显示映射
	const dimensionsAndSource = useMemo<IDataType[]>(() => {
		if (!component.option.dataset) return [];
		const dimensions = component.option.dataset.dimensions;
		if (!dimensions) return [];
		return dimensions.map((i: string, index: number) => {
			return index === 0
				? {
						key: i,
						// 字段
						field: "通用标识",
						// 映射
						mapping: i,
						// 结果
						result: DataResultEnum.NULL
					}
				: {
						key: i,
						field: `数据项-${index}`,
						mapping: i,
						result: matchingHandle(i)
					};
		});
	}, [component]);

	useEffect(() => {
		// 支持 dataset 图表，设置数据展示并计算数据映射
		setCode(component.option.dataset ? component.option.dataset : "此组件无数据源");
	}, [component.option.dataset]);

	// 处理映射列表状态结果
	function matchingHandle(mapping: string) {
		let res = DataResultEnum.SUCCESS;
		for (let i = 0; i < code.length; i++) {
			if (code[i][mapping as any] === undefined) {
				res = DataResultEnum.FAILURE;
				return res;
			}
		}
		return DataResultEnum.SUCCESS;
	}

	// 下载数据形成文件
	const downloadData = () => {
		try {
			downloadTextFile(JSON.stringify(code, null, 2), undefined, "json");
			window.$message.success("下载成功!");
		} catch (error) {
			window.$message.error("下载失败，数据错误!");
		}
	};

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
							dataSource={dimensionsAndSource}
							columns={columns}
							pagination={false}
							rowClassName={(_, i) => (i % 2 !== 1 ? "bg-[#141414]" : "bg-[#1D1D1D]")}
						/>
					)
				},
				{
					title: "数据过滤",
					description: (
						<>
							<div className="flex flex-col gap-2">
								<Typography.Text type="secondary">
									过滤器默认处理接口返回值的「data」字段
								</Typography.Text>
								{component.filter ? (
									<>
										<div className="border-1 border-solid border-[#303030] p-2">
											<JEditCode
												disabled
												code={component.filter}
												height={100}
												headCodeTooltip={
													<>
														<span className="text-[#569cd6]">function</span>&nbsp;
														<span className="text-[#dcdcaa]">filter</span>(
														<span className="text-[#9cdcfe]">data</span>
														,&nbsp;
														<span className="text-[#9cdcfe]">res</span>)&nbsp;
														{"{"}
													</>
												}
												tailCodeTooltip={<>{"}"}</>}
											/>
										</div>
										<div className="flex flex-row-reverse gap-2">
											<Button
												onClick={() => {
													updateChartConfig(chartIndex, "filter", null, undefined);
												}}
											>
												删除
											</Button>
											<Button type="primary" ghost onClick={() => setIsOpenFilter(true)}>
												编辑
											</Button>
										</div>
									</>
								) : (
									<Button icon={<HiOutlineFilter />} onClick={() => setIsOpenFilter(true)}>
										新增过滤器
									</Button>
								)}
							</div>
							<Modal
								open={isOpenFilter}
								width={1200}
								closable={false}
								styles={{ header: { background: "none" } }}
								title="过滤器：函数编辑器"
								centered
								footer={
									<div className="w-full h-10 flex items-center justify-between">
										<div className="flex items-center justify-center">
											<Tag icon={<HiOutlineDocumentReport size={14} />} color="processing">
												规则
											</Tag>
											<Typography.Text type="secondary">
												过滤器默认处理接口返回值的「data」字段
											</Typography.Text>
										</div>
										<div className="flex items-center justify-center">
											<Button onClick={() => setIsOpenFilter(false)}>取消</Button>
											<Button
												type="primary"
												onClick={() => {
													if (filterError) {
														window.$message.error("过滤函数错误，无法进行保存！");
														return;
													}
													updateChartConfig(chartIndex, "filter", null, filterCode);
													setIsOpenFilter(false);
												}}
											>
												保存
											</Button>
										</div>
									</div>
								}
							>
								<div className="w-full h-[70vh] flex gap-5">
									<div className="flex-1 h-[100%]">
										<JEditCode
											code={filterCode}
											codeChange={(code) => setFilterCode(code)}
											headCodeTooltip={
												<>
													<span className="text-[#569cd6]">function</span>&nbsp;
													<span className="text-[#dcdcaa]">filter</span>(
													<span className="text-[#9cdcfe]">data</span>
													,&nbsp;
													<span className="text-[#9cdcfe]">res</span>)&nbsp;
													{"{"}
												</>
											}
											tailCodeTooltip={<>{"}"}</>}
										/>
									</div>
									<Divider type="vertical" style={{ height: "100%" }} />
									<div className="flex-1 h-full overflow-y-scroll">
										<div className="flex flex-col gap-2 p-5 mb-4 bg-[#212122] rounded">
											<Typography.Text type="secondary">默认过滤数据(data)：</Typography.Text>
											{sourceData ? (
												<JCodeMirror
													code={JSON.stringify(sourceData.data, null, 1)}
													lan="json"
													disabled
													height={150}
												/>
											) : (
												<div>暂无</div>
											)}
										</div>
										<div className="flex flex-col gap-2 p-5 mb-4 bg-[#212122] rounded">
											<Typography.Text type="secondary">接口返回数据(res)：</Typography.Text>
											{sourceData ? (
												<JCodeMirror
													code={JSON.stringify(sourceData, null, 1)}
													lan="json"
													disabled
													height={150}
												/>
											) : (
												<div>暂无</div>
											)}
										</div>
										<div className="flex flex-col gap-2 p-5 bg-[#212122] rounded">
											<Typography.Text type="secondary">过滤器结果：</Typography.Text>
											{filterRes ? (
												filterError ? (
													<div>{filterRes}</div>
												) : (
													<JCodeMirror
														code={JSON.stringify(filterRes, null, 1)}
														lan="json"
														disabled
														height={150}
													/>
												)
											) : (
												<div>暂无</div>
											)}
										</div>
									</div>
								</div>
							</Modal>
						</>
					)
				},
				{
					title: "数据内容",
					description: (
						<>
							<div className="flex items-center gap-2">
								<Button
									icon={<HiOutlinePencilAlt />}
									disabled={isNotData}
									onClick={() => {
										setEditCode(code);
										setIsOpenEditModal(true);
									}}
								>
									编辑
								</Button>
								<Button
									icon={<HiOutlineDocumentDownload />}
									disabled={isNotData}
									onClick={downloadData}
								>
									下载
								</Button>
								<Tooltip title="点击【下载】查看完整数据">
									<div className="flex items-center justify-center">
										<IoHelpCircleOutline size={20} />
									</div>
								</Tooltip>
							</div>
							<div className="my-2 border-1 border-solid border-[#303030]">
								<JCodeMirror
									code={typeof code === "string" ? code : JSON.stringify(code, null, 2)}
									lan="json"
									disabled={true}
									height={400}
								/>
							</div>
							<Modal
								open={isOpenEditModal}
								width="50%"
								title="编辑数据源"
								onCancel={() => setIsOpenEditModal(false)}
								footer={
									<div className="flex flex-row-reverse gap-2">
										<Button
											onClick={() => {
												updateChartConfig(
													chartIndex,
													"option",
													"dataset",
													safeJSONParse(editCode)
												);
												setIsOpenEditModal(false);
												window.$message.success("修改成功！");
											}}
											type="primary"
										>
											保存
										</Button>
										<Button onClick={() => setIsOpenEditModal(false)}>取消</Button>
									</div>
								}
							>
								<div className="my-4 border-1 border-solid border-[#303030]">
									<JCodeMirror
										code={
											typeof editCode === "string" ? editCode : JSON.stringify(editCode, null, 2)
										}
										lan="json"
										height={600}
										changeCode={(code) => {
											setEditCode(code);
										}}
									/>
								</div>
							</Modal>
						</>
					)
				}
			].filter((item) => {
				if (item.title === "数据过滤" && !showFilter) return false;
				if (item.title === "数据映射" && !isCharts) return false;
				return true;
			})}
		/>
	);
};

export default DataMapAndShow;
