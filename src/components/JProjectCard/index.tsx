import { Button, Card, Dropdown, Tooltip } from "antd";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineSmallDash, AiOutlineLaptop, AiOutlineSend } from "react-icons/ai";
import { cardColorMap } from "@/config/color";
import CardBg from "@/assets/card-bg.png";
import { useNavigate } from "react-router-dom";
import { ProjectInfo } from "@/service/types/requestTypes";

interface JProjectCardProps {
	detail: ProjectInfo;
	deleteProject: (id: number) => void;
	updateProjectStatus: (detail: ProjectInfo, status: boolean) => void;
}

const JProjectCard = (props: JProjectCardProps) => {
	const { detail, deleteProject, updateProjectStatus } = props;
	const nav = useNavigate();
	const items = [
		{
			key: "1",
			label: (
				<div className="flex items-center gap-1">
					<AiOutlineLaptop />
					<span>预览</span>
				</div>
			)
		},
		{
			key: "2",
			label: (
				<div
					className="flex items-center gap-1"
					onClick={() => {
						updateProjectStatus(detail, !detail.status);
					}}
				>
					<AiOutlineSend />
					<span>{detail.status ? "取消发布" : "发布"}</span>
				</div>
			)
		},
		{
			key: "3",
			label: (
				<div
					className="flex items-center gap-1"
					onClick={() => {
						deleteProject(detail.id);
					}}
				>
					<AiOutlineDelete />
					<span>删除</span>
				</div>
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
				<div>{detail.title}</div>
				<div className="flex items-center gap-2">
					<div
						className="w-2 h-2 rounded-full"
						style={{ backgroundColor: detail.status ? cardColorMap[1] : cardColorMap[0] }}
					></div>
					<div>{detail.status ? "已发布" : "未发布"}</div>
					<Tooltip title="编辑" placement="bottom">
						<Button icon={<AiOutlineEdit />} onClick={() => nav(`/workBench/${detail.id}`)}></Button>
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
