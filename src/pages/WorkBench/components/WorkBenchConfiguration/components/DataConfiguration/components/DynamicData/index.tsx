import { FC, forwardRef, memo, useImperativeHandle, useRef, useState } from "react";
import { Button, Card, Divider, Input, InputNumber, Modal, Select, Tag, Typography } from "antd";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { IoFlash, IoPulse, IoPencil, IoChevronUpOutline } from "react-icons/io5";
import DataMapAndShow from "../DataMapAndShow";
import { SelectHttpTimeNameObj, selectTimeOptions, selectTypeOptions } from "@/types/HttpTypes";
import NormalRequestConfig from "./components/NormalRequestConfig";
import PublicRequestConfig from "./components/PublicRequestConfig";
import useChartStore from "@/store/chartStore/chartStore";
import { customizeHttp } from "@/service/http";
import { newFunctionHandle } from "@/utils/utils";
import { DataConfigProps } from "../..";
import useStoreSelector from "@/hooks/useStoreSelector";

const DynamicData = memo((props: DataConfigProps) => {
	const { chartIndex, chartRequestConfig, chartFilter, update } = props;
	const modalRef = useRef<any>(null);
	const [requestLoading, setRequestLoading] = useState(false);
	const { requestGlobalConfig } = useChartStore(useStoreSelector(["requestGlobalConfig"]));
	// 全局请求配置
	const {
		requestOriginUrl,
		requestInterval: GlobalRequestInterval,
		requestIntervalUnit: GlobalRequestIntervalUnit
	} = requestGlobalConfig;

	const handleSendRequest = async () => {
		if (!chartRequestConfig) return;
		try {
			setRequestLoading(true);
			const res = await customizeHttp(chartRequestConfig, requestGlobalConfig);
			setRequestLoading(false);
			if (res) {
				const { data } = res;
				if (!data) {
					window.$message.warning("您的数据不符合默认格式！");
					return;
				}
				// 获取到数据，设置图表展示
				update(chartIndex, "option", "dataset", chartFilter ? newFunctionHandle(data, res, chartFilter) : data);
				window.$message.success("获取数据成功！");
				return;
			}
			window.$message.warning("没有拿到返回值，请检查接口！");
		} catch (error) {
			console.error(error);
			window.$message.error("数据异常，请检查参数！");
			setRequestLoading(false);
		}
	};

	return (
		<>
			<Card bodyStyle={{ padding: "20px 10px", background: "#232324" }} className="relative">
				<JSettingBox name="请求配置">
					<div className="config-items-layout">
						<JSettingItem text="类型">
							<Button type="primary" ghost block>
								普通请求
							</Button>
						</JSettingItem>
						<JSettingItem text="方式">
							<Input value={chartRequestConfig.requestHttpType || "暂无"} disabled />
						</JSettingItem>
						<JSettingItem text="组件间隔">
							<Input
								suffix={SelectHttpTimeNameObj[chartRequestConfig.requestIntervalUnit]}
								value={chartRequestConfig.requestInterval || "暂无"}
								disabled
							/>
						</JSettingItem>
						<JSettingItem text="全局间隔（默认）">
							<Input
								suffix={SelectHttpTimeNameObj[GlobalRequestIntervalUnit]}
								value={GlobalRequestInterval || "暂无"}
								disabled
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="源地址">
					<Input prefix={<IoPulse />} value={requestOriginUrl || "暂无"} disabled />
				</JSettingBox>
				<JSettingBox name="组件地址">
					<Input prefix={<IoFlash />} value={chartRequestConfig.requestUrl || "暂无"} disabled />
				</JSettingBox>
				<div
					className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer opacity-0 border-[#1668DC] border-1 border-solid hover:opacity-100 transition-all duration-500"
					style={{ backdropFilter: "blur(3px)" }}
				>
					<Button
						type="primary"
						onClick={() => {
							modalRef.current.setIsOpen(true);
						}}
					>
						编辑配置
					</Button>
				</div>
			</Card>
			<div className="mt-5">
				<JSettingBox name="测试">
					<Button
						icon={<IoFlash />}
						type="primary"
						ghost
						block
						onClick={handleSendRequest}
						loading={requestLoading}
					>
						发送请求
					</Button>
				</JSettingBox>
			</div>

			<DataMapAndShow {...props} />

			{/* 编辑数据 Modal */}
			<DynamicDataModal
				ref={modalRef}
				sendRequest={handleSendRequest}
				chartIndex={chartIndex}
				update={update}
				chartRequestConfig={chartRequestConfig}
			/>
		</>
	);
});

const DynamicDataModal: FC<{
	sendRequest: () => void;
	ref: any;
	chartRequestConfig: Pick<DataConfigProps, "chartRequestConfig">["chartRequestConfig"];
	chartIndex: number;
	update: Pick<DataConfigProps, "update">["update"];
}> = forwardRef((props, ref) => {
	const { sendRequest, chartRequestConfig, chartIndex, update } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [hideTable, setHideTable] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [editPublic, setEditPublic] = useState(false);
	const { requestGlobalConfig, updateGlobalRequestConfig } = useChartStore(
		useStoreSelector(["requestGlobalConfig", "updateGlobalRequestConfig"])
	);
	const { requestInterval, requestIntervalUnit, requestHttpType, requestUrl } = chartRequestConfig;

	useImperativeHandle(ref, () => {
		return {
			setIsOpen
		};
	});
	return (
		<Modal
			open={isOpen}
			width={950}
			closable={false}
			styles={{ header: { background: "none" } }}
			footer={
				<div className="w-full h-10 flex items-center justify-between">
					<Typography.Text>「柱状图」</Typography.Text>

					<div className="flex items-center justify-center">
						<Button
							onClick={() => {
								setEditPublic(false);
								setIsOpen(false);
							}}
						>
							取消
						</Button>
						<Button
							type="primary"
							onClick={() => {
								setEditPublic(false);
								setIsOpen(false);
								sendRequest();
							}}
						>
							保存 & 发送请求
						</Button>
					</div>
				</div>
			}
		>
			<Card
				bodyStyle={{ padding: "20px 10px", background: "#232324" }}
				className="hover:border-[#1668DC] transition-all"
			>
				<Tag color="processing" className="inline-block mb-4">
					<div className="p-2 text-sm">全局公共配置</div>
				</Tag>
				<JSettingBox name="服务">
					<div className="grid gap-3" style={{ gridTemplateColumns: "5fr 2fr 1fr" }}>
						<JSettingItem text="前置 URL">
							<Input
								placeholder="例: http://127.0.0.1/"
								disabled={!editPublic}
								value={requestGlobalConfig.requestOriginUrl}
								onChange={(e) => {
									updateGlobalRequestConfig("requestOriginUrl", e.target.value);
								}}
							/>
						</JSettingItem>
						<JSettingItem text="更新间隔, 为 0 只会初始化">
							<InputNumber
								disabled={!editPublic}
								value={requestGlobalConfig.requestInterval}
								onChange={(val) => {
									updateGlobalRequestConfig("requestInterval", val);
								}}
								addonAfter={
									<Select
										disabled={!editPublic}
										options={selectTimeOptions}
										value={requestGlobalConfig.requestIntervalUnit}
										onChange={(val) => {
											updateGlobalRequestConfig("requestIntervalUnit", val);
										}}
									></Select>
								}
							/>
						</JSettingItem>
						{!editPublic && (
							<Button type="primary" icon={<IoPencil />} onClick={() => setEditPublic(true)} ghost>
								编辑配置
							</Button>
						)}
					</div>
				</JSettingBox>
				<div style={{ display: hideTable ? "block" : "none" }}>
					<PublicRequestConfig isEdit={!editPublic} />
				</div>
				<div
					className={`flex items-center justify-center cursor-pointer transform ${
						!hideTable ? "rotate-180" : ""
					}`}
					onClick={() => setHideTable(!hideTable)}
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<IoChevronUpOutline size={25} color={isHover ? "#1668DC" : ""} />
				</div>
			</Card>

			<Divider />
			<Card
				bodyStyle={{ padding: "20px 10px", background: "#232324" }}
				className="hover:border-[#1668DC] transition-all"
			>
				<Tag color="processing" className="inline-block mb-4">
					<div className="p-2 text-sm">接口 API 配置</div>
				</Tag>
				<JSettingBox name="地址">
					<div className="grid gap-3" style={{ gridTemplateColumns: "6fr 2fr" }}>
						<JSettingItem text="请求方式 & URL 地址">
							<Input
								value={requestUrl}
								placeholder="请输入地址（去除前置 URL）"
								onChange={(e) => {
									update(chartIndex, "request", "requestUrl", e.target.value);
								}}
								prefix={
									requestGlobalConfig.requestOriginUrl ? (
										<div className="flex items-center">
											<Typography.Text>{requestGlobalConfig.requestOriginUrl}</Typography.Text>
											<Divider type="vertical" />
										</div>
									) : undefined
								}
								addonBefore={
									<Select
										className="w-20"
										value={requestHttpType}
										options={selectTypeOptions}
										onChange={(val) => {
											update(chartIndex, "request", "requestHttpType", val);
										}}
									/>
								}
							/>
						</JSettingItem>
						<JSettingItem text="更新间隔, 为 0 只会初始化">
							<InputNumber
								placeholder="默认使用全局数据"
								value={requestInterval}
								onChange={(val) => {
									update(chartIndex, "request", "requestInterval", val);
								}}
								addonAfter={
									<Select
										className="w-15"
										value={requestIntervalUnit}
										options={selectTimeOptions}
										onChange={(val) => {
											update(chartIndex, "request", "requestIntervalUnit", val);
										}}
									/>
								}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
				<NormalRequestConfig chartIndex={chartIndex} request={chartRequestConfig} />
			</Card>
		</Modal>
	);
});

export default DynamicData;
