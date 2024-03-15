import JImage from "@/components/JImage";
import { ChartComponentProps } from "@/materials/types";
import { requireErrorImg } from "@/utils/utils";

const ImageComponent = (props: ChartComponentProps) => {
	const { dataset, borderRadius, fit } = props.chartConfig.option;

	return (
		<div className="w-full h-full overflow-hidden" style={{ borderRadius: `${borderRadius}px` }}>
			<JImage src={dataset} fallback={requireErrorImg()} objectFit={fit} />
		</div>
	);
};

export default ImageComponent;
