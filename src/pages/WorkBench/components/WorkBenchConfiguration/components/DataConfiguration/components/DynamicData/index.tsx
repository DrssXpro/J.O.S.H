import { Button, Card, Divider, Input, InputNumber, Modal, Select, Tag, Typography } from "antd";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { Flash, Pulse, Pencil } from "@ricons/ionicons5";
import JIcon from "@/components/JIcon";
import DataMapAndShow from "../DataMapAndShow";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { selectTimeOptions, selectTypeOptions } from "@/types/HttpTypes";
import RequestConfigTable from "./components/RequestConfigTable";

const DynamicData = () => {
	const modalRef = useRef<any>(null);
	return (
		<>
			<Card bodyStyle={{ padding: "20px 10px", background: "#232324" }} className="relative">
				<JSettingBox name="请求配置">
					<div className="grid grid-cols-2 gap-2">
						<JSettingItem text="类型">
							<Button type="primary" ghost block>
								普通请求
							</Button>
						</JSettingItem>
						<JSettingItem text="方式">
							<Input value={"get"} disabled />
						</JSettingItem>
						<JSettingItem text="组件间隔">
							<Input suffix="秒" value={"暂无"} disabled />
						</JSettingItem>
						<JSettingItem text="全局间隔（默认）">
							<Input suffix="秒" value={"30"} disabled />
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="源地址">
					<Input prefix={<JIcon icon={<Pulse />} />} value={"暂无"} disabled />
				</JSettingBox>
				<JSettingBox name="组件地址">
					<Input prefix={<JIcon icon={<Flash />} />} value={"暂无"} disabled />
				</JSettingBox>
				<div
					className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer opacity-0 border-[#1668DC] border-1 hover:opacity-100 transition-all duration-500"
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
					<Button icon={<JIcon icon={<Flash />} />} type="primary" ghost block>
						发送请求
					</Button>
				</JSettingBox>
			</div>

			<DataMapAndShow />

			{/* 编辑数据 Modal */}
			<DynamicDataModal ref={modalRef} />
		</>
	);
};

const DynamicDataModal = forwardRef((_, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const [editPublic, setEditPublic] = useState(false);
	useImperativeHandle(ref, () => {
		return {
			setIsOpen
		};
	});
	return (
		<Modal
			open={isOpen}
			width={900}
			closable={false}
			styles={{ header: { background: "none" } }}
			footer={
				<div className="w-full h-10 flex items-center justify-between">
					<Typography.Text>「柱状图」</Typography.Text>

					<div className="flex items-center justify-center">
						<Button onClick={() => setIsOpen(false)}>取消</Button>
						<Button type="primary" onClick={() => setIsOpen(false)}>
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
							<Input placeholder="例: http://127.0.0.1/" disabled={!editPublic} />
						</JSettingItem>
						<JSettingItem text="更新间隔, 为 0 只会初始化">
							<InputNumber
								disabled={!editPublic}
								defaultValue={30}
								addonAfter={
									<Select
										disabled={!editPublic}
										defaultValue={selectTimeOptions[0].value}
										options={selectTimeOptions}
									></Select>
								}
							/>
						</JSettingItem>
						{!editPublic && (
							<Button
								type="primary"
								icon={<JIcon icon={<Pencil />} />}
								onClick={() => setEditPublic(true)}
								ghost
							>
								编辑配置
							</Button>
						)}
					</div>
				</JSettingBox>
			</Card>

			<Divider />
			<JSettingBox name="地址">
				<div className="grid gap-3" style={{ gridTemplateColumns: "6fr 2fr" }}>
					<JSettingItem text="请求方式 & URL 地址">
						<Input
							placeholder="请输入地址（去除前置 URL）"
							addonBefore={
								<Select
									defaultValue={selectTypeOptions[0].value}
									options={selectTypeOptions}
									className="w-20"
								/>
							}
						/>
					</JSettingItem>
					<JSettingItem text="更新间隔, 为 0 只会初始化">
						<InputNumber
							placeholder="默认使用全局数据"
							addonAfter={
								<Select defaultValue={selectTimeOptions[0].value} options={selectTimeOptions} />
							}
						/>
					</JSettingItem>
				</div>
			</JSettingBox>
			<RequestConfigTable />
		</Modal>
	);
});

export default DynamicData;
