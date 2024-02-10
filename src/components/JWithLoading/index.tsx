import { Spin } from "antd";
import { CSSProperties, Suspense } from "react";

interface IJWithLoadingProps {
	loadingStyle?: CSSProperties;
	element: JSX.Element;
}

const JWithLoading = (props: IJWithLoadingProps) => {
	const { element, loadingStyle = {} } = props;
	const style = {
		width: "100%",
		height: "100%",
		backgroundColor: "#18181C",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	};
	return <Suspense fallback={<Spin style={{ ...style, ...loadingStyle }} size="large"></Spin>}>{element}</Suspense>;
};

export default JWithLoading;
