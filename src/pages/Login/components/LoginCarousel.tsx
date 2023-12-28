import { Carousel } from "antd";
import draw1 from "@/assets/carousel/draw1.svg";
import draw2 from "@/assets/carousel/draw2.svg";
import draw3 from "@/assets/carousel/draw3.svg";
import draw4 from "@/assets/carousel/draw4.svg";

const LoginCarousel = () => {
	return (
		<Carousel style={{ width: "550px" }} autoplay>
			<div>
				<img src={draw1} />
			</div>
			<div>
				<img src={draw2} />
			</div>
			<div>
				<img src={draw3} />
			</div>
			<div>
				<img src={draw4} />
			</div>
		</Carousel>
	);
};

export default LoginCarousel;
