import JBaseHeader from "@/components/JBaseHeader";
import ReactLogo from "@/assets/react.svg";
import JBaseHeaderRightContent from "@/components/JHeaderRightContent";

const LoginHeader = () => {
	return (
		<JBaseHeader
			left={
				<div className="flex items-center gap-5">
					<img src={ReactLogo} />
					<span className="text-2xl tracking-widest italic">J.O.S.H</span>
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
