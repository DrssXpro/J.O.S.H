import JBaseHeader from "@/components/JBaseHeader";
import JBaseHeaderRightContent from "@/components/JHeaderRightContent";
import {
	HomeFilled,
	BarChartOutlined,
	PartitionOutlined,
	SettingOutlined,
	ArrowLeftOutlined,
	ArrowRightOutlined,
	BankOutlined,
	LaptopOutlined,
	SendOutlined
} from "@ant-design/icons";
import { Button, Input, type InputRef } from "antd";
import { useState, useRef } from "react";

const LeftOperator = () => {
	return (
		<div className="flex items-center">
			<Button icon={<HomeFilled />} type="text"></Button>
			<div className="flex items-center ml-5 gap-4">
				<Button ghost type="primary" icon={<BarChartOutlined />}></Button>
				<Button ghost type="primary" icon={<PartitionOutlined />}></Button>
				<Button ghost type="primary" icon={<SettingOutlined />}></Button>
			</div>
			<div className="flex items-center ml-4 pl-4 gap-4 border-l-1 border-l-[#2D2D30]">
				<Button ghost type="primary" icon={<ArrowLeftOutlined />}></Button>
				<Button ghost type="primary" icon={<ArrowRightOutlined />}></Button>
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
		<div className="flex items-center gap-3">
			<Button icon={<LaptopOutlined />} size="large">
				预览
			</Button>
			<Button icon={<SendOutlined />} size="large">
				发布
			</Button>
			<div className="ml-1">
				<JBaseHeaderRightContent isLogin={true} />
			</div>
		</div>
	);
};

const WorkBenchHeader = () => {
	return <JBaseHeader left={<LeftOperator />} center={<CenterTitle />} right={<RightOperator />}></JBaseHeader>;
};

export default WorkBenchHeader;
