import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";
import { Button, Input, InputNumber, Select, Switch } from "antd";
import { DotPositionEnum } from "../config";

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

const ImageCarouselConfigComponent = () => {
	const { updateChartConfig } = useChartStore();
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;
	return (
		<>
			<JCollapseBox name="图片" unfold>
				<>
					<div className="flex flex-col gap-2">
						{component.option.dataset.map((item: string, index: number) => (
							<div className="flex gap-2">
								<Input
									value={item}
									key={index}
									onChange={(e) => {
										const currentList = [...component.option.dataset];
										currentList[index] = e.target.value;
										updateChartConfig(chartIndex, "option", "dataset", currentList);
									}}
								/>
								<Button
									onClick={() => {
										const currentList = [...component.option.dataset];
										currentList.splice(index, 1);
										updateChartConfig(chartIndex, "option", "dataset", currentList);
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
							const newList = [...component.option.dataset, ""];
							updateChartConfig(chartIndex, "option", "dataset", newList);
						}}
					>
						+ 新增
					</Button>
				</>
			</JCollapseBox>
			<JCollapseBox name="轮播属性" unfold>
				<>
					<JSettingBox name="播放器">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="自动播放">
								<Switch
									value={component.option.autoPlay}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "autoPlay", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="间隔时间(毫秒)">
								<InputNumber
									step={1000}
									value={component.option.interval}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "interval", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="渐变效果">
								<Switch
									value={component.option.fade}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "fade", val);
									}}
								/>
							</JSettingItem>
							<JSettingItem text="动画时间">
								<InputNumber
									step={100}
									value={component.option.animateSpeed}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "animateSpeed", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="指示器">
						<div className="grid grid-cols-2 gap-2">
							<JSettingItem text="位置">
								<Select
									value={component.option.dotPlacement}
									options={dotOptions}
									onChange={(val) => {
										updateChartConfig(chartIndex, "option", "dotPlacement", val);
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
		</>
	);
};

export default ImageCarouselConfigComponent;
