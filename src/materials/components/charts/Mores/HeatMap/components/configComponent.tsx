import { memo } from "react";
import { ChartConfigComponentProps } from "@/materials/types";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";

const HeatMapConfigComponent = memo((props: ChartConfigComponentProps) => {
	return <JGlobalChartSetting {...props} />;
});

export default HeatMapConfigComponent;
