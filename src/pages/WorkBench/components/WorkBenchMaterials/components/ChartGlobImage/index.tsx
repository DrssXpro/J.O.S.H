import { useEffect, useState } from "react";
import { fetchImages } from "@/materials/components";
import { IMaterialConfigType } from "@/materials/types";

interface IChartGlobImageProps {
	detail: IMaterialConfigType;
}
const ChartGlobImage = (props: IChartGlobImageProps) => {
	const { detail } = props;
	const [imageUrl, setImageUrl] = useState("");

	useEffect(() => {
		fetchImageUrl();
	}, [detail.key]);

	const fetchImageUrl = async () => {
		const image = await fetchImages(detail);
		setImageUrl(image);
	};

	return (
		<img
			src={imageUrl}
			alt="图标图片"
			className="object-cover w-full h-full transform group-hover:scale-110 transition-all"
		/>
	);
};

export default ChartGlobImage;
