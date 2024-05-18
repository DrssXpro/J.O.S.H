import { Avatar, Button, Dropdown, Typography, type MenuProps } from "antd";
import useUserStore from "@/store/userStore/userStore";
import { NavLink } from "react-router-dom";
import { AiOutlineBgColors } from "react-icons/ai";
import avatar from "@/assets/avatar.jpg";
import useStoreSelector from "@/hooks/useStoreSelector";

const JBaseHeaderRightContent = (props: { isLogin?: boolean }) => {
	const { isLogin = false } = props;
	const { userInfo, outAndClearInfo } = useUserStore(useStoreSelector(["userInfo", "outAndClearInfo"]));

	const dropMenus: MenuProps["items"] = [
		{
			key: "1",
			label: (
				<NavLink
					to={"/"}
					onClick={() => {
						outAndClearInfo();
					}}
				>
					退出登录
				</NavLink>
			)
		}
	];
	return (
		<div className="h-full  flex items-center gap-2">
			<Button type="text" icon={<AiOutlineBgColors />} size="large" />
			{isLogin && (
				<Dropdown menu={{ items: dropMenus }} placement="bottom" className="cursor-pointer ml-3">
					<div className="flex items-center gap-2">
						<Avatar src={avatar} size={40} />
						<Typography.Text>{userInfo?.username}</Typography.Text>
					</div>
				</Dropdown>
			)}
		</div>
	);
};

export default JBaseHeaderRightContent;
