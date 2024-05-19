export interface PublicResponse<T> {
	code: number;
	message: string;
	data: T;
}

// 资源库 item
export interface SourceItem {
	id: number;
	content: string;
	projectName: string;
	thumbnail: string;
	createdAt: string;
	updateAt: string;
	category: string;
	categoryName: string;
}

// 用户信息
export interface UserInfo {
	id: number;
	username: string;
	createTime: string;
}

// 项目信息
export interface ProjectInfo {
	id: number;
	title: string;
	cover: string;
	detail: string;
	status: boolean;
	createTime: string;
	updateTime: string;
}

// 选择项目信息
export type SelectProjectInfo = Pick<ProjectInfo, "id" | "title">;

// 模板信息
export type TemplateInfo = Omit<ProjectInfo, "status"> & { user: UserInfo };

export type UserLoginVo =
	| ({
			userInfo: UserInfo;
	  } & TokenVo)
	| string;

export type ProjectListVo = {
	projects: ProjectInfo[];
	totalCount: number;
};

export type TemplateListVo = {
	templates: TemplateInfo[];
	totalCount: number;
};

export type TokenVo = {
	accessToken: string;
	refreshToken: string;
};

export type MessageVo = string;
