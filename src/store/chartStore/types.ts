import { ChartComponentProps, ComponentType } from "@/materials/types";
import { RequestConfigType, RequestGlobalConfigType } from "@/types/HttpTypes";
import { FC } from "react";

export interface IComponent extends ComponentType {
	ChartComponent: FC<ChartComponentProps>;
	ChartConfigComponent: FC;
}

export interface IChartState {
	componentList: IComponent[];
	selectId: string[];
	mousePosition: {
		startX: number;
		startY: number;
		x: number;
		y: number;
	};
	requestGlobalConfig: RequestGlobalConfigType;
}

export interface IChartAction {
	setMousePosition(x?: number, y?: number, startX?: number, startY?: number): void;
	addComponentList: (component: IComponent, isHead?: boolean) => void;
	setTargetSelectChart: (select?: string | string[], push?: boolean) => void;
	setrequestGlobalConfig: (config: RequestGlobalConfigType) => void;
	getSelectId: () => string[];
	getComponentList: () => IComponent[];
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
	insertComponentByIndex: (index: number, component: IComponent) => void;
	swapComponentByIndex: (currentIndex: number, swapIndex: number) => void;
	removeComponents: (ids: string[]) => void;
	removeComponentByIndex: (index: number) => void;
	removeComponentHeadOrTail: (type: "head" | "tail") => void;
}
