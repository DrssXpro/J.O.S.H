import { Tabs } from "antd";
import WorkBenchBox from "../WorkBenchBox";
import { PageTabList, ChartTabList } from "./components";
import useLayoutStore from "@/store/layoutStore/layoutStore";
import useChartStore from "@/store/chartStore/chartStore";
import { useMemo } from "react";

const WorkBenchConfiguration = () => {
	const { showConfiguration } = useLayoutStore();
	const { selectId } = useChartStore();

	const isSelect = useMemo(() => {
		return selectId && selectId.length;
	}, [selectId]);
	return (
		<div className={`${showConfiguration ? "w-[360px]" : "w-0"} h-full transition-all`}>
			<WorkBenchBox showTop={false} bgColor="#232324">
				<div className="p-2 w-full">
					{!isSelect && (
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
					)}
					{isSelect && (
						<Tabs
							size="middle"
							type="card"
							items={ChartTabList.map(({ label, key, configRender }) => ({
								label,
								key,
								children: configRender
							}))}
						/>
					)}
				</div>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchConfiguration;
