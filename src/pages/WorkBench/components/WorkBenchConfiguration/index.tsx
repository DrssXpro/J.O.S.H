import { useMemo, useState } from "react";
import { Segmented } from "antd";
import WorkBenchBox from "../WorkBenchBox";
import { PageTabList, ChartTabList } from "./components";
import useLayoutStore from "@/store/layoutStore/layoutStore";
import useChartStore from "@/store/chartStore/chartStore";
import useEditCharts from "@/hooks/useEditCharts";
import { TabsEnum } from "@/types/LayoutTypes";

const WorkBenchConfiguration = () => {
	const [currentConfig, setCurrentConfig] = useState<TabsEnum>(ChartTabList[0].value);
	const showConfiguration = useLayoutStore((selector) => selector.showConfiguration);
	const selectId = useChartStore((selector) => selector.selectId);
	const updateChartConfig = useChartStore((selector) => selector.updateChartConfig);
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	const isSelect = useMemo(() => {
		return selectId && !!selectId.length;
	}, [selectId]);
	return (
		<div className={`${showConfiguration ? "w-[360px]" : "w-0"} h-full transition-all`}>
			<WorkBenchBox showTop={false} bgColor="#232324">
				<div className="p-2 w-full">
					{!isSelect && (
						<>
							<Segmented options={PageTabList} block size="large" defaultValue={PageTabList[0].value} />
							<div className="mt-4">{PageTabList[0].configRender}</div>
						</>
					)}
					{isSelect && (
						<>
							<Segmented
								options={ChartTabList}
								block
								size="large"
								value={currentConfig}
								onChange={(val) => {
									setCurrentConfig(val as TabsEnum);
								}}
							/>
							<div className="mt-4">
								{ChartTabList.find((item) => item.value === currentConfig)!.configRender({
									chartIndex,
									component,
									update: updateChartConfig
								})}
							</div>
						</>
					)}
				</div>
			</WorkBenchBox>
		</div>
	);
};

export default WorkBenchConfiguration;
