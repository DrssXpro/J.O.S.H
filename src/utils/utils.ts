import { cloneDeep } from "lodash-es";

// file -> url: 设置 canvas 背景图使用
export const fileToUrl = (file: File): string => {
	const Url = URL || window.URL || window.webkitURL;
	const ImageUrl = Url.createObjectURL(file);
	return ImageUrl;
};

// 函数执行：图表过滤器函数使用
export const newFunctionHandle = (
	data: any,
	res: any,
	funcStr?: string,
	isToString?: boolean,
	errorCallBack?: (...args: any[]) => any,
	successCallBack?: (...args: any[]) => any
) => {
	try {
		if (!funcStr) return data;
		const fn = new Function("data", "res", funcStr);
		const fnRes = fn(cloneDeep(data), cloneDeep(res));
		const resHandle = isToString ? String(fnRes) : fnRes;
		// 成功回调
		successCallBack && successCallBack(resHandle);
		return resHandle;
	} catch (error) {
		// 失败回调
		errorCallBack && errorCallBack(error);
		return "函数执行错误";
	}
};
