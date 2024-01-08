import { useState } from "react";
import { Button, Card, Col, Row, Tooltip } from "antd";
import { PartitionOutlined, LaptopOutlined, UnorderedListOutlined } from "@ant-design/icons";
import WorkBenchBox from "../WorkBenchBox";
import LayerCard from "./components/LayerCard";
import { LayerModeEnum } from "@/types/LayoutTypes";
import useLayoutStore from "@/store/layoutStore";

const WorkBenchLayer = () => {
	const { showLayer, controllLayer } = useLayoutStore();
	const [mode, setMode] = useState<LayerModeEnum>(LayerModeEnum.THUMBNAIL);
	return (
		<div
			className={`${showLayer ? "w-50" : "w-0"} ${
				showLayer ? "" : "opacity-0"
			} h-full transition-all border-l-1 border-l-[#000]`}
		>
			<WorkBenchBox
				showTop
				showTopHidden
				topTitle="图层"
				topIcon={<PartitionOutlined />}
				bgColor="#2A2A2B"
				TopOperator={
					<div className="flex items-center">
						<Tooltip title="缩略图">
							<Button
								style={{ borderRadius: 0 }}
								icon={<LaptopOutlined />}
								onClick={() => setMode(LayerModeEnum.THUMBNAIL)}
							></Button>
						</Tooltip>
						<Tooltip title="文本列表">
							<Button
								style={{ borderRadius: 0 }}
								icon={<UnorderedListOutlined />}
								onClick={() => setMode(LayerModeEnum.TEXT)}
							></Button>
						</Tooltip>
					</div>
				}
				hiddenBox={() => controllLayer(false)}
			>
				<Card
					bodyStyle={{ padding: "5px", width: "100%", backgroundColor: "#232324", height: "100%" }}
					className="w-full h-full"
				>
					<Row gutter={[1, 1]}>
						{[1, 2, 3].map((i) => (
							<Col span={24} key={i}>
								<LayerCard mode={mode} />
							</Col>
						))}
					</Row>
				</Card>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchLayer;
