import { Avatar, Button, Card, Image, Popconfirm, Typography } from "antd";
import { cardColorMap } from "@/config/color";
import { TemplateInfo } from "@/service/types/requestTypes";
import avatar from "@/assets/avatar.jpg";
import initProjectImage from "@/assets/images/init-project-bg.png";

const BASEURL = import.meta.env.VITE_BASE_URL;

interface JTemplateCardProps {
	isUser: boolean;
	detail: TemplateInfo;
	deleteTemplate?: (id: number) => void;
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
								deleteTemplate && deleteTemplate(detail.id);
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
					<Image
						width="100%"
						height="100%"
						style={{ borderRadius: "10px" }}
						src={detail.cover ? `${BASEURL}/images/${detail.cover}` : initProjectImage}
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
