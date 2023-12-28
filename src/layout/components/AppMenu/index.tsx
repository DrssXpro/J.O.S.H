import JIcon from "@/components/JIcon";
import { AppstoreOutlined, ContainerOutlined, DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

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
	getItem("Option 1", "1", <JIcon icon={<PieChartOutlined />} size={20} />),
	getItem("Option 2", "2", <JIcon icon={<AppstoreOutlined />} size={20} />),
	getItem("Option 3", "3", <JIcon icon={<ContainerOutlined />} size={20} />),

	getItem("Navigation Two", "sub2", <JIcon icon={<DesktopOutlined />} size={20} />, [
		getItem("Option 9", "9"),
		getItem("Option 10", "10"),
		getItem("Submenu", "sub3", null, [getItem("Option 11", "11"), getItem("Option 12", "12")])
	])
];

const SideMenu = () => {
	return (
		<div className="w-full">
			<Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" items={items} />
		</div>
	);
};

export default SideMenu;
