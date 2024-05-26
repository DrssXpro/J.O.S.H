import { useEffect, useRef, useState } from "react";
import LoadingImage from "@/assets/images/image-loading.png";
import { fetchImages } from "@/materials/components";
import { IMaterialConfigType } from "@/materials/types";

interface IChartGlobImageProps {
	detail: IMaterialConfigType;
	imageStyle?: React.CSSProperties;
}
const ChartGlobImage = (props: IChartGlobImageProps) => {
	const { detail, imageStyle } = props;
	const imageDomRef = useRef<HTMLImageElement>(null);
	const [imageUrl, setImageUrl] = useState("");
	const [show, setShow] = useState(false);

	useEffect(() => {
		fetchImageUrl().then((imageUrl) => {
			const observer = new IntersectionObserver(async (entries) => {
				if (entries[0].isIntersecting) {
					await loadImage(imageUrl);
					setImageUrl(imageUrl);
					observer.unobserve(imageDomRef.current!);
				}
			});
			observer.observe(imageDomRef.current!);
		});
	}, [detail.key]);

	const fetchImageUrl = async () => {
		if (detail.resource) {
			return detail.image;
		}
		const image = await fetchImages(detail);
		return image;
	};

	const loadImage = (url: string) => {
		const image = new Image();
		image.src = url;
		return new Promise((resolve, reject) => {
			image.onload = () => {
				setShow(true);
				resolve("success");
			};
			image.onerror = () => {
				reject("error");
			};
		});
	};

	return (
		<>
			{
				<img
					ref={imageDomRef}
					alt="图标图片"
					draggable={false}
					src={show ? imageUrl : LoadingImage}
					className="object-fill w-full h-full transform group-hover:scale-110 transition-all"
					style={{ ...imageStyle }}
				/>
			}
		</>
	);
};

export default ChartGlobImage;
