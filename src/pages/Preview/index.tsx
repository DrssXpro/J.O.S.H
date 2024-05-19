import { useEffect, useMemo } from "react";
import { getSessionStorageCanvasInfo } from "./utils/storage";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import PreviewRenderList from "./components/PreviewRenderList";
import { getEditCanvasConfigStyle } from "@/utils/chartStyle";
import { CanvasConfigTypeEnum } from "@/store/canvasStore/types";
import { PreviewScaleEnum } from "@/types/LayoutTypes";
import usePreviewFit from "./hooks/usePreviewFit";
import useStoreSelector from "@/hooks/useStoreSelector";
import useTotalChartsInfo from "@/hooks/useTotalChartsInfo";

const Preview = () => {
	const { canvasConfig } = useCanvasStore(useStoreSelector(["canvasConfig"]));

	const config = getSessionStorageCanvasInfo();
	const { previewScaleRef, entityRef } = usePreviewFit(config.canvasConfig);
	const { setTotalChartsInfo } = useTotalChartsInfo();

	useEffect(() => {
		setTotalChartsInfo(config, false);
	}, []);

	// 根据适配 type 是否展示实体层
	const showEntity = useMemo(
		() =>
			canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE] === PreviewScaleEnum.SCROLL_X ||
			canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE] === PreviewScaleEnum.SCROLL_Y,
		[canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE]]
	);

	// 画布整体样式适配
	const canvasPreviewStyle = useMemo<React.CSSProperties>(() => {
		switch (canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE]) {
			case PreviewScaleEnum.FIT:
				return { display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" };
			case PreviewScaleEnum.FULL:
				return { display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" };
			case PreviewScaleEnum.SCROLL_X:
				return { overflowY: "hidden" };
			case PreviewScaleEnum.SCROLL_Y:
				return { overflowX: "hidden" };
			default:
				return {};
		}
	}, [canvasConfig[CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE]]);
	return (
		<div className="relative w-[100vw] h-[100vh] bg-[#18181C]" style={canvasPreviewStyle}>
			{showEntity ? (
				<>
					{/* 实体区域 */}
					<div className="overflow-hidden" ref={entityRef}>
						{/* 缩放层 */}
						<div ref={previewScaleRef}>
							{/* 展示层 */}
							<div style={{ ...getEditCanvasConfigStyle(canvasConfig) }} className="overflow-hidden">
								{/* 渲染层 */}
								<PreviewRenderList />
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					{/* 缩放层 */}
					<div ref={previewScaleRef}>
						{/* 展示层 */}
						<div style={{ ...getEditCanvasConfigStyle(canvasConfig) }} className="overflow-hidden">
							{/* 渲染层 */}
							<PreviewRenderList />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Preview;
