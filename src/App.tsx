import { ConfigProvider, theme } from "antd";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import JLoading from "./components/JLoading";

const Login = lazy(() => import("@/pages/Login/index"));

const Layout = lazy(() => import("@/layout/index"));

function App() {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm
			}}
		>
			<Suspense fallback={<JLoading />}>
				<Routes>
					<Route element={<Login />} path="/"></Route>
					<Route element={<Layout />} path="/application"></Route>
				</Routes>
			</Suspense>
		</ConfigProvider>
	);
}

export default App;
