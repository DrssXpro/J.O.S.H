import { POST } from "../axios";
import { UserLoginVo, MessageVo } from "../types/requestTypes";

// 登录接口
async function loginApi(data: { username: string; password: string }) {
	return POST<UserLoginVo>("/user/login", data);
}

// 注册接口
async function registerApi(data: { username: string; password: string }) {
	return POST<MessageVo>("/user/register", data);
}

export { loginApi, registerApi };
