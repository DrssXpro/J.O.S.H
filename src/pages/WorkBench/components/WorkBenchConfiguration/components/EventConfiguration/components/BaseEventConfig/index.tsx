import { useEffect, useMemo, useState } from "react";
import { Button, Divider, Modal, Tabs, Tag, Typography, message } from "antd";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JCodeMirror from "@/components/JCodeMirror";
import JIcon from "@/components/JIcon";
import { Document, Pencil } from "@ricons/ionicons5";
import { computedBaseEventCode } from "../codeConfig";
import { BaseEvent, ErrorTypeName, VaildError } from "@/types/EventTypes";
import JEditCode from "@/components/JChartConfiguration/JEditCode";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";

const EventTypeName = {
	[BaseEvent.ON_CLICK]: "单击",
	[BaseEvent.ON_DBL_CLICK]: "双击",
	[BaseEvent.ON_MOUSE_ENTER]: "鼠标进入",
	[BaseEvent.ON_MOUSE_LEAVE]: "鼠标移出"
};

const BaseEventConfig = () => {
	const [messageApi, contextHolder] = message.useMessage();
	const [errorInfo, setErrorInfo] = useState({
		[VaildError.ERROR_FN]: "",
		[VaildError.ERROR_INFO]: "",
		[VaildError.ERROR_STACK]: ""
	});
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	const [baseEvent, setBaseEvent] = useState({
		...component.events.baseEvent
	});
	const [isOpen, setIsOpen] = useState(false);

	// 组件图表绑定事件代码展示
	const showCode = useMemo(() => {
		const codes = Object.entries(component.events.baseEvent).map(([, body]) => (body ? body : ""));
		return computedBaseEventCode(codes);
	}, [component.events.baseEvent]);

	// 处理编写的事件函数错误信息上报展示
	useEffect(() => {
		let eventN = "",
			message = "",
			name = "";
		Object.entries(baseEvent).forEach(([eventName, body]) => {
			const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
			try {
				new AsyncFunction(body);
			} catch (error: any) {
				eventN = eventName;
				message = error.message;
				name = error.name;
			}
			setErrorInfo({
				[VaildError.ERROR_FN]: eventN,
				[VaildError.ERROR_INFO]: message,
				[VaildError.ERROR_STACK]: name
			});
		});
	}, [baseEvent]);

	const closeModal = () => {
		if (errorInfo[VaildError.ERROR_FN]) {
			messageApi.error("事件函数错误，无法进行保存");
			return;
		}
		updateChartConfig(chartIndex, "events", "baseEvent", baseEvent);
		setIsOpen(false);
	};

	return (
		<>
			{contextHolder}
			<JCollapseBox
				unfold
				name="基础事件配置"
				operator={
					<Button
						type="primary"
						ghost
						size="small"
						icon={<JIcon icon={<Pencil />} />}
						onClick={() => setIsOpen(true)}
					>
						编辑
					</Button>
				}
			>
				<div className="p-1 border-1 border-[#3E3E3F]">
					<JCodeMirror lan="javascript" fontSize={14} code={showCode} disabled />
				</div>
			</JCollapseBox>
			<Modal
				open={isOpen}
				width={1200}
				closable={false}
				title="基础事件编辑器"
				styles={{ header: { background: "none" } }}
				footer={
					<div className="w-full h-10 flex items-center justify-between">
						<div className="flex items-center">
							<Tag color="processing">
								<div className="p-1 flex items-center">
									<JIcon icon={<Document />}></JIcon>
									说明
								</div>
							</Tag>
							<Typography.Text>编写方式同正常 JavaScript 写法</Typography.Text>
						</div>

						<div className="flex items-center justify-center">
							<Button onClick={() => setIsOpen(false)}>取消</Button>
							<Button type="primary" onClick={closeModal}>
								保存
							</Button>
						</div>
					</div>
				}
			>
				<div className="flex gap-4">
					<div className="flex-grow relative">
						<Tabs
							type="card"
							items={Object.entries(baseEvent).map(([key, value]) => ({
								key,
								label: `${EventTypeName[key as BaseEvent]}-${key}`,
								children: (
									<div className="h-127" key={key}>
										<JEditCode
											code={value}
											codeChange={(code) => {
												setBaseEvent({ ...baseEvent, [key]: code });
											}}
											headCodeTooltip={
												<>
													<span className="text-[#9cdcfe]">async</span>&nbsp;
													<span className="text-[#569cd6]">function</span>&nbsp;
													<span className="text-[#dcdcaa]">{key}</span>(
													<span className="text-[#9cdcfe]">mouseEvent</span>
													,&nbsp;
													<span className="text-[#9cdcfe]">components</span>)&nbsp;
													{"{"}
												</>
											}
											tailCodeTooltip={<>{"}"}</>}
										/>
									</div>
								)
							}))}
						/>
						<div className="absolute top-4 right-0 text-[#f2c97d] text-xs">
							提示：Echarts 组件会拦截鼠标事件
						</div>
					</div>
					<div>
						<Divider type="vertical" style={{ height: "100%" }} />
					</div>

					<div className="w-80">
						<Tabs
							type="card"
							items={[
								{
									key: "result",
									label: <div className="w-31 text-center">验证结果</div>,
									children: (
										<>
											{Object.entries(errorInfo).map(([key, value]) => (
												<JCollapseBox name={ErrorTypeName[key as VaildError]} key={key} unfold>
													<Typography.Text type="secondary">
														{value ? value : "暂无"}
													</Typography.Text>
												</JCollapseBox>
											))}
										</>
									)
								},
								{
									key: "express",
									label: <div className="w-31 text-center">变量说明</div>,
									children: (
										<JCollapseBox name="mouseEvent" unfold>
											<Typography.Text type="secondary">鼠标事件对象</Typography.Text>
										</JCollapseBox>
									)
								}
							]}
						/>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default BaseEventConfig;
