import { Spin } from "antd";

const Loading = () => {
	const style = {
		width: "100vw",
		height: "100vh",
		backgroundColor: "#4b6cb7",
		background: "linear-gradient(to right, #182848, #1a2848)",
		color: "#1db3ff",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};
	return <Spin style={style} size="large"></Spin>;
};

export default Loading;
