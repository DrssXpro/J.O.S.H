import ReactLogo from "@/assets/react.svg";
import { HomeFilled, DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
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

const items: MenuItem[] = [
	getItem("首页", "1", <HomeFilled />),
	getItem("模板市场", "2", <PieChartOutlined />),
	getItem("应用中心", "3", <DesktopOutlined />)
];

const SideMenu = () => {
	return (
		<div className="w-full">
			<div className="h-16 p-5 mb-5 border-b-1 border-[#303030] flex items-center  gap-5">
				<img src={ReactLogo} />
				<span className="text-white text-2xl tracking-widest italic">J.O.S.H</span>
			</div>
			<Menu defaultSelectedKeys={["1"]} mode="inline" items={items} />
		</div>
	);
};

export default SideMenu;
