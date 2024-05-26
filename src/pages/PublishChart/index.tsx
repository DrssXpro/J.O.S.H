import { useEffect, useMemo } from "react";
import JRenderChartList from "@/components/JRenderChart/JRenderChartList";
import useStoreSelector from "@/hooks/useStoreSelector";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { CanvasConfigTypeEnum } from "@/store/canvasStore/types";
import { PreviewScaleEnum } from "@/types/LayoutTypes";
import { getEditCanvasConfigStyle } from "@/utils/chartStyle";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetailApi } from "@/service/api/projectApi";
import useTotalChartsInfo from "@/hooks/useTotalChartsInfo";
import usePreviewFitScale from "@/hooks/usePreviewFitScale";

const PublishChartPage = () => {
	const { canvasConfig } = useCanvasStore(useStoreSelector(["canvasConfig"]));
	const { setTotalChartsInfo } = useTotalChartsInfo();
	const { scaleRef } = usePreviewFitScale(canvasConfig);
	const { projectId } = useParams();
	const nav = useNavigate();

	useEffect(() => {
		getCanvasDetail();
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

	const getCanvasDetail = async () => {
		const res = await getProjectDetailApi(Number(projectId));
		if (!res.data.status) {
			window.$notification.warning({
				message: "无权限访问",
				description: "无权限访问该大屏，即将返回用户主页！"
			});
			setTimeout(() => {
				nav("/application/projects");
			}, 2000);
			return;
		}
		setTotalChartsInfo(res.data.detail, false);
	};
	return (
		<div className="relative w-[100vw] h-[100vh] bg-[#18181C]" style={canvasPreviewStyle}>
			{showEntity ? (
				<>
					{/* 实体区域 */}
					<div className="overflow-hidden">
						{/* 缩放层 */}
						<div ref={scaleRef}>
							{/* 展示层 */}
							<div style={{ ...getEditCanvasConfigStyle(canvasConfig) }} className="overflow-hidden">
								{/* 渲染层 */}
								<JRenderChartList />
							</div>
						</div>
					</div>
				</>
			) : (
				<>
					{/* 缩放层 */}
					<div ref={scaleRef}>
						{/* 展示层 */}
						<div style={{ ...getEditCanvasConfigStyle(canvasConfig) }} className="overflow-hidden">
							{/* 渲染层 */}
							<JRenderChartList />
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default PublishChartPage;
