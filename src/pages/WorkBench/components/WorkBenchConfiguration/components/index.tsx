import { lazy } from "react";
import { type TabConfig, TabsEnum } from "@/types/LayoutTypes";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { Construct, Leaf, Flash, Rocket } from "@ricons/ionicons5";
import JIcon from "@/components/JIcon";

const PageConfiguration = lazy(() => import("./PageConfiguration"));
const ChartConfiguration = lazy(() => import("./ChartConfiguration"));
const AnimationConfiguration = lazy(() => import("./AnimationConfiguration"));
const DataConfiguration = lazy(() => import("./DataConfiguration"));

const PageTabList: TabConfig[] = [
	{
		key: TabsEnum.PAGE_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2 w-77">
				<div>页面配置</div>
				<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />
			</div>
		),
		configRender: <PageConfiguration />
	}
];

const ChartTabList: TabConfig[] = [
	{
		key: TabsEnum.CHART_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2 w-13">
				<div>定制</div>
				<JIcon icon={<Construct />} />
			</div>
		),
		configRender: <ChartConfiguration />
	},
	{
		key: TabsEnum.CHART_ANIMATION,
		label: (
			<div className="flex items-center justify-center gap-2 w-12">
				<div>动画</div>
				<JIcon icon={<Leaf />} />
			</div>
		),
		configRender: <AnimationConfiguration />
	},
	{
		key: TabsEnum.CHART_DATA,
		label: (
			<div className="flex items-center justify-center gap-2 w-12">
				<div>数据</div>
				<JIcon icon={<Flash />} />
			</div>
		),
		configRender: <DataConfiguration />
	},
	{
		key: TabsEnum.CHART_EVENT,
		label: (
			<div className="flex items-center justify-center gap-2 w-13.5">
				<div>事件</div>
				<JIcon icon={<Rocket />} />
			</div>
		),
		configRender: <ChartConfiguration />
	}
];

export { PageTabList, ChartTabList };
