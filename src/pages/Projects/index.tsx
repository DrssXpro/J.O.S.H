import { useEffect, useState } from "react";
import { Pagination, Row, type PaginationProps, Col, Tabs, Button, Modal, Input, Select } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import JProjectCard from "@/components/JProjectCard";
import {
	addProjectApi,
	deleteProjectApi,
	getProjectListApi,
	getSelectProjectApi,
	saveTemplateForProjectApi,
	updateProjectApi
} from "@/service/api/projectApi";
import { ProjectInfo, TemplateInfo } from "@/service/types/requestTypes";
import { addTemplateApi, deleteTemplateApi, getTemplateListByUserApi } from "@/service/api/templateApi";
import JTemplateCard from "@/components/JTemplateCard";
import { pick } from "lodash-es";

interface ProjectState {
	list: ProjectInfo[];
	loading: boolean;
	total: number;
	page: number;
	pageSize: number;
}

type TemplateState = Omit<ProjectState, "list"> & { list: TemplateInfo[]; currentTemplate: undefined | TemplateInfo };

type TabKeys = "template" | "project";

const ProjectList = (props: { tabKey: TabKeys }) => {
	const [projectState, setProjectState] = useState<ProjectState>({
		list: [],
		loading: false,
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

	useEffect(() => {
		props.tabKey === "project" && getProjectList();
	}, [props.tabKey]);

	const onShowSizeChange: PaginationProps["onShowSizeChange"] = (_current, pageSize) => {
		setProjectState((pre) => ({ ...pre, pageSize }));
		getProjectList();
	};

	const getProjectList = async () => {
		setProjectState((pre) => ({ ...pre, loading: true }));
		const res = await getProjectListApi({ page: projectState.page, pageSize: projectState.pageSize });
		const data = res.data;
		setProjectState((pre) => ({
			...pre,
			list: data.projects,
			total: data.totalCount,
			loading: false
		}));
	};

	const handleDeletePropject = async (id: number) => {
		const res = await deleteProjectApi(id);
		window.$message.success(res.data);
		getProjectList();
	};

	const handleUpdateProjectStatus = async (detail: ProjectInfo, status: boolean) => {
		const res = await updateProjectApi({ ...detail, status });
		window.$message.success(res.data);
		getProjectList();
	};

	const handleAddProject = async () => {
		const res = await addProjectApi({ ...projectDetail });
		window.$message.success(res.data);
		getProjectList();
		setProjectDetail((pre) => ({ ...pre, title: "" }));
		setIsOpen(false);
	};

	const handleSaveProjectAsTemplate = async (detail: ProjectInfo) => {
		const res = await addTemplateApi({ title: detail.title, detail: detail.detail, cover: detail.cover });
		window.$message.success(res.data);
	};

	return (
		<>
			<div style={{ minHeight: `calc(100vh - 205px)` }}>
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
				<Row gutter={[16, 16]}>
					{projectState.list.map((detail, index) => (
						<Col md={12} lg={8} xxl={6} key={index}>
							<JProjectCard
								detail={detail}
								deleteProject={handleDeletePropject}
								updateProjectStatus={handleUpdateProjectStatus}
								saveProjectTemplate={handleSaveProjectAsTemplate}
							/>
						</Col>
					))}
				</Row>
			</div>
			<div className="w-full flex flex-row-reverse mt-4">
				<Pagination
					showSizeChanger
					onShowSizeChange={onShowSizeChange}
					onChange={(page) => {
						setProjectState((pre) => ({ ...pre, page }));
						getProjectList();
					}}
					current={projectState.page}
					total={projectState.total}
				/>
			</div>
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

const TemplateList = (props: { tabKey: TabKeys }) => {
	const [templateState, setTemplateState] = useState<TemplateState>({
		list: [],
		currentTemplate: undefined,
		loading: false,
		total: 0,
		page: 1,
		pageSize: 10
	});
	const [projectsState, setProjectState] = useState({
		list: [] as { value: string; label: string }[],
		currentProject: 0,
		isOpen: false
	});

	useEffect(() => {
		props.tabKey === "template" && getTemplateList();
		props.tabKey === "template" && getUserProjectList();
	}, [props.tabKey]);

	const onShowSizeChange: PaginationProps["onShowSizeChange"] = (_current, pageSize) => {
		setTemplateState((pre) => ({ ...pre, pageSize }));
		getTemplateList();
	};

	const getTemplateList = async () => {
		setTemplateState((pre) => ({ ...pre, loading: true }));
		const res = await getTemplateListByUserApi({ page: templateState.page, pageSize: templateState.pageSize });
		const data = res.data;
		setTemplateState((pre) => ({
			...pre,
			list: data.templates,
			total: data.totalCount,
			loading: false
		}));
	};

	const getUserProjectList = async () => {
		const res = await getSelectProjectApi();
		setProjectState((pre) => ({ ...pre, list: res.data.map((i) => ({ value: String(i.id), label: i.title })) }));
	};

	const handleDeleteTemplate = async (id: number) => {
		const res = await deleteTemplateApi(id);
		window.$message.success(res.data);
		getTemplateList();
	};

	const handleApplyTemplate = (detail: TemplateInfo) => {
		setTemplateState((pre) => ({ ...pre, currentTemplate: detail }));
		setProjectState((pre) => ({ ...pre, isOpen: true }));
	};

	const handleSaveTemplateForProject = async () => {
		const res = await saveTemplateForProjectApi(
			projectsState.currentProject,
			pick(templateState.currentTemplate!, ["cover", "title", "detail"])
		);
		window.$message.success(res.data);
		setTemplateState((pre) => ({ ...pre, currentTemplate: undefined }));
		setProjectState((pre) => ({ ...pre, isOpen: false }));
	};

	return (
		<>
			<div style={{ minHeight: `calc(100vh - 205px)` }}>
				<Row gutter={[16, 16]}>
					{templateState.list.map((detail, index) => (
						<Col md={12} lg={8} xxl={6} key={index}>
							<JTemplateCard
								isUser
								detail={detail}
								deleteTemplate={handleDeleteTemplate}
								applyTemplate={handleApplyTemplate}
							/>
						</Col>
					))}
				</Row>
			</div>
			<div className="w-full flex flex-row-reverse mt-4">
				<Pagination
					showSizeChanger
					onShowSizeChange={onShowSizeChange}
					onChange={(page) => {
						setTemplateState((pre) => ({ ...pre, page }));
						getTemplateList();
					}}
					current={templateState.page}
					total={templateState.total}
				/>
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
						<Button type="primary" onClick={handleSaveTemplateForProject}>
							应用
						</Button>
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
	);
};

const Projects = () => {
	const [key, setKey] = useState<TabKeys>("project");
	const tabList = [
		{
			label: "我的应用",
			key: "project" as TabKeys,
			children: <ProjectList tabKey={key} />
		},
		{
			label: "我的模板",
			key: "template" as TabKeys,
			children: <TemplateList tabKey={key} />
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

export default Projects;
