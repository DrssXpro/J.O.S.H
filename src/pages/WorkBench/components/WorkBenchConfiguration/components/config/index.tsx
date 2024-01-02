import { lazy } from "react";
import { type TabConfig, TabsEnum } from "@/types/ConfigTypes";
import { FundProjectionScreenOutlined } from "@ant-design/icons";

const PageConfiguration = lazy(() => import("../PageConfiguration"));

const PageTabList: TabConfig[] = [
	{
		key: TabsEnum.PAGE_SETTING,
		label: (
			<div className="flex items-center justify-center gap-2 w-77">
				<div>页面配置</div>
				<FundProjectionScreenOutlined style={{ fontSize: "18px" }} />
			</div>
		),
		icon: <FundProjectionScreenOutlined />,
		configRender: <PageConfiguration />
	}
];

export { PageTabList };
