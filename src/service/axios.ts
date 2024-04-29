import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from "axios";
import { ResultEnum } from "@/types/HttpTypes";
import { ErrorPageNameMap } from "@/types/pageTypes";
import { PublicResponse } from "./types/requestTypes";

const axiosInstance = axios.create({
	timeout: ResultEnum.TIMEOUT
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
		const { code } = res.data as { code: number };
		if (code === undefined || code === null) return Promise.resolve(res.data);
		if (code === ResultEnum.DATA_SUCCESS) return Promise.resolve(res.data);
		// 重定向
		if (ErrorPageNameMap.get(code)) {
			console.log("重定向操作");
		}
		return Promise.resolve(res.data);
	},
	(err: AxiosResponse) => {
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

export default axiosInstance;
