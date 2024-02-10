import { Outlet } from "react-router-dom";
import JWithLoading from "@/components/JWithLoading";

const Main = () => {
	return <JWithLoading element={<Outlet />} loadingStyle={{ width: "100vw", height: "100vh" }} />;
};

export default Main;
