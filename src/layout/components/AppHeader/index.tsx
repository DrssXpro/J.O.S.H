import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import JBaseHeader from "@/components/JBaseHeader";
import JIcon from "@/components/JIcon";
import { SunnyOutline } from "@ricons/ionicons5";
import { BgColorsOutlined } from "@ant-design/icons";
import avatar from "@/assets/avatar.jpg";
import { NavLink } from "react-router-dom";

const dropMenus: MenuProps["items"] = [
	{
		key: "1",
		label: <NavLink to={"/"}>退出登录</NavLink>
	}
];

const Header = () => {
	return (
		<JBaseHeader
			right={
				<div className="h-full float-right  flex items-center gap-5">
					<Button type="text" icon={<BgColorsOutlined />} size="large" />
					<Button type="text" icon={<JIcon icon={<SunnyOutline />} size={24} />} size="large" />
					<Dropdown menu={{ items: dropMenus }} placement="bottom" className="cursor-pointer">
						<Avatar src={avatar} size={40} />
					</Dropdown>
				</div>
			}
		></JBaseHeader>
	);
};

export default Header;
