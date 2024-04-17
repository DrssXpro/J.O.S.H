import { useEffect, useState } from "react";
import { fetchImages } from "@/materials/components";
import { IMaterialConfigType } from "@/materials/types";

interface IChartGlobImageProps {
	detail: IMaterialConfigType;
	imageStyle?: React.CSSProperties;
}
const ChartGlobImage = (props: IChartGlobImageProps) => {
	const { detail, imageStyle } = props;
	const [imageUrl, setImageUrl] = useState("");
	const [show, setShow] = useState(false);

	useEffect(() => {
		fetchImageUrl();
	}, [detail.key]);

	const fetchImageUrl = async () => {
		const image = await fetchImages(detail);
		await imageLoad(image);
		setShow(true);
		setImageUrl(image);
	};

	const imageLoad = (url: string) => {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.src = url;
			image.onload = () => {
				resolve("load");
			};
			image.onerror = () => {
				reject("error");
			};
		});
	};

	return (
		<>
			{show ? (
				<img
					src={imageUrl}
					alt="图标图片"
					draggable={false}
					onLoad={() => {
						setShow(true);
					}}
					className="object-fill w-full h-full transform group-hover:scale-110 transition-all"
					style={{ ...imageStyle }}
				/>
			) : (
				<div className="w-full h-full"></div>
			)}
		</>
	);
};

export default ChartGlobImage;
