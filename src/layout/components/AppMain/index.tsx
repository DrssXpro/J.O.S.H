import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import JLoading from "@/components/JLoading";

const Main = () => {
	return (
		<>
			<Suspense fallback={<JLoading />}>
				<Outlet />
			</Suspense>
		</>
	);
};

export default Main;
