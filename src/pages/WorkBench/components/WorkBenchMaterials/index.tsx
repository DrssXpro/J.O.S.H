import { useEffect, useState } from "react";
import { Button, Col, Input, Menu, Row, Tooltip } from "antd";
import WorkBenchBox from "../WorkBenchBox";
import JIcon from "@/components/JIcon";
import { Albums, Grid } from "@ricons/ionicons5";
import { BarChartOutlined } from "@ant-design/icons";
import MaterialCard from "./components/MaterialCard";
import useLayoutStore from "@/store/layoutStore";
import { MaterialsModeEnum } from "@/types/LayoutTypes";
import { useMaterials } from "./hooks/useMaterials";
import "./menuItem.css";
import { MaterialCategoryEnum } from "@/materials/types";

const TopRightOperator = () => {
	const [isFocus, setFocus] = useState(false);
	const { materialsMode, controllMaterialsMode } = useLayoutStore();
	return (
		<div className="flex items-center gap-2 overflow-hidden w-50">
			<Input.Search placeholder="搜索组件" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
			<div className={`flex items-center transition-all ${isFocus ? "w-0" : "w-20"}`}>
				<Tooltip title="单列">
					<Button
						style={{ borderRadius: 0, borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}
						icon={<JIcon icon={<Albums />} size={20} />}
						type={materialsMode === MaterialsModeEnum.SINGLE ? "primary" : undefined}
						ghost={materialsMode === MaterialsModeEnum.SINGLE}
						onClick={() => controllMaterialsMode(MaterialsModeEnum.SINGLE)}
					></Button>
				</Tooltip>
				<Tooltip title="双列">
					<Button
						style={{ borderRadius: 0, borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
						icon={<JIcon icon={<Grid />} size={18} />}
						type={materialsMode === MaterialsModeEnum.DOUBLE ? "primary" : undefined}
						ghost={materialsMode === MaterialsModeEnum.DOUBLE}
						onClick={() => controllMaterialsMode(MaterialsModeEnum.DOUBLE)}
					></Button>
				</Tooltip>
			</div>
		</div>
	);
};

const WorkBenchMaterials = () => {
	const { menuOptions, categoryOptions, materialList, currentCategory, handleClickMenu, handleClickCategory } =
		useMaterials();
	const { showMaterials, materialsMode } = useLayoutStore();

	// 展开时左侧文本(“组件”)抖动问题，针对于展开的情况将控制 TopOperator 显隐操作其推入宏任务
	const [showTopOperator, setShowTopOperator] = useState(true);
	useEffect(() => {
		showMaterials
			? setTimeout(() => {
					setShowTopOperator(showMaterials);
				}, 150)
			: setShowTopOperator(showMaterials);
	}, [showMaterials]);

	return (
		<div className={`${showMaterials ? "w-78" : "w-17"} h-full transition-all`}>
			<WorkBenchBox
				showTop
				bgColor="#232324"
				topTitle="组件"
				topIcon={<BarChartOutlined />}
				TopOperator={showTopOperator ? <TopRightOperator /> : undefined}
			>
				<div className="flex w-17 h-full p-1">
					<Menu
						mode="vertical"
						className="w-full bg-[#232324]"
						defaultSelectedKeys={[menuOptions[0]["key"]]}
						onClick={(item) => handleClickMenu(item.key as MaterialCategoryEnum)}
						items={menuOptions.map((i) => ({
							label: (
								<div className="flex flex-col justify-center items-center gap-1 py-1">
									{i.icon}
									<div className="text-sm">{i.label}</div>
								</div>
							),
							key: i.key
						}))}
					/>
				</div>
				<div className="bg-[#1E1E1F] w-15 p-1">
					<Menu
						mode="vertical"
						className="w-full bg-[#1E1E1F]"
						selectedKeys={[currentCategory]}
						onClick={(item) => {
							handleClickCategory(item.key);
						}}
						items={categoryOptions.map((item) => ({
							label: (
								<div className="text-xs h-10 flex items-center justify-center">{item.categoryName}</div>
							),
							key: item.key
						}))}
					></Menu>
				</div>
				<div className="flex-1 bg-[#18181C] p-2">
					<Row gutter={[10, 10]}>
						{materialList.map((i) => (
							<Col span={materialsMode === MaterialsModeEnum.DOUBLE ? 12 : 24} key={i.key}>
								<MaterialCard mode={materialsMode} detail={i} />
							</Col>
						))}
					</Row>
				</div>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchMaterials;
