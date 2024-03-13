import { useEffect, useMemo, useState } from "react";
import useLayoutStore from "@/store/layoutStore/layoutStore";
import { MaterialsModeEnum } from "@/types/LayoutTypes";
import { IoAlbums, IoGrid } from "react-icons/io5";
import { Button, Empty, Input, Popover, Tooltip, Typography, message } from "antd";
import { MenuOptionsType } from "../../hooks/useMaterials";
import ChartGlobImage from "../ChartGlobImage";
import { ComponentType, FetchComFlagType, IMaterialConfigType } from "@/materials/types";
import { createComponentConfig, fetchComponent } from "@/materials/components";
import useChartsWithHistory from "@/hooks/useChartsWithHistory";

interface IChartSearchInputProps {
	menuOptions: MenuOptionsType[];
}

const ChartSearchInput = (props: IChartSearchInputProps) => {
	const { menuOptions } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const { materialsMode, controllMaterialsMode } = useLayoutStore();
	const { handleAddComponents } = useChartsWithHistory();
	const [isFocus, setFocus] = useState(false);
	const [showPopover, setShowPopover] = useState(false);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		searchValue.length ? setShowPopover(true) : setShowPopover(false);
	}, [searchValue]);

	// 拿到所有物料 item
	const allList = useMemo(() => {
		const arr = [];
		for (const item of menuOptions) {
			arr.push(...item.list);
		}
		return arr;
	}, [menuOptions]);

	// input 输入搜索拿到结果
	const searchRes = useMemo(
		() =>
			allList.filter(
				(item) => !item.disabled && searchValue && item.title.toLowerCase().includes(searchValue.toLowerCase())
			),
		[searchValue]
	);

	const selectChart = async (item: IMaterialConfigType) => {
		if (item.disabled) return;
		try {
			// 创建图表组件所有配置对象
			const componentConifg: ComponentType = await createComponentConfig(item);
			// 获取图表组件
			const ChartComponent: any = fetchComponent(item.key, FetchComFlagType.VIEW);
			// 获取图表配置组件
			const ChartConfigComponent: any = fetchComponent(item.key, FetchComFlagType.CONFIG);

			const componentInstance = { ...componentConifg, ChartComponent, ChartConfigComponent };

			handleAddComponents([componentInstance]);

			setFocus(false);
			setShowPopover(false);
			setSearchValue("");
		} catch (e) {
			messageApi.warning("该组件暂未开发！");
		}
	};

	return (
		<div className="flex items-center gap-2 overflow-hidden w-50">
			{contextHolder}
			<Popover
				open={showPopover}
				placement="bottom"
				content={
					<div className="w-40">
						{searchRes.length ? (
							<div className="flex flex-col items-center gap-2 max-h-50 overflow-auto">
								{searchRes.map((i) => (
									<div
										className={`w-full h-8 p-2 flex items-center gap-2 rounded-lg cursor-pointer hover:bg-gray-500/50`}
										key={i.key}
										onClick={(e) => {
											e.stopPropagation();
											selectChart(i);
										}}
									>
										<div className="w-8 h-5 rounded overflow-hidden">
											<ChartGlobImage detail={i} />
										</div>
										<Typography.Text ellipsis className="text-[12px] flex-1">
											{i.title}
										</Typography.Text>
									</div>
								))}
							</div>
						) : (
							<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="没有找到组件~" />
						)}
					</div>
				}
			>
				<Input.Search
					placeholder="搜索组件"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => {
						if (!searchValue.length) {
							setFocus(false);
							setShowPopover(false);
						}
					}}
				/>
			</Popover>
			<div className={`flex items-center transition-all ${isFocus ? "w-0" : "w-20"}`}>
				<Tooltip title="单列">
					<Button
						style={{ borderRadius: 0, borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}
						icon={<IoAlbums />}
						type={materialsMode === MaterialsModeEnum.SINGLE ? "primary" : undefined}
						ghost={materialsMode === MaterialsModeEnum.SINGLE}
						onClick={() => controllMaterialsMode(MaterialsModeEnum.SINGLE)}
					></Button>
				</Tooltip>
				<Tooltip title="双列">
					<Button
						style={{ borderRadius: 0, borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
						icon={<IoGrid />}
						type={materialsMode === MaterialsModeEnum.DOUBLE ? "primary" : undefined}
						ghost={materialsMode === MaterialsModeEnum.DOUBLE}
						onClick={() => controllMaterialsMode(MaterialsModeEnum.DOUBLE)}
					></Button>
				</Tooltip>
			</div>
		</div>
	);
};

export default ChartSearchInput;
