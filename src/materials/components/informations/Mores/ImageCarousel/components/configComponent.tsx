import { memo } from "react";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { Button, Input, InputNumber, Select, Switch } from "antd";
import { DotPositionEnum } from "../config";
import { ChartConfigComponentProps } from "@/materials/types";

const dotOptions = [
	{
		label: DotPositionEnum.TOP,
		value: DotPositionEnum.TOP
	},
	{
		label: DotPositionEnum.BOTTOM,
		value: DotPositionEnum.BOTTOM
	},
	{
		label: DotPositionEnum.LEFT,
		value: DotPositionEnum.LEFT
	},
	{
		label: DotPositionEnum.RIGHT,
		value: DotPositionEnum.RIGHT
	}
];

const ImageCarouselConfigComponent = memo((props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JCollapseBox name="图片" unfold>
				<>
					<div className="flex flex-col gap-2">
						{chartOptions.dataset.map((item: string, index: number) => (
							<div className="flex gap-2">
								<Input
									value={item}
									key={index}
									onChange={(e) => {
										const currentList = [...chartOptions.dataset];
										currentList[index] = e.target.value;
										update(chartIndex, "option", "dataset", currentList);
									}}
								/>
								<Button
									onClick={() => {
										const currentList = [...chartOptions.dataset];
										currentList.splice(index, 1);
										update(chartIndex, "option", "dataset", currentList);
									}}
								>
									-
								</Button>
							</div>
						))}
					</div>
					<Button
						className="mt-2"
						block
						onClick={() => {
							const newList = [...chartOptions.dataset, ""];
							update(chartIndex, "option", "dataset", newList);
						}}
					>
						+ 新增
					</Button>
				</>
			</JCollapseBox>
			<JCollapseBox name="轮播属性" unfold>
				<>
					<JSettingBox name="播放器">
						<div className="config-layout">
							<JSettingItem text="自动播放">
								<Switch
									value={chartOptions.autoPlay}
									onChange={(val) => {
										update(chartIndex, "option", "autoPlay", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="间隔时间(毫秒)">
								<InputNumber
									step={1000}
									value={chartOptions.interval}
									onChange={(val) => {
										update(chartIndex, "option", "interval", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="渐变效果">
								<Switch
									value={chartOptions.fade}
									onChange={(val) => {
										update(chartIndex, "option", "fade", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="动画时间">
								<InputNumber
									step={100}
									value={chartOptions.animateSpeed}
									onChange={(val) => {
										update(chartIndex, "option", "animateSpeed", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="指示器">
						<div className="config-layout">
							<JSettingItem text="位置">
								<Select
									value={chartOptions.dotPlacement}
									options={dotOptions}
									onChange={(val) => {
										update(chartIndex, "option", "dotPlacement", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
});

export default ImageCarouselConfigComponent;
