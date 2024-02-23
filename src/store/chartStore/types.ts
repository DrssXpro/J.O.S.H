import { ChartComponentProps, ComponentType } from "@/materials/types";
import { RequestConfigType, RequestGlobalConfigType } from "@/types/HttpTypes";
import { FC } from "react";

interface IComponent extends ComponentType {
	ChartComponent: FC<ChartComponentProps>;
	ChartConfigComponent: FC;
}

export interface IChartState {
	componentList: IComponent[];
	selectId: string[];
	requestGlobalConfig: RequestGlobalConfigType;
}

export interface IChartAction {
	addComponentList: (component: IComponent) => void;
	setTargetSelectChart: (select?: string | string[], push?: boolean) => void;
	updateChartConfig: <C extends keyof ComponentType, K extends keyof ComponentType[C]>(
		index: number,
		category: C,
		key: K | null,
		value: any
	) => void;
	updateChartRequestParams: <K extends keyof RequestConfigType["requestParams"]>(
		index: number,
		key: K,
		value: any
	) => void;
	updateGlobalRequestConfig: <K extends keyof RequestGlobalConfigType>(key: K, value: any) => void;
	updateGlobalRequestParams: <K extends keyof RequestGlobalConfigType["requestParams"]>(key: K, value: any) => void;
}
