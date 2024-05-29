import { ConfigProvider, message, notification, theme } from "antd";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import zhCN from "antd/locale/zh_CN";
import JWithLoading from "./components/JWithLoading";
import JRequireAuth from "./components/JRequireAuth";
import useDesignStore from "./store/designStore/designStore";
import useStoreSelector from "./hooks/useStoreSelector";

const LoginPage = lazy(() => import("@/pages/Login/index"));
const LayoutPage = lazy(() => import("@/layout/index"));
const ProjectsPage = lazy(() => import("@/pages/Projects/index"));
const TemplatesPage = lazy(() => import("@/pages/Templates/index"));
const WorkBenchPage = lazy(() => import("@/pages/WorkBench/index"));
const PreviewPage = lazy(() => import("@/pages/Preview/index"));
const PublishChartPage = lazy(() => import("@/pages/PublishChart/index"));
const NotFoundPage = lazy(() => import("@/pages/NotFound/index"));

function App() {
	const [messageApi, contextMessageHolder] = message.useMessage();
	const [notificationApi, contextNotificationApiHolder] = notification.useNotification();
	const { systemThemeColor } = useDesignStore(useStoreSelector(["systemThemeColor"]));
	window.$message = messageApi;
	window.$notification = notificationApi;
	return (
		<ConfigProvider
			locale={zhCN}
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					colorPrimary: systemThemeColor ? systemThemeColor.hex : "#1677FF"
				},
				components: {
					Menu: {
						// menu 侧边 border 设置为 0
						activeBarBorderWidth: 0
					},
					Collapse: {
						headerPadding: "10px 0",
						contentPadding: "0"
					},
					Badge: {
						dotSize: 8
					}
				}
			}}
		>
			<JWithLoading
				element={
					<Routes>
						<Route
							element={
								<JWithLoading
									element={<LoginPage />}
									loadingStyle={{ width: "100vw", height: "100vh" }}
								/>
							}
							path="/"
						></Route>
						<Route
							element={
								<JRequireAuth>
									<LayoutPage />
								</JRequireAuth>
							}
							path="/application"
						>
							<Route element={<ProjectsPage />} path="projects"></Route>
							<Route element={<TemplatesPage />} path="templates"></Route>
						</Route>
						<Route
							element={
								<JRequireAuth>
									<WorkBenchPage />
								</JRequireAuth>
							}
							path="/workBench/:projectId"
						></Route>
						<Route
							element={
								<JRequireAuth>
									<JWithLoading
										element={<PreviewPage />}
										loadingStyle={{ width: "100vw", height: "100vh" }}
									/>
								</JRequireAuth>
							}
							path="/preview/:projectId"
						></Route>
						<Route
							element={
								<JWithLoading
									element={<PublishChartPage />}
									loadingStyle={{ width: "100vw", height: "100vh" }}
								/>
							}
							path="/chart/:projectId"
						></Route>
						<Route
							element={
								<JWithLoading
									element={<NotFoundPage />}
									loadingStyle={{ width: "100vw", height: "100vh" }}
								></JWithLoading>
							}
							path="*"
						></Route>
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
