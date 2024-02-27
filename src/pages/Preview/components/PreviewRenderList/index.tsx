import useChartStore from "@/store/chartStore/chartStore";
import { setChartAnimateStyle, setChartPosStyle, setChartSizeStyle } from "@/utils/chartStyle";
import ShowComponentBox from "../ShowComponentBox";

const PreviewRenderList = () => {
	const { componentList } = useChartStore();

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
							<i.ChartComponent chartConfig={i} />
						</ShowComponentBox>
					</div>
				);
			})}
		</>
	);
};

export default PreviewRenderList;
