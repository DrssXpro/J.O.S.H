import { lazy } from "react";
import { TabPageConfig, TabConfig, TabsEnum } from "@/types/LayoutTypes";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { IoConstruct, IoLeaf, IoFlash, IoRocket } from "react-icons/io5";
import JWithLoading from "@/components/JWithLoading";
const PageConfiguration = lazy(() => import("./PageConfiguration"));
const ChartConfiguration = lazy(() => import("./ChartConfiguration"));
const AnimationConfiguration = lazy(() => import("./AnimationConfiguration"));
const DataConfiguration = lazy(() => import("./DataConfiguration"));
const EventConfiguration = lazy(() => import("./EventConfiguration"));

const PageTabList: TabPageConfig[] = [
	{
		value: TabsEnum.PAGE_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2">
				<div>页面配置</div>
				<AiOutlineFundProjectionScreen />
			</div>
		),
		configRender: <JWithLoading element={<PageConfiguration />} loadingStyle={{ background: "none" }} />
	}
];

const ChartTabList: TabConfig[] = [
	{
		value: TabsEnum.CHART_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2">
				<div>定制</div>
				<IoConstruct />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<ChartConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	},
	{
		value: TabsEnum.CHART_ANIMATION,
		label: (
			<div className="flex items-center justify-center gap-2">
				<div>动画</div>
				<IoLeaf />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<AnimationConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	},
	{
		value: TabsEnum.CHART_DATA,
		label: (
			<div className="flex items-center justify-center gap-2">
				<div>数据</div>
				<IoFlash />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<DataConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	},
	{
		value: TabsEnum.CHART_EVENT,
		label: (
			<div className="flex items-center justify-center gap-2">
				<div>事件</div>
				<IoRocket size={14} />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<EventConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	}
];

export { PageTabList, ChartTabList };
