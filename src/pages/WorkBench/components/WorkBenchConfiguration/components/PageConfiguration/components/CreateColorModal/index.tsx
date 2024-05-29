import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { Badge, Button, ColorPicker, Divider, Input, Modal, Tooltip, Typography, theme } from "antd";
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

export interface ColorModalRef {
	controllModal: (status: boolean) => void;
}

interface CustomStateType {
	list: CustomColorsType[];
	current: CustomColorsType | undefined;
	selectColorIndex: number;
}

// 默认颜色组
const createDefaultColor = (): CustomColorsType => ({
	id: nanoid(5),
	name: "未命名",
	color: ["#6ae5bb", "#69e3de", "#5ac5ee", "#5ac4ee", "#4498ec", "#3c7ddf"]
});

const CreateColorModal = forwardRef<ColorModalRef>((_, ref) => {
	const { token } = theme.useToken();
	const { customChartThemeColorList } = useDesignStore(useStoreSelector(["customChartThemeColorList"]));

	const computedGradientColor = (c1: string, c2: string) => `linear-gradient(to right, ${c1} 0%, ${c2} 100%)`;

	const [isOpen, setIsOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [customState, setCustomState] = useState<CustomStateType>({
		list: [...customChartThemeColorList],
		current: customChartThemeColorList.length ? customChartThemeColorList[0] : undefined,
		selectColorIndex: -1
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
				lighten(customState.current.color[customState.selectColorIndex], (1 / 100) * (i + 1))
			);
			comDarkenArr.push(darken(customState.current.color[customState.selectColorIndex], (3.5 / 100) * (i + 1)));
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
	}, [customState.selectColorIndex]);

	// 创建新颜色组
	const handleCreateColor = () => {
		const newColor = createDefaultColor();
		setCustomState((pre) => ({ list: [newColor, ...pre.list], current: newColor, selectColorIndex: 0 }));
	};

	// 新增单个颜色
	const handleAddSingleColor = () => {
		setCustomState(
			produce((draft) => {
				const currentColor =
					draft.current!.color[draft.selectColorIndex] ||
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
				if (draft.selectColorIndex !== -1) {
					draft.current!.color.splice(draft.selectColorIndex, 1);
					setIsUpdate(true);
				}
			})
		);
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
										onChange={(e) =>
											setCustomState(
												produce((draft) => {
													draft.current!.name = e.target.value;
												})
											)
										}
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
														draft.selectColorIndex = index;
													})
												);
											}}
										>
											<ColorPicker
												className="w-[130px]"
												style={{
													border:
														customState.selectColorIndex === index
															? `2px solid ${token.colorPrimary}`
															: undefined
												}}
												showText
												value={color}
												onChange={(val) => {
													const color = val.toHexString();
													setCustomState(
														produce((draft) => {
															draft.current!.color[index] = color;
														})
													);
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
													setCustomState(
														produce((draft) => {
															draft.current!.color[draft.selectColorIndex] = color;
														})
													);
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
													setCustomState(
														produce((draft) => {
															draft.current!.color[draft.selectColorIndex] = color;
														})
													);
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
								<Button icon={<IoArrowDown />} className="w-full" type="primary" ghost>
									应用数据
								</Button>
							</Badge>
						)}
					</div>
					<Divider className="my-4" />
					<div className="flex flex-col gap-2 ">
						{customState.list.map((i, index1) => (
							<div className="flex items-center gap-2">
								<div
									className="relative flex flex-1 items-center cursor-pointer justify-between bg-[#2C2C2D] border-[rgba(255,255,255,0.09)] border-1 border-solid p-2 rounded-lg"
									style={{
										border:
											index1 === customState.selectColorIndex
												? `3px solid ${token.colorPrimary}`
												: undefined
									}}
									key={index1}
								>
									<div>{i.name}</div>
									<div className="flex items-center gap-2">
										{i.color.slice(0, 6).map((c, index2) => (
											<div
												className="w-5 h-5 rounded-md"
												style={{ background: `${c}` }}
												key={index2}
											></div>
										))}
									</div>
									<div
										className="absolute w-[95%] -bottom-[2px] left-2 h-[3px] rounded"
										style={{ background: computedGradientColor(i.color[0], i.color[5]) }}
									></div>
								</div>
								<Tooltip title="删除自定义颜色">
									<IoTrash color="#4B4B4C" className="cursor-pointer" />
								</Tooltip>
							</div>
						))}
					</div>
				</div>
			</div>
		</Modal>
	);
});

export default CreateColorModal;
