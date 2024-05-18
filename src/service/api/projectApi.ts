import { DELETE, GET, PUT } from "../axios";
import { MessageVo, ProjectInfo, ProjectListVo } from "../types/requestTypes";

// 获取项目列表
function getProjectListApi(data: { page: number; pageSize: number }) {
	return GET<ProjectListVo>("/project/list", data);
}

// 删除项目
function deleteProjectApi(projectId: number) {
	return DELETE<MessageVo>(`/project/${projectId}`);
}

// 更新项目
function updateProjectApi(data: ProjectInfo) {
	return PUT<MessageVo>(`/project/${data.id}`, data);
}

export { getProjectListApi, deleteProjectApi, updateProjectApi };
