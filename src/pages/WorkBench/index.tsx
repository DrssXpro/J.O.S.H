import { Layout } from "antd";
import WorkBenchHeader from "./components/WorkBenchHeader";
import WorkBenchMaterials from "./components/WorkBenchMaterials";
import WorkBenchLayer from "./components/WorkBenchLayer";
import WorkBenchCanvas from "./components/WorkBenchCanvas";
import WorkBenchConfiguration from "./components/WorkBenchConfiguration";

const WorkBenchPage = () => {
	return (
		<Layout>
			<Layout.Header className="bg-[#18181C] border-b-1 border-b-solid border-[#303030]  px-5">
				<WorkBenchHeader />
			</Layout.Header>
			<Layout.Content className="w-full overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
				<div className="flex w-full h-full">
					{/* 物料区 */}
					<WorkBenchMaterials />
					{/* 图层区 */}
					<WorkBenchLayer />
					{/* 画布编辑区 */}
					<WorkBenchCanvas />
					{/* 配置区 */}
					<WorkBenchConfiguration />
				</div>
			</Layout.Content>
		</Layout>
	);
};

export default WorkBenchPage;
