import JBaseHeader from "@/components/JBaseHeader";
import JBaseHeaderRightContent from "@/components/JHeaderRightContent";
import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import {
	BarChartOutlined,
	PartitionOutlined,
	SettingOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	BankOutlined,
	LaptopOutlined,
	SendOutlined
} from "@ant-design/icons";
import { Button, Input, Tooltip, type InputRef } from "antd";
import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLayoutStore from "@/store/layoutStore/layoutStore";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useUndoRedo from "./hooks/useUndoRedo";
import useChartStore from "@/store/chartStore/chartStore";
import { getLocalStorage, setSessionStorage } from "@/utils/storages";
import { StorageEnum } from "@/types/StorageTypes";

const LeftOperator = () => {
	const nav = useNavigate();
	const { showMaterials, showLayer, showConfiguration, controllMaterials, controllLayer, controllConfiguration } =
		useLayoutStore();
	const { autoLayoutCanvas } = useCanvasStore();
	const { backStack, forwardStack, backAction, forwardAction } = useChartHistoryStore();
	const { handleUndo, handleRedo } = useUndoRedo();

	const canBack = useMemo(() => !!backStack.length, [backStack]);
	const canForward = useMemo(() => !!forwardStack.length, [forwardStack]);

	// 撤回/重做 操作
	const handleAction = (type: "BACK" | "FORWARD") => {
		const historyItem = type === "BACK" ? backAction() : forwardAction();
		if (!historyItem) {
			return;
		}
		type === "BACK" ? handleUndo(historyItem) : handleRedo(historyItem);
	};

	// 重做操作

	return (
		<div className="flex items-center">
			<div className="flex items-center cursor-pointer" onClick={() => nav("/application/projects")}>
				<img src={Logo} className="w-15 h-10" />
				<img src={LogoTitleDark} className="w-25" />
			</div>
			<div className="flex items-center gap-4">
				<Tooltip title="图表组件">
					<Button
						type={showMaterials ? "primary" : undefined}
						ghost={showMaterials}
						icon={<BarChartOutlined />}
						onClick={() => {
							controllMaterials(!showMaterials);
							setTimeout(() => {
								autoLayoutCanvas();
							}, 500);
						}}
					></Button>
				</Tooltip>
				<Tooltip title="图层控制">
					<Button
						type={showLayer ? "primary" : undefined}
						ghost={showLayer}
						icon={<PartitionOutlined />}
						onClick={() => {
							controllLayer(!showLayer);
							setTimeout(() => {
								autoLayoutCanvas();
							}, 500);
						}}
					></Button>
				</Tooltip>
				<Tooltip title="详情设置">
					<Button
						type={showConfiguration ? "primary" : undefined}
						ghost={showConfiguration}
						icon={<SettingOutlined />}
						onClick={() => {
							controllConfiguration(!showConfiguration);
							setTimeout(() => {
								autoLayoutCanvas();
							}, 500);
						}}
					></Button>
				</Tooltip>
			</div>
			<div className="flex items-center ml-4 pl-4 gap-4 border-l-1 border-l-[#2D2D30]">
				<Tooltip title="后退">
					<Button
						ghost
						type="primary"
						icon={<ArrowLeftOutlined />}
						onClick={() => handleAction("BACK")}
						disabled={!canBack}
					></Button>
				</Tooltip>
				<Tooltip title="前进">
					<Button
						ghost
						type="primary"
						icon={<ArrowRightOutlined />}
						onClick={() => handleAction("FORWARD")}
						disabled={!canForward}
					></Button>
				</Tooltip>
			</div>
		</div>
	);
};

const CenterTitle = () => {
	const [isEdit, setEdit] = useState(false);
	const [title, setTitle] = useState("test");
	const titleInputRef = useRef<InputRef>(null);

	const changeEditState = () => setEdit(!isEdit);

	return (
		<div className="flex items-center justify-center">
			<BankOutlined size={80} />
			<div className="ml-1">工作空间 </div>
			<div className="mx-2">-</div>
			{isEdit ? (
				<Input
					ref={titleInputRef}
					className="w-50"
					size="middle"
					showCount
					maxLength={16}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					onBlur={changeEditState}
				></Input>
			) : (
				<Button
					size="small"
					type="text"
					onClick={() => {
						changeEditState();
						setTimeout(() => {
							titleInputRef.current!.focus();
						});
					}}
				>
					{title}
				</Button>
			)}
		</div>
	);
};

const RightOperator = () => {
	const { canvasConfig } = useCanvasStore();
	const { componentList, requestGlobalConfig } = useChartStore();
	const goPreview = () => {
		const localStorageInfo = getLocalStorage("chart") || [];
		// 当前画布内容打包
		const storageInfo = { canvasConfig, componentList, requestGlobalConfig };
		// 根据当前项目 id 判断 sessionStorage 是否已存在，存在替换，不存在则添加
		if (localStorageInfo.length) {
			const repeateIndex = localStorageInfo.findIndex((e: { id: string }) => e.id === "1");
			if (repeateIndex !== -1) {
				localStorageInfo.splice(repeateIndex, 1, { id: 1, ...storageInfo });
				setSessionStorage(StorageEnum.J_CHART_STORAGE_LIST, localStorageInfo);
			} else {
				localStorageInfo.push({
					id: 1,
					...storageInfo
				});
				setSessionStorage(StorageEnum.J_CHART_STORAGE_LIST, localStorageInfo);
			}
		} else {
			// 初次 sessionStorage 为空，直接 push
			setSessionStorage(StorageEnum.J_CHART_STORAGE_LIST, [{ id: 1, ...storageInfo }]);
		}
		window.open("/preview/1");
	};

	return (
		<div className="flex items-center gap-3 float-right">
			<Button icon={<LaptopOutlined />} onClick={goPreview}>
				预览
			</Button>
			<Button icon={<SendOutlined />}>发布</Button>
			<div className="ml-1">
				<JBaseHeaderRightContent isLogin={true} />
			</div>
		</div>
	);
};

const WorkBenchHeader = () => {
	return (
		<JBaseHeader
			left={<LeftOperator />}
			center={<CenterTitle />}
			right={<RightOperator />}
			leftWidth="40%"
			rightWidth="40%"
		></JBaseHeader>
	);
};

export default WorkBenchHeader;
