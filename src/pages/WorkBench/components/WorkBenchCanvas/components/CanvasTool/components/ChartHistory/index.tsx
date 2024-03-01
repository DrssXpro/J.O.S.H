import { useMemo } from "react";
import { Button, Popover, Typography } from "antd";
import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import { historyActionTypeName } from "./historyMap";

const ChartHistory = () => {
	const { backStack } = useChartHistoryStore();

	const historyList = useMemo(() => {
		return backStack
			.map((i) => ({
				id: i.id,
				icon: historyActionTypeName[i.actionType].icon,
				type: historyActionTypeName[i.actionType].name,
				name: i.historyData[0].chartConfig.title
			}))
			.reverse();
	}, [backStack]);
	return (
		<Popover
			trigger="click"
			content={
				<div className="flex flex-col items-center gap-2">
					{historyList.length ? (
						historyList.map((i) => (
							<div className="flex items-center gap-1">
								{<i.icon />}
								<Typography.Text>
									{i.type} - {i.name}
								</Typography.Text>
							</div>
						))
					) : (
						<Typography.Text type="secondary">暂无操作记录~</Typography.Text>
					)}
				</div>
			}
		>
			<Button>历史记录</Button>
		</Popover>
	);
};

export default ChartHistory;
