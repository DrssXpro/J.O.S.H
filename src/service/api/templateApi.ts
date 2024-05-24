import { DELETE, GET, POST } from "../axios";
import { MessageVo, TemplateInfo, TemplateListVo } from "../types/requestTypes";

// 添加模板接口
function addTemplateApi(data: Pick<TemplateInfo, "title" | "detail" | "cover">) {
	return POST<MessageVo>("/template", data);
}

// 删除模板接口
function deleteTemplateApi(id: number) {
	return DELETE<MessageVo>(`/template/${id}`);
}

// 获取用户模板列表接口
function getTemplateListByUserApi(data: { page: number; pageSize: number }) {
	return GET<TemplateListVo>("template/user_list", data);
}

// 获取模板列表接口
function getTemplateListApi(data: { page: number; pageSize: number }) {
	return GET<TemplateListVo>("template/list", data);
}

export { addTemplateApi, deleteTemplateApi, getTemplateListByUserApi, getTemplateListApi };
