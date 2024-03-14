import { Card, Checkbox, Form, Input, Button } from "antd";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginBox = () => {
	const nav = useNavigate();
	const [userInfo, setUserInfo] = useState({
		name: "async",
		password: "123456"
	});
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
				<Form.Item>
					<Checkbox>自动登录</Checkbox>
				</Form.Item>
				<Button
					type="primary"
					style={{ width: "100%" }}
					onClick={() => {
						nav("/application/projects");
					}}
				>
					登录
				</Button>
			</Form>
		</Card>
	);
};

export default LoginBox;
