import { Carousel } from "antd";
import draw1 from "@/assets/carousel/draw1.svg";
import draw2 from "@/assets/carousel/draw2.svg";
import draw3 from "@/assets/carousel/draw3.svg";
import draw4 from "@/assets/carousel/draw4.svg";

const LoginCarousel = () => {
	const images = [draw1, draw2, draw3, draw4];
	return (
		<Carousel style={{ width: "550px" }} autoplay>
			{images.map((i, index) => (
				<img src={i} key={index} alt="背景图" className="w-full h-full object-cover" />
			))}
		</Carousel>
	);
};

export default LoginCarousel;
