import { ConfigProvider, message, notification, theme } from "antd";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import JWithLoading from "./components/JWithLoading";
import Preview from "./pages/Preview";

const Login = lazy(() => import("@/pages/Login/index"));

const Layout = lazy(() => import("@/layout/index"));
const Projects = lazy(() => import("@/pages/Projects/index"));
const WorkBench = lazy(() => import("@/pages/WorkBench/index"));

function App() {
	const [messageApi, contextMessageHolder] = message.useMessage();
	const [notificationApi, contextNotificationApiHolder] = notification.useNotification();
	window.$message = messageApi;
	window.$notification = notificationApi;
	return (
		<ConfigProvider
			locale={zhCN}
			theme={{
				algorithm: theme.darkAlgorithm,
				components: {
					Menu: {
						// menu 侧边 border 设置为 0
						activeBarBorderWidth: 0
					},
					Collapse: {
						headerPadding: "10px 0",
						contentPadding: "0"
					}
				}
			}}
		>
			<JWithLoading
				element={
					<Routes>
						<Route element={<Login />} path="/"></Route>
						<Route element={<Layout />} path="/application">
							<Route element={<Projects />} path="projects"></Route>
						</Route>
						<Route element={<WorkBench />} path="/workBench"></Route>
						<Route element={<Preview />} path="/preview/1"></Route>
					</Routes>
				}
				loadingStyle={{ width: "100vw", height: "100vh" }}
			/>
			{contextNotificationApiHolder}
			{contextMessageHolder}
		</ConfigProvider>
	);
}

export default App;
