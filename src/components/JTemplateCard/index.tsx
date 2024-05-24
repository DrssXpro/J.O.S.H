import { Avatar, Button, Card, Popconfirm, Typography } from "antd";
import { cardColorMap } from "@/config/color";
import { TemplateInfo } from "@/service/types/requestTypes";
import avatar from "@/assets/avatar.jpg";
import empty from "@/assets/empty_draw.png";

const BASEURL = import.meta.env.VITE_BASE_URL;

interface JTemplateCardProps {
	isUser: boolean;
	detail: TemplateInfo;
	deleteTemplate: (id: number) => void;
	applyTemplate: (detail: TemplateInfo) => void;
}

const JTemplateCard = (props: JTemplateCardProps) => {
	const { isUser, detail, deleteTemplate, applyTemplate } = props;

	return (
		<Card bodyStyle={{ padding: 0 }}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2 p-3">
					{cardColorMap.map((color) => (
						<div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} key={color}></div>
					))}
				</div>
				<div className="flex items-center gap-2 p-3">
					<Button
						size="small"
						onClick={() => {
							applyTemplate(detail);
						}}
					>
						应用
					</Button>
					{isUser && (
						<Popconfirm
							title="删除该模板"
							description="确定要删除这个模板吗？"
							onConfirm={() => {
								deleteTemplate(detail.id);
							}}
							okText="确定"
							cancelText="取消"
						>
							<Button size="small">删除</Button>
						</Popconfirm>
					)}
				</div>
			</div>

			<div className="w-full h-full px-3 pb-3">
				<div className="h-45">
					<img
						src={detail.cover ? `${BASEURL}/images/${detail.cover}` : empty}
						className="h-full w-full overflow-hidden rounded-md object-cover"
					/>
				</div>
			</div>
			<div className="w-full h-15 bg-[#262629] p-3  flex items-center justify-between">
				<div>{detail.title}</div>
				<div className="flex items-center gap-2">
					<div className="w-2 h-2 rounded-full" style={{ backgroundColor: cardColorMap[1] }}></div>
					<Typography.Text>
						<div className="flex items-center">
							<span>作者信息：</span>
							<Avatar size="small" src={avatar} />
							{detail.user.username}
						</div>
					</Typography.Text>
				</div>
			</div>
		</Card>
	);
};

export default JTemplateCard;
