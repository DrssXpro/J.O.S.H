import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import { AiFillHome, AiOutlinePieChart } from "react-icons/ai";
import { Menu, type MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
}

const items: MenuItem[] = [getItem("我的应用", "1", <AiFillHome />), getItem("模板市场", "2", <AiOutlinePieChart />)];

const SideMenu = () => {
	return (
		<div className="w-full">
			<div className="h-16 p-5 mb-5 border-b-1 border-b-solid border-[#303030] flex items-center ">
				<img src={Logo} className="w-15 h-10" />
				<img src={LogoTitleDark} className="w-25" />
			</div>
			<Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
		</div>
	);
};

export default SideMenu;
