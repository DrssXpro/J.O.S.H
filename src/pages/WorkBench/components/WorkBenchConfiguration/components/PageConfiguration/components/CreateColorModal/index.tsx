import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { Badge, Button, ColorPicker, Divider, Input, Modal, Popconfirm, Tooltip, Typography, theme } from "antd";
import { nanoid } from "nanoid";
import RenderColorChart from "../RenderColorChart";
import useDesignStore from "@/store/designStore/designStore";
import useStoreSelector from "@/hooks/useStoreSelector";
import { darken, fade, lighten } from "@/utils/colorStyle";
import { IoDuplicateOutline, IoArrowDown, IoTrash, IoAdd } from "react-icons/io5";
import styles from "./style/colorboxStyle.module.css";
import { CustomColorsType } from "@/theme";
import noDataImage from "@/assets/images/no-data.png";
import { produce } from "immer";
import ColorCard from "../ColorCard";

export interface ColorModalRef {
	controllModal: (status: boolean) => void;
}

interface CustomStateType {
	current: CustomColorsType | undefined;
	selectColorIndex: number;
	selectSingleColorIndex: number;
}

// 默认颜色组
const createDefaultColor = (): CustomColorsType => ({
	id: nanoid(5),
	name: "未命名",
	color: ["#6ae5bb", "#69e3de", "#5ac5ee", "#5ac4ee", "#4498ec", "#3c7ddf"]
});

