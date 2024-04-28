import { ConfigurationProps } from "@/materials/types";

export const enum MaterialsModeEnum {
	SINGLE = "single",
	DOUBLE = "double"
}

export const enum LayerModeEnum {
	THUMBNAIL = "thumbnail",
	TEXT = "text"
}

export const enum TabsEnum {
	PAGE_SETTING = "pageSetting",
	CHART_SETTING = "chartSetting",
	CHART_ANIMATION = "chartAnimation",
	CHART_DATA = "chartData",
	CHART_EVENT = "chartEvent"
}

export interface TabConfig {
	key: TabsEnum;
	label: JSX.Element | string;
	configRender: (props: ConfigurationProps) => JSX.Element;
}

export interface TabPageConfig extends Pick<TabConfig, "key" | "label"> {
	configRender: JSX.Element;
}

export enum PreviewScaleEnum {
	FIT = "fit",
	SCROLL_Y = "scrollY",
	SCROLL_X = "scrollX",
	FULL = "full"
}
