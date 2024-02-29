import useChartStore from "@/store/chartStore/chartStore";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "@/utils/chartStyle";
import ComponentErrorBox from "../ComponentErrorBox";
import { useState } from "react";

const PreviewRenderList = () => {
	const { componentList } = useChartStore();
	const [isError, setIsError] = useState(false);

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
