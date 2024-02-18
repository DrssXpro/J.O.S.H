import { ChartComponentProps, ComponentType } from "@/materials/types";
import { FC } from "react";

interface IComponent extends ComponentType {
	ChartComponent: FC<ChartComponentProps>;
	ChartConfigComponent: FC;
}

export interface IChartState {
	componentList: IComponent[];
	selectId: string[];
}

export interface IChartAction {
	addComponentList: (component: IComponent) => void;
	setTargetSelectChart: (select?: string | string[], push?: boolean) => void;
	updateChartConfig: <C extends keyof ComponentType, K extends keyof ComponentType[C]>(
		index: number,
		category: C,
		key: K,
		value: any
	) => void;
}
