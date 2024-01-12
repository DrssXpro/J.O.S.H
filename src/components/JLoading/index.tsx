import { Spin } from "antd";

const Loading = () => {
	const style = {
		width: "100vw",
		height: "100vh",
		backgroundColor: "#18181C",
		color: "#1db3ff",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};
	return <Spin style={style} size="large"></Spin>;
};

export default Loading;
