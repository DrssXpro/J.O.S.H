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
		key: TabsEnum.PAGE_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2 w-77">
				<div>页面配置</div>
				<AiOutlineFundProjectionScreen />
			</div>
		),
		configRender: <JWithLoading element={<PageConfiguration />} loadingStyle={{ background: "none" }} />
	}
];

const ChartTabList: TabConfig[] = [
	{
		key: TabsEnum.CHART_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2 w-13">
				<div>定制</div>
				<IoConstruct />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<ChartConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	},
	{
		key: TabsEnum.CHART_ANIMATION,
		label: (
			<div className="flex items-center justify-center gap-2 w-12">
				<div>动画</div>
				<IoLeaf />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<AnimationConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	},
	{
		key: TabsEnum.CHART_DATA,
		label: (
			<div className="flex items-center justify-center gap-2 w-12">
				<div>数据</div>
				<IoFlash />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<DataConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	},
	{
		key: TabsEnum.CHART_EVENT,
		label: (
			<div className="flex items-center justify-center gap-2 w-13.5">
				<div>事件</div>
				<IoRocket size={13} />
			</div>
		),
		configRender: (props) => (
			<JWithLoading element={<EventConfiguration {...props} />} loadingStyle={{ background: "none" }} />
		)
	}
];

export { PageTabList, ChartTabList };
