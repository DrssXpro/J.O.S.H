import JTemplateCard from "@/components/JTemplateCard";
import { getSelectProjectApi, saveTemplateForProjectApi } from "@/service/api/projectApi";
import { getTemplateListApi } from "@/service/api/templateApi";
import { TemplateInfo } from "@/service/types/requestTypes";
import { Button, Col, Modal, Pagination, PaginationProps, Row, Select } from "antd";
import { pick } from "lodash-es";
import { useEffect, useState } from "react";

interface TemplateState {
	list: TemplateInfo[];
	currentTemplate: undefined | TemplateInfo;
	loading: boolean;
	total: number;
	page: number;
	pageSize: number;
}

const TemplatesPage = () => {
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
		getTemplateList();
		getUserProjectList();
	}, []);

	const onShowSizeChange: PaginationProps["onShowSizeChange"] = (_current, pageSize) => {
		setTemplateState((pre) => ({ ...pre, pageSize }));
		getTemplateList();
	};

	const getTemplateList = async () => {
		setTemplateState((pre) => ({ ...pre, loading: true }));
		const res = await getTemplateListApi({ page: templateState.page, pageSize: templateState.pageSize });
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
			<div style={{ minHeight: `calc(100vh - 152px)` }}>
				<Row gutter={[16, 16]}>
					{templateState.list.map((detail, index) => (
						<Col md={12} lg={8} xxl={6} key={index}>
							<JTemplateCard isUser={false} detail={detail} applyTemplate={handleApplyTemplate} />
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

export default TemplatesPage;
