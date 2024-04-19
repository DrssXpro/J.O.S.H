import { Layout } from "antd";

import AppMain from "./components/AppMain";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";

const LayoutContainer = () => {
	return (
		<Layout>
			<Layout.Sider width={250} className="bg-[#18181C] border-r-1 border-r-solid border-[#303030]" theme="light">
				<AppMenu />
			</Layout.Sider>
			<Layout>
				<Layout.Header className="bg-[#18181C] border-b-solid border-b-1 border-[#303030]  px-10">
					<AppHeader />
				</Layout.Header>
				<Layout.Content className="bg-[#000] p-5 overflow-auto">
					<AppMain />
				</Layout.Content>
			</Layout>
		</Layout>
	);
};

export default LayoutContainer;
