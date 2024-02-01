import { Tabs } from "antd";
import WorkBenchBox from "../WorkBenchBox";
import { PageTabList } from "./components/config";
import useLayoutStore from "@/store/layoutStore/layoutStore";

const WorkBenchConfiguration = () => {
	const { showConfiguration } = useLayoutStore();
	return (
		<div className={`${showConfiguration ? "w-[360px]" : "w-0"} h-full transition-all`}>
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
