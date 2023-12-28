import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import JLoading from "@/components/JLoading";

const Application = lazy(() => import("@/pages/Application/index"));

const Main = () => {
	return (
		<>
			<Suspense fallback={<JLoading />}>
				<Routes>
					<Route element={<Application />} path="/application"></Route>
				</Routes>
			</Suspense>
		</>
	);
};

export default Main;
