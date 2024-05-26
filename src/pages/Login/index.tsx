import { Layout } from "antd";
import LoginBox from "./components/LoginBox";
import LoginCarousel from "./components/LoginCarousel";
import LoginHeader from "./components/LoginHeader";
import BgLeft from "@/assets/bg-left.svg";
import BgRight from "@/assets/bg-right.svg";

const LoginPage = () => {
	return (
		<Layout className="h-screen w-screen">
			<Layout.Header className="dark:bg-[#18181C] bg-[#18181C] border-b-1 border-b-solid border-[#303030]  px-10">
				<LoginHeader />
			</Layout.Header>
			<Layout.Content className="bg-[#18181C]">
				<div className="w-full h-full flex items-center justify-around relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-full">
						<img src={BgLeft} className="w-1/2 absolute -top-30 left-0" />
						<img src={BgRight} className="w-1/2 absolute top-0 right-100" />
						<img
							src={BgRight}
							className="w-1/2 absolute top-0 right-10 "
							style={{ transform: "rotate(90deg)" }}
						/>
					</div>
					<LoginCarousel />
					<LoginBox />
				</div>
			</Layout.Content>
		</Layout>
	);
};

export default LoginPage;
