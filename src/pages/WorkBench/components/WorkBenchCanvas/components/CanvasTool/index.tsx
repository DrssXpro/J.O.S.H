import useCanvasStore from "@/store/canvasStore";
import { bus } from "@/utils";
import { QuestionCircleOutlined, CodeOutlined, UnlockOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Popover, Select, Slider, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { KeyBoardEventName } from "../../utils/handleKeyBoardEvent";

const CanvasTool = () => {
	const { scale, disableScale, setScale, setScaleDisabled } = useCanvasStore();
	const [keyBoardText, setKeyBoardText] = useState("");

	useEffect(() => {
		bus.on(KeyBoardEventName.ChangeKeyBoardText, handleChangeKeyBoardText);

		return () => {
			bus.off(KeyBoardEventName.ChangeKeyBoardText, handleChangeKeyBoardText);
		};
	}, []);

	const handleChangeKeyBoardText = (text: string) => {
		setKeyBoardText(text);
	};
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
					<QuestionCircleOutlined style={{ fontSize: "18px", color: "#8F8F8F", marginTop: "3px" }} />
				</Tooltip>
				<div className="text-[#aaa]">{keyBoardText}</div>
			</div>

			<div className="flex items-center gap-2">
				<Tooltip title="快捷键">
					<Button icon={<CodeOutlined />}></Button>
				</Tooltip>
				<Select
					disabled={disableScale}
					value={`${(scale * 100).toFixed(0)}%`}
					style={{ width: "110px" }}
					onChange={(value) => setScale(parseInt(value) / 100)}
					options={[
						{ value: "200%", label: "200%" },
						{ value: "150%", label: "150%" },
						{ value: "100%", label: "100%" },
						{ value: "50%", label: "50%" },
						{ value: "自适应", label: "自适应" }
					]}
				/>
				<Tooltip title={disableScale ? "解锁当前比例" : "锁定当前比例"}>
					{disableScale ? (
						<LockOutlined
							style={{ fontSize: "18px", color: "#1677FF" }}
							className="cursor-pointer"
							onClick={() => setScaleDisabled(false)}
						/>
					) : (
						<UnlockOutlined
							style={{ fontSize: "18px", color: "#aaa" }}
							className="cursor-pointer"
							onClick={() => setScaleDisabled(true)}
						/>
					)}
				</Tooltip>
				<Slider
					disabled={disableScale}
					value={scale * 100}
					min={0}
					max={200}
					step={5}
					onChange={(value) => setScale(value / 100)}
					tooltip={{ formatter: (value) => `${value}%` }}
					className="w-25"
				/>
			</div>
		</div>
	);
};

export default CanvasTool;
