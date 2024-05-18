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

export type UserLoginVo =
	| {
			userInfo: UserInfo;
			accessToken: string;
			refreshToken: string;
	  }
	| string;

export type ProjectListVo = {
	projects: ProjectInfo[];
	totalCount: number;
};

export type MessageVo = string;