const CreateColorModal = forwardRef<ColorModalRef>((_, ref) => {
	const { token } = theme.useToken();
	const [modal, contextHolder] = Modal.useModal();
	const { customChartThemeColorList, updateDesign } = useDesignStore(
		useStoreSelector(["customChartThemeColorList", "updateDesign"])
	);

	const [isOpen, setIsOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [customState, setCustomState] = useState<CustomStateType>({
		current: customChartThemeColorList.length ? customChartThemeColorList[0] : undefined,
		// 颜色组索引
		selectColorIndex: 0,
		// 单个颜色索引
		selectSingleColorIndex: 0
	});

	// 计算扩展背景色
	const expandColorList = useMemo(() => {
		if (!customState.current)
			return {
				default: [],
				fade: []
			};
		const num: number = 36;
		const comDarkenArr: string[] = [];
		const comLightenArr: string[] = [];
		const comDarkenFadeArr: string[] = [];

		for (let i = 0; i < num; i++) {
			comLightenArr.unshift(
				lighten(customState.current.color[customState.selectSingleColorIndex], (1 / 100) * (i + 1))
			);
			comDarkenArr.push(
				darken(customState.current.color[customState.selectSingleColorIndex], (3.5 / 100) * (i + 1))
			);
		}

		// 透明
		comDarkenArr.forEach((item, i) => {
			comDarkenFadeArr.unshift(fade(item, (1 / 100) * (i + 1)));
		});

		return {
			default: [
				...comLightenArr.reverse().splice(0, parseInt(`${num / 2}`) - 9),
				...comDarkenArr.splice(0, parseInt(`${num / 2}`))
			],
			fade: comDarkenFadeArr.reverse().splice(0, 27)
		};
	}, [customState.selectSingleColorIndex]);

	// 创建新颜色组
	const handleCreateColor = () => {
		const newColor = createDefaultColor();
		updateDesign("customChartThemeColorList", [newColor, ...customChartThemeColorList]);
		setCustomState({ current: newColor, selectSingleColorIndex: 0, selectColorIndex: 0 });
	};

	// 修改颜色组名称
	const handleChangeColorName = (name: string) => {
		setCustomState(
			produce((draft) => {
				draft.current!.name = name;
				setIsUpdate(true);
			})
		);
	};

	// 新增单个颜色
	const handleAddSingleColor = () => {
		setCustomState(
			produce((draft) => {
				const currentColor =
					draft.current!.color[draft.selectSingleColorIndex] ||
					draft.current!.color[draft.current!.color.length - 1];
				draft.current!.color.push(currentColor);
			})
		);
		setIsUpdate(true);
	};

	// 删除单个颜色
	const handleDeleteSingleColor = () => {
		setCustomState(
			produce((draft) => {
				if (draft.current?.color.length === 6) {
					window.$message.warning("删除失败，颜色不能少于 6 个");
					return;
				}
				if (draft.selectSingleColorIndex !== -1) {
					draft.current!.color.splice(draft.selectSingleColorIndex, 1);
					setIsUpdate(true);
				}
			})
		);
	};

	// 修改单个颜色
	const handleChangeSingleColor = (color: string, index: number) => {
		setCustomState(
			produce((draft) => {
				draft.current!.color[index] = color;
				setIsUpdate(true);
			})
		);
	};

	// 应用当前颜色组
	const handleApplyColor = () => {
		if (customState.selectColorIndex !== -1) {
			const newColorList = [...customChartThemeColorList];
			newColorList[customState.selectColorIndex] = customState.current!;
			updateDesign("customChartThemeColorList", newColorList);
			setCustomState(
				produce((draft) => {
					draft.selectSingleColorIndex = 0;
				})
			);
			window.$message.success("保存成功");
			setIsUpdate(false);
		}
	};

	useImperativeHandle(ref, () => ({
		controllModal: setIsOpen
	}));

	return (
		<Modal
			open={isOpen}
			closable={false}
			style={{ top: "5vh" }}
			className="min-w-[1000px]"
			footer={
				<div className="flex justify-end">
					<Button
						onClick={() => {
							if (isUpdate) {
								const instance = modal.warning({
									title: "提示",
									content: <div>当前有变动未保存，是否直接放弃修改？</div>,
									footer: (
										<div className="flex justify-end gap-2 mt-2">
											<Button
												onClick={() => {
													instance.destroy();
												}}
											>
												取消
											</Button>
											<Button
												type="primary"
												onClick={() => {
													instance.destroy();
													setIsOpen(false);
												}}
											>
												确定
											</Button>
										</div>
									)
								});
							} else {
								setIsOpen(false);
							}
						}}
					>
						操作完成
					</Button>
				</div>
			}
		>
			<div className="flex h-[700px] gap-4">
				<div className="flex-1 flex flex-col justify-between">
					{!customState.current ? (
						<div className="w-full h-full flex justify-center items-center flex-col gap-2">
							<img className="w-50 h-40" src={noDataImage} alt="暂无选择颜色" />
							<Typography.Text type="secondary">暂未选择自定义颜色</Typography.Text>
						</div>
					) : (
						<>
							<div className="rounded bg-[#2C2C32] p-4">
								<div className="flex justify-between">
									<Input
										className="w-65"
										value={customState.current.name}
										onChange={(e) => handleChangeColorName(e.target.value)}
										addonBefore="名称："
										showCount
										maxLength={8}
									/>
									<div className="flex gap-2">
										<Button
											className="ml-1 w-[100px]"
											type="primary"
											icon={<IoAdd />}
											onClick={handleAddSingleColor}
										>
											添加
										</Button>
										<Button
											className="ml-1 w-[100px]"
											type="primary"
											danger
											icon={<IoTrash />}
											onClick={handleDeleteSingleColor}
										>
											删除
										</Button>
									</div>
								</div>
								<div className="mt-4 flex flex-wrap max-h-[132px] overflow-scroll">
									{customState.current.color.map((color, index) => (
										<div
											key={index}
											className="w-1/4 mb-3"
											onClick={() => {
												setCustomState(
													produce((draft) => {
														draft.selectSingleColorIndex = index;
													})
												);
											}}
										>
											<ColorPicker
												className="w-[130px]"
												style={{
													border:
														customState.selectSingleColorIndex === index
															? `2px solid ${token.colorPrimary}`
															: undefined
												}}
												showText
												value={color}
												onChange={(val) => {
													const color = val.toHexString();
													handleChangeSingleColor(color, index);
												}}
											/>
										</div>
									))}
								</div>
							</div>
							<div className="flex gap-4">
								<div className="rounded bg-[#2C2C32] p-4 flex-1">
									<div>默认扩展色：</div>
									<Divider className="my-3" />
									<div className="flex gap-1 flex-wrap justify-center">
										{expandColorList.default.map((color, index) => (
											<div
												className="relative w-[22px] h-[22px] rounded overflow-hidden cursor-pointer"
												key={index}
												onClick={() => {
													handleChangeSingleColor(color, customState.selectSingleColorIndex);
												}}
											>
												<div className={styles["color-picker-box"]}></div>
												<div
													className="w-full h-full absolute top-0 left-0"
													style={{ background: color }}
												></div>
											</div>
										))}
									</div>
								</div>
								<div className="rounded bg-[#2C2C32] p-4 flex-1">
									<div>透明扩展色：</div>
									<Divider className="my-3" />
									<div className="flex gap-1 flex-wrap justify-center">
										{expandColorList.fade.map((color, index) => (
											<div
												className="relative w-[22px] h-[22px] rounded overflow-hidden cursor-pointer"
												key={index}
												onClick={() => {
													handleChangeSingleColor(color, customState.selectSingleColorIndex);
												}}
											>
												<div className={`${styles["color-picker-box"]} rounded`}></div>
												<div
													className="w-full h-full absolute top-0 left-0 rounded"
													style={{ background: color }}
												></div>
											</div>
										))}
									</div>
								</div>
							</div>
							<div className="rounded bg-[#2C2C32] p-4">
								<RenderColorChart color={customState.current.color.slice(0, 7)} />
							</div>
						</>
					)}
				</div>
				<Divider type="vertical" className="h-full" />
				<div className="w-80">
					<div className="flex items-center gap-2">
						<Button icon={<IoDuplicateOutline />} danger className="flex-1" onClick={handleCreateColor}>
							创建
						</Button>
						{customState.current && (
							<Badge dot={isUpdate} className="flex-1">
								<Button
									icon={<IoArrowDown />}
									className="w-full"
									type="primary"
									onClick={handleApplyColor}
								>
									应用数据
								</Button>
							</Badge>
						)}
					</div>
					<Divider className="my-4" />
					<div className="flex flex-col gap-2 ">
						{customChartThemeColorList.map((i, index) => (
							<div className="flex items-center gap-2" key={index}>
								<ColorCard
									color={i}
									active={index === customState.selectColorIndex}
									key={index}
									clickCard={(color) => {
										setCustomState({
											selectColorIndex: index,
											selectSingleColorIndex: 0,
											current: color as CustomColorsType
										});
									}}
								/>
								<Tooltip title="删除自定义颜色">
									<Popconfirm
										title="提示"
										description="是否删除此颜色?"
										okText="确定"
										cancelText="取消"
										placement="right"
										onConfirm={() => {
											const newColor = [...customChartThemeColorList];
											newColor.splice(index, 1);
											updateDesign("customChartThemeColorList", newColor);
											setCustomState({
												selectColorIndex: index > 0 ? index - 1 : 0,
												selectSingleColorIndex: 0,
												current: newColor[index > 0 ? index - 1 : 0]
											});
										}}
									>
										<IoTrash color="#4B4B4C" className="cursor-pointer" />
									</Popconfirm>
								</Tooltip>
							</div>
						))}
					</div>
				</div>
			</div>
			{contextHolder}
		</Modal>
	);
});

export default CreateColorModal;
