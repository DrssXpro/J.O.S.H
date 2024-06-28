import { useState } from "react";
import { Pagination, Row, Col, Tabs, Button, Modal, Input, Select } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import JProjectCard from "@/components/JProjectCard";
import JTemplateCard from "@/components/JTemplateCard";
import EmptyImage from "@/assets/images/empty-data.png";
import { ProjectInfo, TemplateInfo } from "@/service/types/requestTypes";
import { ProjectListData, TemplateListData } from "@/settings/systemDataSetting";

interface ProjectState {
	list: ProjectInfo[];
	loading: boolean;
	empty: boolean;
	total: number;
	page: number;
	pageSize: number;
}

type TemplateState = Omit<ProjectState, "list"> & { list: TemplateInfo[]; currentTemplate: undefined | TemplateInfo };

type TabKeys = "template" | "project";

const EmptyBox = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<img className="w-100 h-85" src={EmptyImage} alt="空" />
		</div>
	);
};

const ProjectList = () => {
	const [projectState] = useState<ProjectState>({
		list: ProjectListData,
		loading: false,
		empty: false,
		total: 0,
		page: 1,
		pageSize: 10
	});
	const [isOpen, setIsOpen] = useState(false);
	const [projectDetail, setProjectDetail] = useState({
		title: "",
		cover: "",
		detail: "",
		status: false
	});

	const handleAddProject = () => {
		window.$message.success("模拟添加项目");
		setIsOpen(false);
	};

	return (
		<>
			<div className="mb-4">
				<Button
					type="primary"
					icon={<AiOutlinePlus />}
					onClick={() => {
						setIsOpen(true);
					}}
				>
					创建项目
				</Button>
			</div>
			{projectState.empty ? (
				<div className="w-full h-full" style={{ height: `calc(100vh - 210px)` }}>
					<EmptyBox />
				</div>
			) : (
				<>
					<div style={{ minHeight: `calc(100vh - 210px)` }}>
						<Row gutter={[16, 16]}>
							{projectState.list.map((detail, index) => (
								<Col md={12} lg={8} xxl={6} key={index}>
									<JProjectCard detail={detail} />
								</Col>
							))}
						</Row>
					</div>
					<div className="w-full flex flex-row-reverse mt-4">
						<Pagination showSizeChanger current={projectState.page} total={projectState.total} />
					</div>
				</>
			)}
			<Modal
				open={isOpen}
				closable
				title="创建项目"
				styles={{ header: { background: "none" } }}
				footer={
					<div className="flex justify-end gap-2">
						<Button
							onClick={() => {
								setProjectDetail((pre) => ({ ...pre, title: "" }));
								setIsOpen(false);
							}}
						>
							取消
						</Button>
						<Button type="primary" onClick={handleAddProject}>
							确定
						</Button>
					</div>
				}
			>
				<div className="my-4 flex items-center gap-2">
					<div className="w-22">项目名称：</div>
					<Input
						placeholder="请输入名称"
						value={projectDetail.title}
						onChange={(e) => {
							setProjectDetail((pre) => ({ ...pre, title: e.target.value }));
						}}
					/>
				</div>
			</Modal>
		</>
	);
};

const TemplateList = () => {
	const [templateState, setTemplateState] = useState<TemplateState>({
		list: TemplateListData,
		currentTemplate: undefined,
		loading: false,
		empty: false,
		total: 0,
		page: 1,
		pageSize: 10
	});
	const [projectsState, setProjectState] = useState({
		list: [] as { value: string; label: string }[],
		currentProject: 0,
		isOpen: false
	});

	return (
		<>
			{templateState.empty ? (
				<div className="w-full h-full" style={{ height: `calc(100vh - 160px)` }}>
					<EmptyBox />
				</div>
			) : (
				<>
					<div style={{ minHeight: `calc(100vh - 205px)` }}>
						<Row gutter={[16, 16]}>
							{templateState.list.map((detail, index) => (
								<Col md={12} lg={8} xxl={6} key={index}>
									<JTemplateCard isUser detail={detail} />
								</Col>
							))}
						</Row>
					</div>
					<div className="w-full flex flex-row-reverse mt-4">
						<Pagination showSizeChanger current={templateState.page} total={templateState.total} />
					</div>
					<Modal
						styles={{ header: { background: "none" } }}
						open={projectsState.isOpen}
						title="应用该模板"
						footer={
							<div className="flex items-center justify-end">
								<Button
									onClick={() => {
										setTemplateState((pre) => ({ ...pre, currentTemplate: undefined }));
										setProjectState((pre) => ({ ...pre, isOpen: false }));
									}}
								>
									取消
								</Button>
								<Button type="primary">应用</Button>
							</div>
						}
					>
						<div className="my-4 flex items-center">
							<div>选择我的应用：</div>
							<Select
								showSearch
								placeholder="请选择自己的应用"
								optionFilterProp="label"
								className="flex-1"
								onChange={(val) => {
									setProjectState((pre) => ({ ...pre, currentProject: Number(val) }));
								}}
								filterOption={(input: string, option?: { label: string; value: string }) =>
									(option?.label ?? "").includes(input)
								}
								options={projectsState.list}
							/>
						</div>
					</Modal>
				</>
			)}
		</>
	);
};

const ProjectsPage = () => {
	const [, setKey] = useState<TabKeys>("project");
	const tabList = [
		{
			label: "我的应用",
			key: "project" as TabKeys,
			children: <ProjectList />
		},
		{
			label: "我的模板",
			key: "template" as TabKeys,
			children: <TemplateList />
		}
	];
	return (
		<Tabs
			defaultActiveKey="project"
			type="card"
			items={tabList}
			onChange={(val) => {
				setKey(val as TabKeys);
			}}
		/>
	);
};

export default ProjectsPage;
