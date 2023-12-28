import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import JLoading from "@/components/JLoading";

const Login = lazy(() => import("@/pages/Login/index"));
const Main = () => {
	return (
		<>
			<Suspense fallback={<JLoading />}>
				<Routes>
					<Route element={<Login />} path="/"></Route>
					<Route element={<Login />} path="/login"></Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default Main;
