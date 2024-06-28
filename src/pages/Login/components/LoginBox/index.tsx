import { Card, Form, Input, Button } from "antd";
import { AiOutlineUser, AiOutlineLock, AiOutlineBug } from "react-icons/ai";
import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginBox = () => {
	const nav = useNavigate();
	const [isRegister, setIsRegister] = useState(false);
	const [userInfo, setUserInfo] = useState({
		name: "async",
		password: "123456",
		repeatPassword: ""
	});

	const handleLogin = () => {
		window.$message.success("登录成功");
		nav("/application/projects");
	};

	const handleRegister = () => {
		if (userInfo.password !== userInfo.repeatPassword) {
			window.$message.warning("两次密码输入不一致");
			return;
		}
		window.$message.success("注册成功");
		setIsRegister(false);
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
