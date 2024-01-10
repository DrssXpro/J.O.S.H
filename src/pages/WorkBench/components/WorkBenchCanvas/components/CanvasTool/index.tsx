import { QuestionCircleOutlined, CodeOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Popover, Select, Slider, Tooltip } from "antd";

const CanvasTool = () => {
	return (
		<div
			className="absolute bottom-0 z-50 flex items-center justify-between left-[20px]  h-12 px-2 bg-[#232324] border-t-1 border-[#373739]"
			style={{ width: `calc(100% - 20px)` }}
		>
			<div className="flex items-center gap-2">
				<Popover content={"hello"} title="Title" trigger="click">
					<Button>历史记录</Button>
				</Popover>
				<Tooltip title="最多保留 50 条记录">
					<QuestionCircleOutlined style={{ fontSize: "18px", color: "#8F8F8F" }} />
				</Tooltip>
			</div>

			<div className="flex items-center gap-2">
				<Tooltip title="快捷键">
					<Button icon={<CodeOutlined />}></Button>
				</Tooltip>
				<Select
					defaultValue="100%"
					style={{ width: "110px" }}
					options={[
						{ value: "200%", label: "200%" },
						{ value: "150%", label: "150%" },
						{ value: "100%", label: "100%" },
						{ value: "50%", label: "50%" },
						{ value: "自适应", label: "自适应" }
					]}
				/>
				<Tooltip title="锁定当前比例">
					<UnlockOutlined style={{ fontSize: "18px", color: "#aaa" }} className="cursor-pointer" />
				</Tooltip>
				<Slider defaultValue={100} min={0} max={200} className="w-25" />
			</div>
		</div>
	);
};

export default CanvasTool;
