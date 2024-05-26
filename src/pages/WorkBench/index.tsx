import { Layout } from "antd";
import WorkBenchHeader from "./components/WorkBenchHeader";
import WorkBenchMaterials from "./components/WorkBenchMaterials";
import WorkBenchLayer from "./components/WorkBenchLayer";
import WorkBenchCanvas from "./components/WorkBenchCanvas";
import WorkBenchConfiguration from "./components/WorkBenchConfiguration";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getProjectDetailApi, updateProjectApi } from "@/service/api/projectApi";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useChartStore from "@/store/chartStore/chartStore";
import { JSONParse } from "@/utils/utils";
import { fetchComponent } from "@/materials/components";
import { ComponentType, FetchComFlagType } from "@/materials/types";
import useStoreSelector from "@/hooks/useStoreSelector";
import useProjectStore from "@/store/projectStore/projectStore";

const WorkBenchPage = () => {
	const params = useParams();
	const { setGlobalCanvasConfig } = useCanvasStore(useStoreSelector(["setGlobalCanvasConfig"]));
	const { addComponentList, clearComponentList, setrequestGlobalConfig } = useChartStore(
		useStoreSelector(["addComponentList", "setrequestGlobalConfig", "clearComponentList"])
	);
	const { projectInfo, updateProjectInfo } = useProjectStore(
		useStoreSelector(["projectInfo", "updateProjectInfo", "getProjectInfo"])
	);

	useEffect(() => {
		getProjectDetail(Number(params.projectId));
	}, []);

	const getProjectDetail = async (id: number) => {
		const res = await getProjectDetailApi(id);
		updateProjectInfo(res.data);
		handleLoadCanvasDetail(res.data.detail);
	};

	const handleLoadCanvasDetail = (detail: string) => {
		clearComponentList();
		const data = JSONParse(detail);
		const { componentList, requestGlobalConfig, canvasConfig } = data;
		if (
			typeof componentList === "object" &&
			typeof requestGlobalConfig === "object" &&
			typeof canvasConfig === "object"
		) {
			// 组件注册
			componentList.forEach((com: ComponentType) => {
				// 获取图表组件
				const ChartComponent: any = fetchComponent(com.key, FetchComFlagType.VIEW);
				// 获取图表配置组件
				const ChartConfigComponent: any = fetchComponent(com.key, FetchComFlagType.CONFIG);
				addComponentList({ ...com, ChartComponent, ChartConfigComponent });
			});

			// 全局请求设置
			setrequestGlobalConfig(requestGlobalConfig);

			// 全局 canvas 设置
			setGlobalCanvasConfig(canvasConfig);
		}
	};

	const updateTitle = async (title: string) => {
		const res = await updateProjectApi({ ...projectInfo!, title });
		window.$message.success(res.data);
	};
	return (
		<Layout>
			<Layout.Header className="bg-[#18181C] border-b-1 border-b-solid border-[#303030]  px-5">
				<WorkBenchHeader title={projectInfo ? projectInfo.title : ""} updateTitle={updateTitle} />
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
