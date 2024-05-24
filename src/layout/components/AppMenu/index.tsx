import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import { AiFillHome, AiOutlinePieChart } from "react-icons/ai";
import { Menu, type MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

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

const items: MenuItem[] = [
	getItem("我的应用", "projects", <AiFillHome />),
	getItem("模板市场", "templates", <AiOutlinePieChart />)
];

const SideMenu = () => {
	const nav = useNavigate();
	return (
		<div className="w-full">
			<div className="h-16 p-5 mb-5 border-b-1 border-b-solid border-[#303030] flex items-center ">
				<img src={Logo} className="w-15 h-10" />
				<img src={LogoTitleDark} className="w-25" />
			</div>
			<Menu
				defaultSelectedKeys={["projects"]}
				mode="inline"
				items={items}
				onClick={(info) => {
					console.log(info);
					nav(`/application/${info.key}`);
				}}
			/>
		</div>
	);
};

export default SideMenu;
