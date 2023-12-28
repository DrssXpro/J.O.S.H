import { Button } from "antd";
import JBaseHeader from "@/components/JBaseHeader";
import JIcon from "@/components/JIcon";
import { SunnyOutline } from "@ricons/ionicons5";
import { BgColorsOutlined } from "@ant-design/icons";
import ReactLogo from "@/assets/react.svg";

const LoginHeader = () => {
	return (
		<JBaseHeader
			left={
				<div className="flex items-center gap-5">
					<img src={ReactLogo} />
					<span className="text-2xl tracking-widest italic">J.O.S.H</span>
				</div>
			}
			right={
				<div className="h-full float-right  flex items-center gap-3">
					<Button type="text" icon={<BgColorsOutlined />} size="large" />
					<Button type="text" icon={<JIcon icon={<SunnyOutline />} size={22} />} size="large" />
				</div>
			}
		></JBaseHeader>
	);
};

export default LoginHeader;
