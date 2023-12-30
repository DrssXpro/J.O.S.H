import { Layout } from "antd";
import WorkBenchHeader from "./components/WorkBenchHeader";

const WorkBench = () => {
	return (
		<Layout className="h-100vh w-100vw">
			<Layout.Header className="dark:bg-[#18181C] bg-[#18181C] border-b-1 border-[#303030]  px-5">
				<WorkBenchHeader />
			</Layout.Header>
		</Layout>
	);
};

export default WorkBench;
