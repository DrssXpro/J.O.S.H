import { CSSProperties } from "react";
import { Spin } from "antd";

interface JLoadingProps {
	loadingStyle?: CSSProperties;
}

const JLoading = (props: JLoadingProps) => {
	const { loadingStyle = {} } = props;
	const style = {
		width: "100%",
		height: "100%",
		backgroundColor: "#18181C",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};
	return <Spin style={{ ...style, ...loadingStyle }} size="large" />;
};

export default JLoading;
