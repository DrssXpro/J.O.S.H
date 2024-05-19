import { DELETE, GET, POST, PUT } from "../axios";
import { MessageVo, ProjectInfo, ProjectListVo, SelectProjectInfo } from "../types/requestTypes";

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

// 创建项目接口
function addProjectApi(data: Pick<ProjectInfo, "title" | "detail" | "cover">) {
	return POST<MessageVo>(`/project`, data);
}

// 获取项目列表(for select)接口
function getSelectProjectApi() {
	return GET<SelectProjectInfo[]>("project/select_list");
}

// 保存模板至自己应用上
function saveTemplateForProjectApi(projectId: number, data: Pick<ProjectInfo, "title" | "detail" | "cover">) {
	return POST<MessageVo>(`/project/save/${projectId}`, data);
}

export {
	getProjectListApi,
	deleteProjectApi,
	updateProjectApi,
	getProjectDetailApi,
	addProjectApi,
	getSelectProjectApi,
	saveTemplateForProjectApi
};
