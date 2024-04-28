import { PublicEventsConfig } from "@/materials/types";
import { UpdateChartConfigType } from "@/store/chartStore/types";

export interface AllEventsProps {
	chartIndex: number;
	update: UpdateChartConfigType;
	events: PublicEventsConfig;
}
