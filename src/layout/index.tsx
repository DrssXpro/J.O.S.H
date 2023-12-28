import { Layout } from "antd";

import Main from "./components/Main";
import Header from "./components/Header";

const LayoutContainer = () => {
	return (
		<Layout className="h-100vh w-100vw">
			<Layout.Header className="dark:bg-[#18181C] bg-[#18181C] border-b-1 border-[#303030]  px-10">
				<Header />
			</Layout.Header>
			<Layout.Content className="bg-[#18181C]">
				<Main />
			</Layout.Content>
		</Layout>
	);
};

export default LayoutContainer;
