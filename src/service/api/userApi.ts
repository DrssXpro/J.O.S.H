import { GET, POST } from "../axios";
import { UserLoginVo, MessageVo, TokenVo } from "../types/requestTypes";

// 登录接口
async function loginApi(data: { username: string; password: string }) {
	return POST<UserLoginVo>("/user/login", data);
}

// 注册接口
async function registerApi(data: { username: string; password: string }) {
	return POST<MessageVo>("/user/register", data);
}

// 刷新 token 接口
async function refreshTokenApi(refreshToken: string) {
	return GET<TokenVo>("/user/refresh", { refreshToken });
}

export { loginApi, registerApi, refreshTokenApi };
