import { ConfigProvider, theme } from "antd";
import LayoutContainer from "./layout";

function App() {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm
			}}
		>
			<LayoutContainer></LayoutContainer>
		</ConfigProvider>
	);
}

export default App;
