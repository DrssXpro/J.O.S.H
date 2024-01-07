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
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLayoutStore from "@/store/layoutStore";

const LeftOperator = () => {
	const nav = useNavigate();
	const { showMaterials, showLayer, showConfiguration, controllMaterials, controllLayer, controllConfiguration } =
		useLayoutStore();

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
						onClick={() => controllMaterials(!showMaterials)}
					></Button>
				</Tooltip>
				<Tooltip title="图层控制">
					<Button
						type={showLayer ? "primary" : undefined}
						ghost={showLayer}
						icon={<PartitionOutlined />}
						onClick={() => controllLayer(!showLayer)}
					></Button>
				</Tooltip>
				<Tooltip title="详情设置">
					<Button
						type={showConfiguration ? "primary" : undefined}
						ghost={showConfiguration}
						icon={<SettingOutlined />}
						onClick={() => controllConfiguration(!showConfiguration)}
					></Button>
				</Tooltip>
			</div>
			<div className="flex items-center ml-4 pl-4 gap-4 border-l-1 border-l-[#2D2D30]">
				<Tooltip title="后退">
					<Button ghost type="primary" icon={<ArrowLeftOutlined />}></Button>
				</Tooltip>
				<Tooltip title="前进">
					<Button ghost type="primary" icon={<ArrowRightOutlined />}></Button>
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
	return (
		<div className="flex items-center gap-3 float-right">
			<Button icon={<LaptopOutlined />}>预览</Button>
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
