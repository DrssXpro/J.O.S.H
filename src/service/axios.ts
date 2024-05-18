import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { ResultEnum } from "@/types/HttpTypes";
import { ErrorPageNameMap } from "@/types/pageTypes";
import { PublicResponse } from "./types/requestTypes";
import { getLocalStorage } from "@/utils/storages";
import { StorageEnum } from "@/types/StorageTypes";

export const BASEURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
	timeout: ResultEnum.TIMEOUT,
	baseURL: BASEURL
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const accessToken = getLocalStorage(StorageEnum.J_USER_ACCESS_TOKEN);
		if (accessToken) {
			config.headers.Authorization = `Bear ${accessToken}`;
		}
		return config;
	},
	(error: AxiosError) => {
		Promise.reject(error);
	}
);

// 响应拦截器
axiosInstance.interceptors.response.use(
	(res: AxiosResponse) => {
		const { code } = res.data as { code: number };
		if (code === undefined || code === null) return Promise.resolve(res.data);
		if (code === ResultEnum.DATA_SUCCESS) return Promise.resolve(res.data);
		// 重定向
		if (ErrorPageNameMap.get(code)) {
			console.log("重定向操作");
		}
		return Promise.resolve(res.data);
	},
	(err: AxiosError) => {
		const data = err.response!.data as PublicResponse<string>;
		window.$message.warning(data.data);
		return Promise.reject(err);
	}
);

export function GET<R>(url: string, params?: Record<string, any>) {
	return axiosInstance.request<any, PublicResponse<R>>({
		url,
		method: "get",
		params
	});
}

export function POST<R>(url: string, data?: Record<string, any>) {
	return axiosInstance.request<any, PublicResponse<R>>({
		url,
		method: "post",
		data
	});
}

export function DELETE<R>(url: string, data?: Record<string, any>) {
	return axiosInstance.request<any, PublicResponse<R>>({
		url,
		method: "delete",
		data
	});
}

export function PUT<R>(url: string, data?: Record<string, any>) {
	return axiosInstance.request<any, PublicResponse<R>>({
		url,
		method: "put",
		data
	});
}

export default axiosInstance;
