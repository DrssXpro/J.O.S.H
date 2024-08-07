import { Button, Card, Col, Row, Tooltip } from "antd";
import { AiOutlinePartition, AiOutlineLaptop, AiOutlineUnorderedList } from "react-icons/ai";
import WorkBenchBox from "../WorkBenchBox";
import LayerCard from "./components/LayerCard";
import { LayerModeEnum } from "@/types/LayoutTypes";
import useLayoutStore from "@/store/layoutStore/layoutStore";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useChartStore from "@/store/chartStore/chartStore";
import { useMemo } from "react";
import useStoreSelector from "@/hooks/useStoreSelector";

const WorkBenchLayer = () => {
	const { showLayer, layerMode, controllLayer, controllLayerMode } = useLayoutStore(
		useStoreSelector(["showLayer", "layerMode", "controllLayer", "controllLayerMode"])
	);
	const { autoLayoutCanvas } = useCanvasStore(useStoreSelector(["autoLayoutCanvas"]));
	const { componentList, selectId, setTargetSelectChart } = useChartStore(
		useStoreSelector(["componentList", "selectId", "setTargetSelectChart"])
	);

	const layerList = useMemo(() => [...componentList].reverse(), [componentList]);

	return (
		<div
			className={`${showLayer ? "w-50" : "w-0"} ${
				showLayer ? "" : "opacity-0"
			} h-full transition-all border-l-1 border-l-solid border-l-[#000]`}
		>
			<WorkBenchBox
				showTop
				showTopHidden
				topTitle="图层"
				topIcon={<AiOutlinePartition />}
				bgColor="#2A2A2B"
				TopOperator={
					<div className="flex items-center">
						<Tooltip title="缩略图">
							<Button
								style={{ borderRadius: 0, borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px" }}
								icon={<AiOutlineLaptop />}
								type={layerMode === LayerModeEnum.THUMBNAIL ? "primary" : undefined}
								ghost={layerMode === LayerModeEnum.THUMBNAIL}
								onClick={() => controllLayerMode(LayerModeEnum.THUMBNAIL)}
							></Button>
						</Tooltip>
						<Tooltip title="文本列表">
							<Button
								style={{ borderRadius: 0, borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
								icon={<AiOutlineUnorderedList />}
								type={layerMode === LayerModeEnum.TEXT ? "primary" : undefined}
								ghost={layerMode === LayerModeEnum.TEXT}
								onClick={() => controllLayerMode(LayerModeEnum.TEXT)}
							></Button>
						</Tooltip>
					</div>
				}
				hiddenBox={() => {
					controllLayer(false);
					setTimeout(() => {
						autoLayoutCanvas();
					}, 500);
				}}
			>
				<Card
					bodyStyle={{ padding: "5px", width: "100%", backgroundColor: "#232324", height: "100%" }}
					className="w-full h-full"
				>
					<Row gutter={[1, 1]}>
						{layerList.map((i) => (
							<Col span={24} key={i.id}>
								<LayerCard
									mode={layerMode}
									detail={i}
									isSelect={selectId.includes(i.id)}
									selectChart={(id) => setTargetSelectChart(id)}
								/>
							</Col>
						))}
					</Row>
				</Card>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchLayer;
