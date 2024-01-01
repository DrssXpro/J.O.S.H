import { useState } from "react";
import { Button, Col, Input, Menu, Row } from "antd";
import WorkBenchBox from "../WorkBenchBox";
import JIcon from "@/components/JIcon";
import { Albums, Grid } from "@ricons/ionicons5";
import {
	BarChartOutlined,
	PictureOutlined,
	AimOutlined,
	PieChartOutlined,
	SketchOutlined,
	TableOutlined
} from "@ant-design/icons";
import "./menuItem.css";
import MaterialCard from "./components/MaterialCard";

const MaterialsMenu = [
	{
		icon: <PieChartOutlined style={{ fontSize: "20px" }} />,
		label: "图表"
	},
	{
		icon: <AimOutlined style={{ fontSize: "20px" }} />,
		label: "信息"
	},
	{
		icon: <TableOutlined style={{ fontSize: "20px" }} />,
		label: "列表"
	},
	{
		icon: <SketchOutlined style={{ fontSize: "20px" }} />,
		label: "小组件"
	},
	{
		icon: <PictureOutlined style={{ fontSize: "20px" }} />,
		label: "图片"
	}
];

const CurrentMaterials = ["所有", "柱状图", "折线图", "饼图", "散点图", "地图", "更多"];

const TopRightOperator = () => {
	const [isFocus, setFocus] = useState(false);
	return (
		<div className="flex items-center gap-2 overflow-hidden w-50">
			<Input.Search placeholder="搜索组件" onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
			<div className={`flex items-center transition-all ${isFocus ? "w-0" : "w-20"}`}>
				<Button style={{ borderRadius: 0 }} icon={<JIcon icon={<Albums />} size={20} />}></Button>
				<Button style={{ borderRadius: 0 }} icon={<JIcon icon={<Grid />} size={18} />}></Button>
			</div>
		</div>
	);
};

const WorkBenchMaterials = () => {
	return (
		<div className="w-78 h-full">
			<WorkBenchBox
				showTop
				bgColor="#232324"
				topTitle="组件"
				topIcon={<BarChartOutlined />}
				TopOperator={<TopRightOperator />}
			>
				<div className="flex w-15 h-full p-1">
					<Menu
						mode="vertical"
						className="w-full bg-[#232324]"
						items={MaterialsMenu.map((i, index) => ({
							label: (
								<div className="flex flex-col justify-center items-center gap-1 py-1">
									{i.icon}
									<div className="text-sm">{i.label}</div>
								</div>
							),
							key: index + 1
						}))}
					/>
				</div>
				<div className="bg-[#1E1E1F] w-15 p-1">
					<Menu
						mode="vertical"
						className="w-full bg-[#1E1E1F]"
						items={CurrentMaterials.map((item, index) => ({
							label: <div className="text-xs h-10 flex items-center justify-center">{item}</div>,
							key: index + 1
						}))}
					></Menu>
				</div>
				<div className="flex-1 bg-[#18181C] p-2">
					<Row gutter={[10, 10]}>
						{[1, 2, 3, 4].map((i) => (
							<Col span={12} key={i}>
								<MaterialCard />
							</Col>
						))}
					</Row>
				</div>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchMaterials;
