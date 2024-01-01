import JBaseHeader from "@/components/JBaseHeader";
import Logo from "@/assets/logo/logo.png";
import LogoTitleDark from "@/assets/logo/title-dark.png";
import JBaseHeaderRightContent from "@/components/JHeaderRightContent";

const LoginHeader = () => {
	return (
		<JBaseHeader
			left={
				<div className="flex items-center">
					<img src={Logo} className="w-15 h-10" />
					<img src={LogoTitleDark} className="w-25" />
				</div>
			}
			right={
				<div className="float-right">
					<JBaseHeaderRightContent />
				</div>
			}
		></JBaseHeader>
	);
};

export default LoginHeader;
