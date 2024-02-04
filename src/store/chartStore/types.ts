import { ChartComponentProps, ComponentType } from "@/materials/types";
import { FC } from "react";

interface IComponent extends ComponentType {
	ChartComponent: FC<ChartComponentProps>;
	ChartConfigComponent: FC;
}

export interface IChartState {
	componentList: IComponent[];
}

export interface IChartAction {
	addComponentList: (component: IComponent) => void;
}
