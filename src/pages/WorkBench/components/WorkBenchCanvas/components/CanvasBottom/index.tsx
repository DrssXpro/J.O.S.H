import { useEffect, useRef, useState } from "react";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { AiOutlineQuestionCircle, AiOutlineCode, AiOutlineUnlock, AiOutlineLock } from "react-icons/ai";
import { Button, Select, Slider, Tooltip } from "antd";
import { bus } from "@/utils";
import { KeyBoardEventName, CanvasLayoutEventName } from "@/types/EventTypes";
import { CanvasGlobalTypeEnum } from "@/store/canvasStore/types";
import { HistoryMax } from "@/settings/designSetting";
import ChartHistory from "./components/ChartHistory";
import useStoreSelector from "@/hooks/useStoreSelector";

const CanvasBottom = () => {
	const { canvasGlobal, setCanvasGlobal } = useCanvasStore(useStoreSelector(["canvasGlobal", "setCanvasGlobal"]));
	const { scale, lockScale } = canvasGlobal;
	const [keyBoardText, setKeyBoardText] = useState("");
	const selectRef = useRef<any>(null);

	useEffect(() => {
		bus.on(KeyBoardEventName.ChANGEKEYBOARDTEXT, handleChangeKeyBoardText);

		return () => {
			bus.off(KeyBoardEventName.ChANGEKEYBOARDTEXT, handleChangeKeyBoardText);
		};
	}, []);

	const handleChangeKeyBoardText = (text: string) => {
		setKeyBoardText(text);
	};
	return (
		<div
			className="absolute bottom-0 z-50 flex items-center justify-between left-[20px]  h-12 px-2 bg-[#232324] border-t-1 border-t-solid border-[#373739]"
			style={{ width: `calc(100% - 20px)` }}
		>
			<div className="flex items-center gap-2">
				<ChartHistory />
				<Tooltip title={`最多保留 ${HistoryMax} 条记录`}>
					<AiOutlineQuestionCircle style={{ fontSize: "18px", color: "#8F8F8F", marginTop: "3px" }} />
				</Tooltip>
				<div className="text-[#aaa]">{keyBoardText}</div>
			</div>

			<div className="flex items-center gap-2">
				<Tooltip title="快捷键">
					<Button icon={<AiOutlineCode />}></Button>
				</Tooltip>
				<Select
					ref={selectRef}
					disabled={lockScale}
					value={`${(scale * 100).toFixed(0)}%`}
					style={{ width: "110px" }}
					onChange={(value) => {
						if (value === "auto") {
							bus.emit(CanvasLayoutEventName.AUTOLAYOUTCANVAS);
						} else {
							setCanvasGlobal(CanvasGlobalTypeEnum.SCALE, parseInt(value) / 100);
						}
						selectRef.current.blur();
					}}
					options={[
						{ value: "200%", label: "200%" },
						{ value: "150%", label: "150%" },
						{ value: "100%", label: "100%" },
						{ value: "50%", label: "50%" },
						{ value: "auto", label: "自适应" }
					]}
				/>
				<Tooltip title={lockScale ? "解锁当前比例" : "锁定当前比例"}>
					{lockScale ? (
						<AiOutlineLock
							style={{ fontSize: "18px", color: "#1677FF" }}
							className="cursor-pointer"
							onClick={() => setCanvasGlobal(CanvasGlobalTypeEnum.LOCK_SCALE, false)}
						/>
					) : (
						<AiOutlineUnlock
							style={{ fontSize: "18px", color: "#aaa" }}
							className="cursor-pointer"
							onClick={() => setCanvasGlobal(CanvasGlobalTypeEnum.LOCK_SCALE, true)}
						/>
					)}
				</Tooltip>
				<Slider
					disabled={lockScale}
					value={scale * 100}
					min={0}
					max={200}
					step={5}
					onChange={(value) => setCanvasGlobal(CanvasGlobalTypeEnum.SCALE, value / 100)}
					tooltip={{ formatter: (value) => `${value}%` }}
					className="w-25"
				/>
			</div>
		</div>
	);
};

export default CanvasBottom;
