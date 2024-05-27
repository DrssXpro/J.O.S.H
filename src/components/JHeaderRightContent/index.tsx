import { useEffect, useState } from "react";
import { Avatar, Button, Divider, Dropdown, Modal, Typography, type MenuProps } from "antd";
import useUserStore from "@/store/userStore/userStore";
import { NavLink } from "react-router-dom";
import avatar from "@/assets/avatar.jpg";
import themeColorImage from "@/assets/images/theme-color.png";
import useStoreSelector from "@/hooks/useStoreSelector";
import { AiOutlineBgColors } from "react-icons/ai";
import ColorList from "./components/ColorList";
import designColor from "@/theme/DesignColor/designColor.json";
import { DesignColorType } from "@/theme/DesignColor/types";
import useDesignStore from "@/store/designStore/designStore";

let sliceSize = 30;

const JDesignColor = () => {
	const [showModal, setshowModal] = useState(false);
	const [colorList, setColorList] = useState<DesignColorType[]>(designColor.slice(0, sliceSize));

	const { systemThemeColor, updateDesign } = useDesignStore(useStoreSelector(["systemThemeColor", "updateDesign"]));

	useEffect(() => {
		showModal && getColorList();
	}, [showModal]);

	const getColorList = () => {
		setTimeout(() => {
			sliceSize += sliceSize;
			const list = designColor.slice(0, sliceSize);
			if (list.length !== designColor.length && showModal) {
				setColorList(list);
				window.requestAnimationFrame(getColorList);
			}
		}, 1000);
	};

	return (
		<>
			<Button type="text" icon={<AiOutlineBgColors />} size="large" onClick={() => setshowModal(true)} />
			<Modal
				className="min-w-[1100px]"
				title="主题色选择"
				style={{ top: "5vh" }}
				styles={{ header: { background: "none" } }}
				width={"80vw"}
				open={showModal}
				onCancel={() => {
					setshowModal(false);
					sliceSize = 30;
					setColorList(designColor.slice(0, sliceSize));
				}}
				footer={null}
			>
				<Divider />
				<div className="flex h-[75vh] overflow-scroll">
					<div className="w-full mr-[350px]">
						<ColorList
							colorList={colorList}
							selectColor={(detail) => {
								updateDesign("systemThemeColor", detail);
							}}
						/>
					</div>
					<div className="w-[300px] h-[90%] flex flex-col justify-between absolute top-10 right-5">
						<div className="flex items-center flex-1">
							<div className="flex-1 flex flex-col items-center">
								<Typography.Text
									style={{
										fontSize: "80px",
										fontFamily: "colorFont",
										margin: "0 auto",
										display: "block",
										width: "110px",
										textAlign: "center"
									}}
								>
									{systemThemeColor ? systemThemeColor.name : "中国色"}
								</Typography.Text>
								{systemThemeColor && (
									<Typography.Text className="text-xl" style={{ fontFamily: "Georgia" }}>
										MOLIHUANG
									</Typography.Text>
								)}
								{systemThemeColor && (
									<div
										className="w-[110px] h-5  mt-6 rounded"
										style={{
											background: systemThemeColor.hex
										}}
									></div>
								)}
							</div>
							<img src={themeColorImage} alt="主题色" />
						</div>
						<div className="text-center">
							中国色列表来自于：
							<Typography.Link href="http://zhongguose.com" target="_blank">
								http://zhongguose.com
							</Typography.Link>
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

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
			<JDesignColor />
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
