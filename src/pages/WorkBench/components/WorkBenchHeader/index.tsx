import JBaseHeader from "@/components/JBaseHeader";
import JBaseHeaderRightContent from "@/components/JHeaderRightContent";
import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import {
	AiOutlineArrowLeft,
	AiOutlineArrowRight,
	AiOutlineSetting,
	AiOutlineBarChart,
	AiOutlinePartition,
	AiOutlineBank,
	AiOutlineLaptop,
	AiOutlineSend,
	AiOutlineSave
} from "react-icons/ai";
import { Button, Input, Tooltip, type InputRef } from "antd";
import { useState, useRef, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLayoutStore from "@/store/layoutStore/layoutStore";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useUndoRedo from "./hooks/useUndoRedo";
import useStoreSelector from "@/hooks/useStoreSelector";
import { HistoryStackEnum } from "@/store/chartHistoryStore/types";
import useInfoOperator from "./hooks/useInfoOperator";

interface TitleProps {
	title: string;
	updateTitle: (title: string) => void;
}

const LeftOperator = () => {
	const nav = useNavigate();
	const { showMaterials, showLayer, showConfiguration, controllMaterials, controllLayer, controllConfiguration } =
		useLayoutStore(
			useStoreSelector([
				"showMaterials",
				"showLayer",
				"showConfiguration",
				"controllMaterials",
				"controllLayer",
				"controllConfiguration"
			])
		);
	const { autoLayoutCanvas } = useCanvasStore(useStoreSelector(["autoLayoutCanvas"]));
	const { backStack, forwardStack, backAction, forwardAction } = useChartHistoryStore(
		useStoreSelector([HistoryStackEnum.BACK_STACK, HistoryStackEnum.FORWARD_STACK, "backAction", "forwardAction"])
	);
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
						icon={<AiOutlineBarChart />}
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
						icon={<AiOutlinePartition />}
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
						icon={<AiOutlineSetting />}
						onClick={() => {
							controllConfiguration(!showConfiguration);
							setTimeout(() => {
								autoLayoutCanvas();
							}, 500);
						}}
					></Button>
				</Tooltip>
			</div>
			<div className="flex items-center ml-4 pl-4 gap-4 border-l-1 border-l-solid border-l-[#2D2D30]">
				<Tooltip title="后退">
					<Button
						ghost
						type="primary"
						icon={<AiOutlineArrowLeft />}
						onClick={() => handleAction("BACK")}
						disabled={!canBack}
					></Button>
				</Tooltip>
				<Tooltip title="前进">
					<Button
						ghost
						type="primary"
						icon={<AiOutlineArrowRight />}
						onClick={() => handleAction("FORWARD")}
						disabled={!canForward}
					></Button>
				</Tooltip>
			</div>
		</div>
	);
};

const CenterTitle = (props: TitleProps) => {
	const { title, updateTitle } = props;
	const [isEdit, setEdit] = useState(false);
	const [projectTitle, setProjectTitle] = useState("");

	const titleInputRef = useRef<InputRef>(null);

	useEffect(() => {
		setProjectTitle(title);
	}, [title]);

	return (
		<div className="flex items-center justify-center">
			<AiOutlineBank />
			<div className="ml-1">工作空间 </div>
			<div className="mx-2">-</div>
			{isEdit ? (
				<Input
					ref={titleInputRef}
					className="w-50"
					size="middle"
					showCount
					maxLength={20}
					value={projectTitle}
					onChange={(e) => setProjectTitle(e.target.value)}
					onBlur={() => {
						setEdit(!isEdit);
						updateTitle(projectTitle);
					}}
				></Input>
			) : (
				<Button
					size="small"
					type="text"
					onClick={() => {
						setEdit(!isEdit);
						setTimeout(() => {
							titleInputRef.current!.focus();
						});
					}}
				>
					{projectTitle}
				</Button>
			)}
		</div>
	);
};

const RightOperator = () => {
	const params = useParams();
	const { saveLoading, saveScreenDataInfo, previewScreenInfo } = useInfoOperator(Number(params.projectId));

	return (
		<div className="flex items-center gap-3 float-right">
			<Button icon={<AiOutlineSave />} onClick={saveScreenDataInfo} loading={saveLoading}>
				保存
			</Button>
			<Button icon={<AiOutlineLaptop />} onClick={previewScreenInfo}>
				预览
			</Button>
			<Button
				icon={<AiOutlineSend />}
				onClick={() => {
					window.$message.warning("线上展示项目不允许发布！");
				}}
			>
				发布
			</Button>
			<div className="ml-1">
				<JBaseHeaderRightContent isLogin={true} />
			</div>
		</div>
	);
};

const WorkBenchHeader = (props: TitleProps) => {
	return (
		<JBaseHeader
			left={<LeftOperator />}
			center={<CenterTitle {...props} />}
			right={<RightOperator />}
			leftWidth="40%"
			rightWidth="40%"
		></JBaseHeader>
	);
};

export default WorkBenchHeader;
