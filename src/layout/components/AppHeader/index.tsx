import JBaseHeader from "@/components/JBaseHeader";
import JBaseHeaderRightContent from "@/components/JHeaderRightContent";

const Header = () => {
	return (
		<JBaseHeader
			right={
				<div className="float-right">
					<JBaseHeaderRightContent isLogin />
				</div>
			}
		></JBaseHeader>
	);
};

export default Header;
