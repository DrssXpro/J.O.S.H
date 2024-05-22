import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError, AxiosRequestConfig } from "axios";
import { ResultEnum } from "@/types/HttpTypes";
import { ErrorPageNameMap } from "@/types/pageTypes";
import { PublicResponse } from "./types/requestTypes";
import { getLocalStorage, setLocalStorage } from "@/utils/storages";
import { StorageEnum } from "@/types/StorageTypes";
import { refreshTokenApi } from "./api/userApi";

interface PendingTask {
	config: AxiosRequestConfig;
	resolve: (value: unknown) => void;
}

// 保存刷新 token 时的请求队列
let refreshing = false;
const queue: PendingTask[] = [];

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
	async (err: AxiosError) => {
		const data = err.response!.data as PublicResponse<string>;
		const config = err.response!.config;

		// refresh token 也失效则跳转至登录页
		if (data.code === 401 && config.url?.includes("/refresh")) {
			window.$message.warning(data.data);
			setTimeout(() => {
				window.location.href = "/";
			}, 500);
			return Promise.reject(err);
		}

		if (refreshing) {
			return new Promise((resolve) => {
				queue.push({
					config,
					resolve
				});
			});
		}

		if (data.code === 401 && !config.url?.includes("/refresh")) {
			refreshing = true;
			const refreshToken = getLocalStorage(StorageEnum.J_USER_REFRESH_TOKEN);
			const res = await refreshTokenApi(refreshToken);
			refreshing = false;

			if (res.code === 200) {
				setLocalStorage(StorageEnum.J_USER_ACCESS_TOKEN, res.data.accessToken);
				setLocalStorage(StorageEnum.J_USER_REFRESH_TOKEN, res.data.refreshToken);

				queue.forEach(({ resolve, config }) => {
					resolve(axiosInstance(config));
				});

				return axiosInstance(config);
			} else {
				window.$message.warning(data.data);
				return Promise.reject(err);
			}
		} else {
			window.$message.warning(data.data);
			return Promise.reject(err);
		}
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
