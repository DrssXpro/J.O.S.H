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
