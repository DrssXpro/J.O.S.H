import { DELETE, GET, PUT } from "../axios";
import { MessageVo, ProjectInfo, ProjectListVo } from "../types/requestTypes";

// 获取项目列表接口
function getProjectListApi(data: { page: number; pageSize: number }) {
	return GET<ProjectListVo>("/project/list", data);
}

// 删除项目接口
function deleteProjectApi(projectId: number) {
	return DELETE<MessageVo>(`/project/${projectId}`);
}

// 更新项目接口
function updateProjectApi(data: ProjectInfo) {
	return PUT<MessageVo>(`/project/${data.id}`, data);
}

// 获取项目详情接口
function getProjectDetailApi(projectId: number) {
	return GET<ProjectInfo>(`/project/detail/${projectId}`);
}

export { getProjectListApi, deleteProjectApi, updateProjectApi, getProjectDetailApi };
