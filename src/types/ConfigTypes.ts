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
	icon: JSX.Element;
	configRender: JSX.Element;
}
