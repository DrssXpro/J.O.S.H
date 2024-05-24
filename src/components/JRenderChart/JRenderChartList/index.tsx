import { useState, useMemo } from "react";
import JChartErrorBox from "../JChartErrorBox";
import useChartStore from "@/store/chartStore/chartStore";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useStoreSelector from "@/hooks/useStoreSelector";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "@/utils/chartStyle";
import { colorCustomMerge } from "@/utils/colorStyle";
import { handleChartEvent } from "@/pages/Preview/utils";

const JRenderChartList = () => {
	const { canvasConfig } = useCanvasStore(useStoreSelector(["canvasConfig"]));
	const { componentList } = useChartStore(useStoreSelector(["componentList"]));
	const [isError, setIsError] = useState(false);

	const computedThemeColor = useMemo(() => {
		const colorCustomMergeData = colorCustomMerge();
		return colorCustomMergeData[canvasConfig.chartThemeColor];
	}, [canvasConfig.chartThemeColor]);

	return (
		<>
			{componentList.map((i, index) => {
				const { baseEvent, advancedEvent } = handleChartEvent(i);
				return (
					<div
						className={`absolute ${setChartAnimateStyle(i.styles.animations)}`}
						key={i.id}
						style={{ ...setChartPosStyle(i.attr, index), ...setChartSizeStyle(i.attr) }}
					>
						<JChartErrorBox isError={isError}>
							<i.ChartComponent
								chartConfig={i}
								themeColor={computedThemeColor}
								requestErrorCallback={() => {
									setIsError(true);
								}}
								requestSuccessCallback={() => {
									setIsError(false);
								}}
								baseEvent={baseEvent}
								advancedEvent={advancedEvent}
							/>
						</JChartErrorBox>
					</div>
				);
			})}
		</>
	);
};

export default JRenderChartList;
