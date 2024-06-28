import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { ResultEnum } from "@/types/HttpTypes";
import { PublicResponse } from "./types/requestTypes";

export const BASEURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
	timeout: ResultEnum.TIMEOUT,
	baseURL: BASEURL
});

axiosInstance.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		Promise.reject(error);
	}
);

// 响应拦截器
axiosInstance.interceptors.response.use(
	(res: AxiosResponse) => {
		return Promise.resolve(res.data);
	},
	async (err: AxiosError) => {
		window.$message.warning(err.message);
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

export function UPLOAD<R>(url: string, data: FormData) {
	return axiosInstance.request<any, PublicResponse<R>>({
		url,
		method: "post",
		headers: {
			"Content-Type": "multipart/form-data"
		},
		data
	});
}

export default axiosInstance;
