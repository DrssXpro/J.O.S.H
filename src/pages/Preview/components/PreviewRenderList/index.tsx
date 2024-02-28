import useChartStore from "@/store/chartStore/chartStore";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "@/utils/chartStyle";
import ShowComponentBox from "../ShowComponentBox";
import { useState } from "react";

const PreviewRenderList = () => {
	const { componentList } = useChartStore();
	const [, setIsError] = useState(false);

	return (
		<>
			{componentList.map((i, index) => {
				return (
					<div
						className={`absolute ${setChartAnimateStyle(i.styles.animations)}`}
						key={i.id}
						style={{ ...setChartPosStyle(i.attr, index), ...setChartSizeStyle(i.attr) }}
					>
						<ShowComponentBox chartConfig={i}>
							<i.ChartComponent
								chartConfig={i}
								requestErrorCallback={() => {
									setIsError(true);
								}}
								requestSuccessCallback={() => {
									setIsError(false);
								}}
							/>
						</ShowComponentBox>
					</div>
				);
			})}
		</>
	);
};

export default PreviewRenderList;
