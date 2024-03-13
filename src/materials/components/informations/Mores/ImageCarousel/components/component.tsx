import { ChartComponentProps } from "@/materials/types";
import { Carousel, Image } from "antd";
import { option } from "../config";
import { requireErrorImg } from "@/utils/utils";

const ImageCarouselComponent = (props: ChartComponentProps) => {
	const { dataset, autoplay, animateSpeed, interval, fade, dotPlacement } = props.chartConfig.option as typeof option;
	return (
		<div className="w-full h-full overflow-hidden">
			<Carousel
				autoplay={autoplay}
				autoplaySpeed={interval}
				dotPosition={dotPlacement}
				fade={fade}
				speed={animateSpeed}
			>
				{dataset.map((src, index) => (
					<Image key={index} src={src} preview={false} fallback={requireErrorImg()} />
				))}
			</Carousel>
		</div>
	);
};

export default ImageCarouselComponent;
