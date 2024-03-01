import { Avatar, Button, Dropdown, type MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { AiOutlineBgColors } from "react-icons/ai";
import { IoSunnyOutline } from "react-icons/io5";
import avatar from "@/assets/avatar.jpg";

const dropMenus: MenuProps["items"] = [
	{
		key: "1",
		label: <NavLink to={"/"}>退出登录</NavLink>
	}
];

const JBaseHeaderRightContent = (props: { isLogin?: boolean }) => {
	const { isLogin = false } = props;
	return (
		<div className="h-full  flex items-center gap-2">
			<Button type="text" icon={<AiOutlineBgColors />} size="large" />
			<Button type="text" icon={<IoSunnyOutline size={20} />} size="large" />
			{isLogin && (
				<Dropdown menu={{ items: dropMenus }} placement="bottom" className="cursor-pointer ml-3">
					<Avatar src={avatar} size={40} />
				</Dropdown>
			)}
		</div>
	);
};

export default JBaseHeaderRightContent;
