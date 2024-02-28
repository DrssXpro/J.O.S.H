import {
	RequestConfigType,
	RequestGlobalConfigType,
	RequestDataValueEnum,
	RequestParamsObjType,
	RequestBodyEnum,
	ContentTypeEnum
} from "@/types/HttpTypes";
import axiosInstance from "./axios";

export const customizeHttp = (
	targetParams: RequestConfigType,
	globalParams: RequestGlobalConfigType,
	errorfallback?: (error: any) => void
) => {
	if (!targetParams || !globalParams) {
		return;
	}
	// 全局
	const {
		// 全局请求源地址
		requestOriginUrl,
		// 全局请求内容
		requestParams: globalRequestParams
	} = globalParams;

	// 目标组件（优先级 > 全局组件）
	const {
		// 请求地址
		requestUrl,
		// 获取数据的方式
		requestDataType,
		// 请求方式 get/post/del/put/patch
		requestHttpType,
		// 请求体类型 none / form-data / x-www-form-urlencoded / json /xml
		requestParamsBodyType,
		// 请求内容 params / cookie / header / body: 同 requestParamsBodyType
		requestParams: targetRequestParams
	} = targetParams;

	// 静态排除
	if (requestDataType === RequestDataValueEnum.STATIC) return;

	if (!requestUrl) {
		return;
	}

	// 处理头部
	const headers: RequestParamsObjType = {
		...globalRequestParams.Header,
		...targetRequestParams.Header
	};

	// data 参数
	let data: RequestParamsObjType | FormData | string = {};
	// params 参数
	const params: RequestParamsObjType = { ...targetRequestParams.Params };
	// form 类型处理
	const formData: FormData = new FormData();
	// 类型处理

	switch (requestParamsBodyType) {
		case RequestBodyEnum.NONE:
			break;

		case RequestBodyEnum.JSON:
			headers["Content-Type"] = ContentTypeEnum.JSON;
			data = targetRequestParams.Body["json"];
			break;

		case RequestBodyEnum.X_WWW_FORM_URLENCODED: {
			headers["Content-Type"] = ContentTypeEnum.FORM_URLENCODED;
			const bodyFormData = targetRequestParams.Body["x-www-form-urlencoded"];
			for (const i in bodyFormData) formData.set(i, bodyFormData[i]);
			// FormData 赋值给 data
			data = formData;
			break;
		}

		case RequestBodyEnum.FORM_DATA: {
			headers["Content-Type"] = ContentTypeEnum.FORM_DATA;
			const bodyFormUrlencoded = targetRequestParams.Body["form-data"];
			for (const i in bodyFormUrlencoded) {
				formData.set(i, bodyFormUrlencoded[i]);
			}
			// FormData 赋值给 data
			data = formData;
			break;
		}
	}

	try {
		const url = new Function("return `" + `${requestOriginUrl}${requestUrl}`.trim() + "`")();
		return axiosInstance({
			url,
			method: requestHttpType,
			data,
			params,
			headers
		});
	} catch (error) {
		errorfallback && errorfallback(error);
	}
};
