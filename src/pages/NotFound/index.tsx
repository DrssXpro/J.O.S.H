import { requireErrorImg } from "@/utils/utils";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
	const nav = useNavigate();
	return (
		<div className="w-screen h-screen bg-[#18181C] flex items-center justify-center flex-col gap-5">
			<img src={requireErrorImg()} alt="404" className="w-120 h-80" />
			<Button type="primary" onClick={() => nav("/application/projects")}>
				回到首页
			</Button>
		</div>
	);
};

export default NotFoundPage;
