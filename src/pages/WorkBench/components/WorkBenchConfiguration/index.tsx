import { Tabs } from "antd";
import WorkBenchBox from "../WorkBenchBox";
import { PageTabList } from "./components/config";

const WorkBenchConfiguration = () => {
	return (
		<div className="w-90 h-full">
			<WorkBenchBox showTop={false} bgColor="#232324">
				<div className="p-2 w-full">
					<Tabs
						size="middle"
						type="card"
						style={{ width: "100%" }}
						items={PageTabList.map(({ label, key, configRender }) => ({
							label,
							key,
							children: configRender
						}))}
					/>
				</div>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchConfiguration;
