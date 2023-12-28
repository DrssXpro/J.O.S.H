import { Card, Checkbox, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ricons/antd";
import ReactLogo from "@/assets/react.svg";
import JIcon from "@/components/JIcon";

const LoginBox = () => {
	return (
		<Card className="w-90 h-100  bg-[#232324b3]" style={{ backdropFilter: "blur(15px)" }}>
			<div className="w-full my-5 flex flex-col items-center justify-center">
				<img src={ReactLogo} className="w-20 h-20" />
				<span className="text-">J.O.S.H</span>
			</div>
			<Form>
				<Form.Item>
					<Input prefix={<JIcon icon={<UserOutlined />} />} placeholder="请输入账号"></Input>
				</Form.Item>
				<Form.Item>
					<Input.Password
						prefix={<JIcon icon={<LockOutlined />} />}
						placeholder="请输入密码"
					></Input.Password>
				</Form.Item>
				<Form.Item>
					<Checkbox>自动登录</Checkbox>
				</Form.Item>
				<Button type="primary" style={{ width: "100%" }}>
					登录
				</Button>
			</Form>
		</Card>
	);
};

export default LoginBox;
