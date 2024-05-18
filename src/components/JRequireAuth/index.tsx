import useStoreSelector from "@/hooks/useStoreSelector";
import useUserStore from "@/store/userStore/userStore";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface JRequireAuthProps {
	to?: string;
	children: React.ReactNode;
}

const JRequireAuth = (props: JRequireAuthProps) => {
	const { children, to = "/" } = props;
	const { userInfo } = useUserStore(useStoreSelector(["userInfo"]));
	const location = useLocation();

	useEffect(() => {
		typeof userInfo !== "object" && window.$message.warning("请先登录！");
	}, []);

	return <>{typeof userInfo === "object" ? children : <Navigate to={to} state={{ from: location }} replace />}</>;
};

export default JRequireAuth;
