import { Button, Card, Dropdown, Tooltip } from "antd";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSmallDash, AiOutlineLaptop, AiOutlineSend } from "react-icons/ai";
import { cardColorMap } from "@/config/color";
import CardBg from "@/assets/card-bg.png";
import { NavLink } from "react-router-dom";
const JProjectCard = () => {
	const items = [
		{
			key: "1",
			label: (
				<NavLink to="/preview">
					<div className="flex items-center gap-1">
						<AiOutlineLaptop />
						<span>预览</span>
					</div>
				</NavLink>
			)
		},
		{
			key: "2",
			label: (
				<NavLink to="/preview">
					<div className="flex items-center gap-1">
						<AiOutlineSend />
						<span>发布</span>
					</div>
				</NavLink>
			)
		},
		{
			key: "3",
			label: (
				<NavLink to="/preview">
					<div className="flex items-center gap-1">
						<AiOutlineDelete />
						<span>删除</span>
					</div>
				</NavLink>
			)
		}
	];
	return (
		<Card bodyStyle={{ padding: 0 }}>
			<div className="flex items-center gap-2 p-3">
				{cardColorMap.map((color) => (
					<div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} key={color}></div>
				))}
			</div>
			<div className="w-full h-full px-3 pb-3">
				<div className="h-45">
					<img src={CardBg} className="h-full w-full overflow-hidden rounded-md object-cover" />
				</div>
			</div>
			<div className="w-full h-15 bg-[#262629] p-3  flex items-center justify-between">
				<div>可视化大屏页面</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full" style={{ backgroundColor: cardColorMap[1] }}></div>
					<div>未发布</div>
					<Tooltip title="编辑" placement="bottom">
						<Button icon={<AiOutlineEdit />}></Button>
					</Tooltip>
					<Dropdown menu={{ items }} placement="bottom">
						<Button icon={<AiOutlineSmallDash />}></Button>
					</Dropdown>
				</div>
			</div>
		</Card>
	);
};

export default JProjectCard;
