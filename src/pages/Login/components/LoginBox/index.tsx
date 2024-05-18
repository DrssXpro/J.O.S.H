import { Card, Form, Input, Button } from "antd";
import { AiOutlineUser, AiOutlineLock, AiOutlineBug } from "react-icons/ai";
import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "@/service/api/userApi";
import { setLocalStorage } from "@/utils/storages";
import { StorageEnum } from "@/types/StorageTypes";
import useUserStore from "@/store/userStore/userStore";

const LoginBox = () => {
	const nav = useNavigate();
	const { setUserInfo: saveUserInfo } = useUserStore((selector) => ({ setUserInfo: selector.setUserInfo }));
	const [isRegister, setIsRegister] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "",
		password: "",
		repeatPassword: ""
	});

	const handleLogin = async () => {
		const res = await loginApi({ username: userInfo.name, password: userInfo.password });
		if (res.code === 201 && typeof res.data !== "string") {
			const data = res.data;
			setLocalStorage(StorageEnum.J_USER_ACCESS_TOKEN, data.accessToken);
			setLocalStorage(StorageEnum.J_USER_REFRESH_TOKEN, data.refreshToken);
			saveUserInfo(data.userInfo);
			window.$message.success("登录成功");
			nav("/application/projects");
		} else {
			window.$message.warning(res.data as string);
		}
	};

	const handleRegister = async () => {
		if (userInfo.password !== userInfo.repeatPassword) {
			window.$message.warning("两次密码输入不一致");
			return;
		}
		const res = await registerApi({ username: userInfo.name, password: userInfo.password });
		if (res.code === 201) {
			window.$message.success(res.data);
			setIsRegister(false);
		} else {
			window.$message.warning(res.data);
		}
	};

	return (
		<Card className="w-90 bg-[#232324b3]" style={{ backdropFilter: "blur(15px)" }}>
			<div className="w-full mb-2 flex flex-col items-center justify-center">
				<img src={Logo} className="w-30 h-20" />
				<img src={LogoTitleDark} className="w-40 h-15" />
			</div>
			<Form>
				<Form.Item>
					<Input
						prefix={<AiOutlineUser />}
						placeholder="请输入账号"
						value={userInfo.name}
						onChange={(e) => {
							setUserInfo((info) => ({ ...info, name: e.target.value }));
						}}
					></Input>
				</Form.Item>
				<Form.Item>
					<Input.Password
						prefix={<AiOutlineLock />}
						placeholder="请输入密码"
						value={userInfo.password}
						onChange={(e) => {
							setUserInfo((info) => ({ ...info, password: e.target.value }));
						}}
					></Input.Password>
				</Form.Item>
				{isRegister && (
					<Form.Item>
						<Input.Password
							prefix={<AiOutlineBug />}
							placeholder="请再次输入密码"
							value={userInfo.repeatPassword}
							onChange={(e) => {
								setUserInfo((info) => ({ ...info, repeatPassword: e.target.value }));
							}}
						></Input.Password>
					</Form.Item>
				)}
				<div className="flex flex-col gap-4">
					<Button
						type="primary"
						block
						onClick={() => {
							isRegister ? handleRegister() : handleLogin();
						}}
					>
						{isRegister ? "注册" : "登录"}
					</Button>
					<Button block onClick={() => setIsRegister(!isRegister)}>
						{isRegister ? "返回" : "注册"}
					</Button>
				</div>
			</Form>
		</Card>
	);
};

export default LoginBox;
