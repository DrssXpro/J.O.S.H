import { memo } from "react";
import JGlobalChartSetting from "@/components/JChartConfiguration/JGlobalChartSetting";
import { ChartConfigComponentProps } from "@/materials/types";

const MapBaseConfigComponent = memo((props: ChartConfigComponentProps) => {
	return (
		<>
			<JGlobalChartSetting {...props} />
		</>
	);
});

export default MapBaseConfigComponent;
