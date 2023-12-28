import JIcon from "@/components/JIcon";
import { SunnyOutline } from "@ricons/ionicons5";
import { BgColorsOutlined } from "@ricons/antd";
import ReactLogo from "@/assets/react.svg";
import { Button } from "antd";

const Header = () => {
	return (
		<>
			<div className="h-full  float-left flex items-center gap-5">
				<img src={ReactLogo} />
				<span className="text-2xl tracking-widest italic">J.O.S.H</span>
			</div>
			<div className="h-full float-right  flex items-center gap-5">
				<Button type="text" icon={<JIcon icon={<BgColorsOutlined />} size={22} />} size="large" />
				<Button type="text" icon={<JIcon icon={<SunnyOutline />} size={22} />} size="large" />
			</div>
		</>
	);
};

export default Header;
