import { useState } from "react";

interface JImageProps {
	fallback: string;
	src: string;
	objectFit?: "contain" | "cover" | "fill";
}

const JImage = (props: JImageProps) => {
	const { src, fallback, objectFit } = props;
	const [show, setShow] = useState(false);
	return (
		<>
			<img
				src={src}
				className={`w-full h-full transition-all ${show ? "opacity-100" : "opacity-0 blur"}`}
				style={{ objectFit }}
				onLoad={() => {
					setShow(true);
				}}
			/>
			<img src={fallback} className={`${!show ? "block" : "hidden"}`} />
		</>
	);
};

export default JImage;
