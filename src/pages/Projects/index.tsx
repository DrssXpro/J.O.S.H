import { useEffect, useState } from "react";
import { Pagination, Row, type PaginationProps, Col } from "antd";
import JProjectCard from "@/components/JProjectCard";
import { deleteProjectApi, getProjectListApi, updateProjectApi } from "@/service/api/projectApi";
import { ProjectInfo } from "@/service/types/requestTypes";

interface ProjectState {
	list: ProjectInfo[];
	loading: boolean;
	total: number;
	page: number;
	pageSize: number;
}

const Projects = () => {
	const [projectState, setProjectState] = useState<ProjectState>({
		list: [],
		loading: false,
		total: 0,
		page: 1,
		pageSize: 10
	});

	useEffect(() => {
		getProjectList();
	}, []);

	const onShowSizeChange: PaginationProps["onShowSizeChange"] = (_current, pageSize) => {
		setProjectState((pre) => ({ ...pre, pageSize }));
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

	return (
		<>
			<div style={{ minHeight: `calc(100vh - 150px)` }}>
				<Row gutter={[16, 16]}>
					{projectState.list.map((detail, index) => (
						<Col md={12} lg={8} xxl={6} key={index}>
							<JProjectCard
								detail={detail}
								deleteProject={handleDeletePropject}
								updateProjectStatus={handleUpdateProjectStatus}
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
		</>
	);
};

export default Projects;
