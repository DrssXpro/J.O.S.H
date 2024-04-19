import { useEffect, useMemo, useState } from "react";
import { Button, Divider, Modal, Tabs, Tag, Typography } from "antd";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JCodeMirror from "@/components/JCodeMirror";
import { IoDocument, IoPencil } from "react-icons/io5";
import { computedAdvancedEventCode } from "../codeConfig";
import { ErrorTypeName, EventLife, VaildError } from "@/types/EventTypes";
import JEditCode from "@/components/JChartConfiguration/JEditCode";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";

const EventLifeName = {
	[EventLife.CHART_READY]: "渲染之后"
};

const AdvancedEventConfig = () => {
	const [errorInfo, setErrorInfo] = useState({
		[VaildError.ERROR_FN]: "",
		[VaildError.ERROR_INFO]: "",
		[VaildError.ERROR_STACK]: ""
	});
	const updateChartConfig = useChartStore((selector) => selector.updateChartConfig);
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	const [advancedEvent, setAdvancedEvent] = useState({
		...component.events.advancedEvents
	});
	const [isOpen, setIsOpen] = useState(false);

	// 组件图表绑定事件代码展示
	const showCode = useMemo(() => {
		const codes = Object.entries(component.events.advancedEvents).map(([, body]) => (body ? body : ""));
		return computedAdvancedEventCode(codes);
	}, [component.events.advancedEvents]);

	// 处理编写的事件函数错误信息上报展示
	useEffect(() => {
		let eventN = "",
			message = "",
			name = "";
		Object.entries(advancedEvent).forEach(([eventName, body]) => {
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
	}, [advancedEvent]);

	const closeModal = () => {
		if (errorInfo[VaildError.ERROR_FN]) {
			window.$message.error("事件函数错误，无法进行保存");
			return;
		}
		updateChartConfig(chartIndex, "events", "advancedEvents", advancedEvent);
		setIsOpen(false);
	};
	return (
		<>
			<JCollapseBox
				unfold
				name="高级事件配置"
				operator={
					<Button type="primary" ghost size="small" icon={<IoPencil />} onClick={() => setIsOpen(true)}>
						编辑
					</Button>
				}
			>
				<div className="p-1 border-1 border-solid border-[#3E3E3F]">
					<JCodeMirror lan="javascript" fontSize={14} code={showCode} disabled />
				</div>
			</JCollapseBox>
			<Modal
				open={isOpen}
				width={1200}
				closable={false}
				title="高级事件编辑器"
				styles={{ header: { background: "none" } }}
				footer={
					<div className="w-full h-10 flex items-center justify-between">
						<div className="flex items-center">
							<Tag color="processing">
								<div className="p-1 flex items-center">
									<IoDocument />
									说明
								</div>
							</Tag>
							<Typography.Text>通过提供的参数可为图标增加定制化的 tooltip、交互事件等等</Typography.Text>
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
							items={Object.entries(advancedEvent).map(([key, value]) => ({
								key,
								label: `${EventLifeName[key as EventLife]}-${key}`,
								children: (
									<div className="h-127" key={key}>
										<JEditCode
											code={value}
											codeChange={(code) => setAdvancedEvent({ ...advancedEvent, [key]: code })}
											headCodeTooltip={
												<>
													<span className="text-[#9cdcfe]">async</span>&nbsp;
													<span className="text-[#569cd6]">function</span>&nbsp;
													<span className="text-[#dcdcaa]">{key}</span>(
													<span className="text-[#9cdcfe]">component</span>
													,&nbsp;
													<span className="text-[#9cdcfe]">components</span>
													,&nbsp;
													<span className="text-[#9cdcfe]">echarts</span>)&nbsp;
													{"{"}
												</>
											}
											tailCodeTooltip={<>{"}"}</>}
										/>
									</div>
								)
							}))}
						/>
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
										<>
											<JCollapseBox name="e" unfold>
												<Typography.Text type="secondary">
													触发对应生命周期事件时接收的参数
												</Typography.Text>
											</JCollapseBox>
											<JCollapseBox name="components" unfold>
												<Typography.Text type="secondary">
													当前大屏内所有的组件集合 id 图表组件中的配置 id,
													可以获取其他图表组件进行控制
												</Typography.Text>
											</JCollapseBox>
											<JCollapseBox name="echarts" unfold>
												<Typography.Text type="secondary">全局 echarts 实例</Typography.Text>
											</JCollapseBox>
										</>
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

export default AdvancedEventConfig;
