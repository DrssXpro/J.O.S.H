import { forwardRef, useImperativeHandle, useState, lazy } from "react";
import { Button, ColorPicker, Divider, Input, Modal, Tag, Tooltip, theme } from "antd";
import { IoDuplicateOutline, IoArrowDown, IoTrash, IoAdd } from "react-icons/io5";
import styles from "./style/colorboxStyle.module.css";

const RenderColorChart = lazy(() => import("../RenderColorChart/index"));

export interface ColorModalRef {
	controllModal: (status: boolean) => void;
}

const arr = new Array(27).fill(1);
const arr2 = new Array(7).fill(1);
const CreateColorModal = forwardRef<ColorModalRef>((_, ref) => {
	const [isOpen, setIsOpen] = useState(false);
	const { token } = theme.useToken();

	useImperativeHandle(ref, () => ({
		controllModal: setIsOpen
	}));

	return (
		<Modal
			open={isOpen}
			closable={false}
			style={{ top: "5vh" }}
			width="900px"
			footer={
				<div className="flex justify-end">
					<Button
						onClick={() => {
							setIsOpen(false);
						}}
					>
						操作完成
					</Button>
				</div>
			}
		>
			<div className="flex h-[700px] gap-4">
				<div className="flex-1 flex flex-col justify-between">
					<div className="rounded bg-[#2C2C32] p-4">
						<div className="flex justify-between">
							<Input className="w-65" value={"未命名"} addonBefore="名称：" showCount maxLength={8} />
							<Tag color="processing">底部图表仅展示 7 条数据</Tag>
						</div>
						<div className="mt-4 flex flex-wrap max-h-[132px] overflow-scroll">
							{arr2.map((_, index) => (
								<div key={index} className="w-1/4 mb-3 flex items-center gap-1">
									<ColorPicker
										className="w-[96px]"
										style={{ border: `2px solid ${token.colorPrimaryBorder}` }}
										showText
										value={"#fff"}
									/>
									{index >= 6 && (
										<Tooltip title="删除颜色">
											<IoTrash className="cursor-pointer" color="#8D8D8F" />
										</Tooltip>
									)}
								</div>
							))}
							<Button className="w-[96px]" type="primary" ghost>
								<div className="flex items-center">
									<span>添加</span>
									<IoAdd />
								</div>
							</Button>
						</div>
					</div>
					<div className="flex gap-4">
						<div className="rounded bg-[#2C2C32] p-4 flex-1">
							<div>默认扩展色：</div>
							<Divider className="my-3" />
							<div className="flex gap-1 flex-wrap">
								{arr.map((_, index) => (
									<div
										className="relative w-6 h-6 rounded overflow-hidden cursor-pointer"
										key={index}
									>
										<div className={styles["color-picker-box"]}></div>
									</div>
								))}
							</div>
						</div>
						<div className="rounded bg-[#2C2C32] p-4 flex-1">
							<div>透明扩展色：</div>
							<Divider className="my-3" />
							<div className="flex gap-1 flex-wrap">
								{arr.map((_, index) => (
									<div
										className="relative w-6 h-6 rounded overflow-hidden cursor-pointer"
										key={index}
									>
										<div className={styles["color-picker-box"]}></div>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="rounded bg-[#2C2C32] p-4">
						<RenderColorChart color={["#fff", "#f00", "#000"]} />
					</div>
				</div>
				<Divider type="vertical" className="h-full" />
				<div className="w-60">
					<div className="flex items-center gap-2">
						<Button icon={<IoDuplicateOutline />} className="flex-1">
							创建
						</Button>
						<Button icon={<IoArrowDown />} className="flex-1" type="primary" ghost>
							应用数据
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	);
});

export default CreateColorModal;
