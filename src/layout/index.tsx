import { Layout } from "antd";

import AppMain from "./components/AppMain";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";

const LayoutContainer = () => {
	return (
		<Layout className="h-100vh w-100vw">
			<Layout.Sider width={250}>
				<AppMenu />
			</Layout.Sider>
			<Layout>
				<Layout.Header className="dark:bg-[#18181C] bg-[#18181C] border-b-1 border-[#303030]  px-10">
					<AppHeader />
				</Layout.Header>
				<Layout.Content className="bg-[#000]">
					<AppMain />
				</Layout.Content>
			</Layout>
		</Layout>
	);
};

export default LayoutContainer;
