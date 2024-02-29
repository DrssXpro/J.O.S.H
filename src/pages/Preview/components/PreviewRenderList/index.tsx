import useChartStore from "@/store/chartStore/chartStore";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "@/utils/chartStyle";
import ComponentErrorBox from "../ComponentErrorBox";
import { useState, useMemo } from "react";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { colorCustomMerge } from "@/utils/colorStyle";

const PreviewRenderList = () => {
	const { canvasConfig } = useCanvasStore();
	const { componentList } = useChartStore();
	const [isError, setIsError] = useState(false);

	const computedThemeColor = useMemo(() => {
		const colorCustomMergeData = colorCustomMerge();
		return colorCustomMergeData[canvasConfig.chartThemeColor];
	}, [canvasConfig.chartThemeColor]);

	return (
		<>
			{componentList.map((i, index) => {
				return (
					<div
						className={`absolute ${setChartAnimateStyle(i.styles.animations)}`}
						key={i.id}
						style={{ ...setChartPosStyle(i.attr, index), ...setChartSizeStyle(i.attr) }}
					>
						<ComponentErrorBox isError={isError}>
							<i.ChartComponent
								chartConfig={i}
								themeColor={computedThemeColor}
								requestErrorCallback={() => {
									setIsError(true);
								}}
								requestSuccessCallback={() => {
									setIsError(false);
								}}
							/>
						</ComponentErrorBox>
					</div>
				);
			})}
		</>
	);
};

export default PreviewRenderList;
