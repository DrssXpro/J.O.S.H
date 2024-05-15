import { memo, useState } from "react";
import { Button, ColorPicker, Input, InputNumber, Radio, Segmented, Select, Switch, Tabs, TabsProps } from "antd";
import { MdAlignHorizontalLeft, MdAlignHorizontalRight, MdAlignHorizontalCenter } from "react-icons/md";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { ChartConfigComponentProps } from "@/materials/types";
import { AnimationType, ColumnType, ScrollBoardConfigType, initColumn } from "../config";
import { AiOutlineLine, AiOutlinePlus } from "react-icons/ai";

const animationOptions: { label: string; value: AnimationType }[] = [
	{ label: "无", value: "none" },
	{
		label: "整行轮播",
		value: "row"
	},
	{
		label: "整页轮播",
		value: "page"
	}
];

const configOptions = [
	{
		label: "行设置",
		value: "row"
	},
	{
		label: "列设置",
		value: "column"
	}
];

const WeightOptions = [
	{ label: "正常", value: "normal" },
	{
		label: "加粗",
		value: "bold"
	}
];

const SkewOptions = [
	{ label: "正常", value: "normal" },
	{
		label: "斜体",
		value: "italic"
	}
];

const AlignOptions = [
	{
		value: "left",
		icon: <MdAlignHorizontalLeft />
	},
	{
		value: "center",
		icon: <MdAlignHorizontalCenter />
	},
	{
		value: "right",
		icon: <MdAlignHorizontalRight />
	}
];

const PublicConfigComponent = (props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JSettingBox name="动画">
				<div className="config-items-layout">
					<JSettingItem text="轮播方式">
						<Select
							className="w-full"
							options={animationOptions}
							value={chartOptions.publicConfig.animationStyle}
							onChange={(val) => {
								update(chartIndex, "option", "publicConfig", {
									...chartOptions.publicConfig,
									animationStyle: val
								});
							}}
						/>
					</JSettingItem>
					<JSettingItem text="轮播时间(s)">
						<InputNumber
							className="w-full"
							placeholder="请输入"
							min={0}
							value={chartOptions.publicConfig.animationTime}
							onChange={(val) => {
								update(chartIndex, "option", "publicConfig", {
									...chartOptions.publicConfig,
									animationTime: val
								});
							}}
						/>
					</JSettingItem>
				</div>
			</JSettingBox>

			<JSettingBox name="控制">
				<JSettingItem text="鼠标悬停暂停">
					<Switch
						value={chartOptions.publicConfig.hoverStop}
						onChange={(val) => {
							update(chartIndex, "option", "publicConfig", {
								...chartOptions.publicConfig,
								hoverStop: val
							});
						}}
					/>
				</JSettingItem>
			</JSettingBox>
			<JSettingBox name="行配色">
				<>
					<div className="config-items-layout">
						<JSettingItem text="奇数行">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.publicConfig.oddBg}
								onChange={(val) => {
									const color = val.toHexString();
									update(chartIndex, "option", "publicConfig", {
										...chartOptions.publicConfig,
										oddBg: color
									});
								}}
							/>
						</JSettingItem>
						<JSettingItem text="偶数行">
							<ColorPicker
								className="w-full"
								showText
								value={chartOptions.publicConfig.evenBg}
								onChange={(val) => {
									const color = val.toHexString();
									update(chartIndex, "option", "publicConfig", {
										...chartOptions.publicConfig,
										evenBg: color
									});
								}}
							/>
						</JSettingItem>
					</div>
					<div className="w-full h-2 mt-3 flex border-1 border-dark-200 border-solid">
						<div className="flex-1" style={{ background: chartOptions.publicConfig.oddBg }}></div>
						<div className="flex-1" style={{ background: chartOptions.publicConfig.evenBg }}></div>
					</div>
				</>
			</JSettingBox>
		</>
	);
};

const RowConfigComponent = (props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	return (
		<>
			<JCollapseBox name="基础" unfold>
				<>
					<JSettingBox name="样式">
						<div className="config-items-layout">
							<JSettingItem text="固定行高">
								<Switch
									value={chartOptions.rowConfig.body.isFixedHeight}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: { ...chartOptions.rowConfig.body, isFixedHeight: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="行高">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									disabled={!chartOptions.rowConfig.body.isFixedHeight}
									value={chartOptions.rowConfig.body.rowHeight}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: { ...chartOptions.rowConfig.body, rowHeight: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="行数">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									disabled={chartOptions.rowConfig.body.isFixedHeight}
									value={chartOptions.rowConfig.body.rowCount}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: { ...chartOptions.rowConfig.body, rowCount: val }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="行间距">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={0}
									value={chartOptions.rowConfig.body.rowSpacing}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: { ...chartOptions.rowConfig.body, rowSpacing: val }
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="文字">
						<div className="config-items-layout">
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={5}
									value={chartOptions.rowConfig.body.fontStyle.size}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: {
												...chartOptions.rowConfig.body,
												fontStyle: { ...chartOptions.rowConfig.body.fontStyle, size: val }
											}
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.rowConfig.body.fontStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: {
												...chartOptions.rowConfig.body,
												fontStyle: { ...chartOptions.rowConfig.body.fontStyle, color }
											}
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体粗细">
								<Select
									className="w-full"
									placeholder="请输入"
									options={WeightOptions}
									value={chartOptions.rowConfig.body.fontStyle.weight}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: {
												...chartOptions.rowConfig.body,
												fontStyle: { ...chartOptions.rowConfig.body.fontStyle, weight: val }
											}
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体倾斜">
								<Select
									className="w-full"
									placeholder="请输入"
									options={SkewOptions}
									value={chartOptions.rowConfig.body.fontStyle.skew}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											body: {
												...chartOptions.rowConfig.body,
												fontStyle: { ...chartOptions.rowConfig.body.fontStyle, skew: val }
											}
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
				</>
			</JCollapseBox>
			<JCollapseBox
				name="表头"
				unfold
				operator={
					<Switch
						checkedChildren="开启"
						unCheckedChildren="关闭"
						value={chartOptions.rowConfig.header.show}
						onChange={(val) => {
							update(chartIndex, "option", "rowConfig", {
								...chartOptions.rowConfig,
								header: { ...chartOptions.rowConfig.header, show: val }
							});
						}}
					/>
				}
			>
				<>
					<JSettingBox name="样式">
						<div className="config-items-layout">
							<JSettingItem text="背景">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.rowConfig.header.headerBg}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											header: { ...chartOptions.rowConfig.header, headerBg: color }
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="行高">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={10}
									value={chartOptions.rowConfig.header.headerHeight}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											header: { ...chartOptions.rowConfig.header, headerHeight: val }
										});
									}}
								/>
							</JSettingItem>
						</div>
					</JSettingBox>
					<JSettingBox name="文字">
						<div className="config-items-layout">
							<JSettingItem text="字体大小">
								<InputNumber
									className="w-full"
									placeholder="请输入"
									min={5}
									value={chartOptions.rowConfig.header.fontStyle.size}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											header: {
												...chartOptions.rowConfig.header,
												fontStyle: { ...chartOptions.rowConfig.header.fontStyle, size: val }
											}
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体颜色">
								<ColorPicker
									className="w-full"
									showText
									value={chartOptions.rowConfig.header.fontStyle.color}
									onChange={(val) => {
										const color = val.toHexString();
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											header: {
												...chartOptions.rowConfig.header,
												fontStyle: { ...chartOptions.rowConfig.header.fontStyle, color }
											}
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体粗细">
								<Select
									className="w-full"
									placeholder="请输入"
									options={WeightOptions}
									value={chartOptions.rowConfig.header.fontStyle.weight}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											header: {
												...chartOptions.rowConfig.header,
												fontStyle: { ...chartOptions.rowConfig.header.fontStyle, weight: val }
											}
										});
									}}
								/>
							</JSettingItem>
							<JSettingItem text="字体倾斜">
								<Select
									className="w-full"
									placeholder="请输入"
									options={SkewOptions}
									value={chartOptions.rowConfig.header.fontStyle.skew}
									onChange={(val) => {
										update(chartIndex, "option", "rowConfig", {
											...chartOptions.rowConfig,
											header: {
												...chartOptions.rowConfig.header,
												fontStyle: { ...chartOptions.rowConfig.header.fontStyle, skew: val }
											}
										});
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

const ColumnConfigComponent = (props: ChartConfigComponentProps) => {
	const { chartIndex, chartOptions, update } = props;
	const [currentColumn, setCurrentColumn] = useState("1");
	const columns = chartOptions.columnConfig.columns as any[];
	const ColumnTabs: TabsProps["items"] = columns.map((col, index) => ({
		key: `${index + 1}`,
		label: `列-${index + 1}`,
		children: <SingleColumnConfigComponent {...props} columnIndex={index} column={col} />
	}));

	return (
		<>
			<JSettingBox name="列宽">
				<div className="mt-0.5">
					<Radio.Group
						value={chartOptions.columnConfig.fixedWidth}
						onChange={(e) => {
							update(chartIndex, "option", "columnConfig", {
								...chartOptions.columnConfig,
								fixedWidth: e.target.value
							});
						}}
					>
						<Radio value={false}>自适应列宽</Radio>
						<Radio value={true}>固定列宽</Radio>
					</Radio.Group>
				</div>
			</JSettingBox>
			<JSettingBox name="对齐方式">
				<Segmented
					size="small"
					block
					options={AlignOptions}
					value={chartOptions.columnConfig.align}
					onChange={(value) => {
						update(chartIndex, "option", "columnConfig", {
							...chartOptions.columnConfig,
							align: value
						});
					}}
				/>
			</JSettingBox>
			<JCollapseBox
				name="序号列"
				operator={
					<Switch
						checkedChildren="开启"
						unCheckedChildren="关闭"
						value={chartOptions.columnConfig.showIndex}
						onChange={(val) => {
							update(chartIndex, "option", "columnConfig", {
								...chartOptions.columnConfig,
								showIndex: val
							});
						}}
					/>
				}
			>
				<JSettingBox name="基础">
					<div className="config-items-layout">
						<JSettingItem text="标题">
							<Input
								className="w-full"
								placeholder="请输入"
								value={chartOptions.columnConfig.indexColumn.title}
								onChange={(e) => {
									update(chartIndex, "option", "columnConfig", {
										...chartOptions.columnConfig,
										indexColumn: { ...chartOptions.columnConfig.indexColumn, title: e.target.value }
									});
								}}
							/>
						</JSettingItem>
						<JSettingItem text="起始值">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								value={chartOptions.columnConfig.indexColumn.startIndex}
								onChange={(val) => {
									update(chartIndex, "option", "columnConfig", {
										...chartOptions.columnConfig,
										indexColumn: { ...chartOptions.columnConfig.indexColumn, startIndex: val }
									});
								}}
							/>
						</JSettingItem>
						<JSettingItem text="列宽">
							<InputNumber
								className="w-full"
								placeholder="请输入"
								value={chartOptions.columnConfig.indexColumn.columnWidth}
								onChange={(val) => {
									update(chartIndex, "option", "columnConfig", {
										...chartOptions.columnConfig,
										indexColumn: { ...chartOptions.columnConfig.indexColumn, columnWidth: val }
									});
								}}
							/>
						</JSettingItem>
					</div>
				</JSettingBox>
			</JCollapseBox>
			<JCollapseBox
				unfold
				name="内容列"
				operator={
					<div className="flex gap-1">
						<Button
							size="small"
							icon={<AiOutlinePlus />}
							onClick={() => {
								update(chartIndex, "option", "columnConfig", {
									...chartOptions.columnConfig,
									columns: [...chartOptions.columnConfig.columns, initColumn("", "")]
								});
							}}
						/>
						<Button
							size="small"
							icon={<AiOutlineLine />}
							onClick={() => {
								const index = parseInt(currentColumn) - 1;
								if (index === 0) {
									window.$message.warning("最后一列数据不能删除！");
									return;
								}
								const newColumns = [...chartOptions.columnConfig.columns];
								newColumns.splice(index, 1);
								setCurrentColumn(`${index}`);
								update(chartIndex, "option", "columnConfig", {
									...chartOptions.columnConfig,
									columns: newColumns
								});
							}}
						/>
					</div>
				}
			>
				<Tabs
					defaultActiveKey="1"
					items={ColumnTabs}
					onChange={(val) => {
						setCurrentColumn(val);
					}}
				/>
			</JCollapseBox>
		</>
	);
};

const SingleColumnConfigComponent = (props: {
	chartIndex: number;
	chartOptions: ScrollBoardConfigType;
	columnIndex: number;
	column: ColumnType;
	update: Pick<ChartConfigComponentProps, "update">["update"];
}) => {
	const { chartIndex, chartOptions, columnIndex, column, update } = props;
	return (
		<>
			<JSettingBox name="整体">
				<div className="config-items-layout">
					<JSettingItem text="列名">
						<Input
							className="w-full"
							placeholder="请输入"
							value={column.title}
							onChange={(e) => {
								const newColumns = [...chartOptions.columnConfig.columns].map((item, index) =>
									index === columnIndex ? { ...item, title: e.target.value } : item
								);
								update(chartIndex, "option", "columnConfig", {
									...chartOptions.columnConfig,
									columns: newColumns
								});
							}}
						/>
					</JSettingItem>
					<JSettingItem text="列宽">
						<InputNumber
							className="w-full"
							placeholder="请输入"
							min={0}
							value={column.columnWidth}
							onChange={(val) => {
								const newColumns = [...chartOptions.columnConfig.columns].map((item, index) =>
									index === columnIndex ? { ...item, columnWidth: val } : item
								);
								update(chartIndex, "option", "columnConfig", {
									...chartOptions.columnConfig,
									columns: newColumns
								});
							}}
						/>
					</JSettingItem>
				</div>
			</JSettingBox>
			<JSettingBox name="数据">
				<div className="config-items-layout">
					<JSettingItem text="映射字段">
						<Input
							className="w-full"
							placeholder="请输入"
							value={column.mapField}
							onChange={(e) => {
								const newColumns = [...chartOptions.columnConfig.columns].map((item, index) =>
									index === columnIndex ? { ...item, mapField: e.target.value } : item
								);
								update(chartIndex, "option", "columnConfig", {
									...chartOptions.columnConfig,
									columns: newColumns
								});
							}}
						/>
					</JSettingItem>
					<JSettingItem text="默认数据">
						<Input
							className="w-full"
							placeholder="请输入"
							value={column.defaultValue}
							onChange={(e) => {
								const newColumns = [...chartOptions.columnConfig.columns].map((item, index) =>
									index === columnIndex ? { ...item, defaultValue: e.target.value } : item
								);
								update(chartIndex, "option", "columnConfig", {
									...chartOptions.columnConfig,
									columns: newColumns
								});
							}}
						/>
					</JSettingItem>
				</div>
			</JSettingBox>
		</>
	);
};

const TableScrollBoardConfigComponent = memo((props: ChartConfigComponentProps) => {
	const [config, setConfig] = useState("row");
	return (
		<>
			<PublicConfigComponent {...props} />
			<Segmented
				options={configOptions}
				block
				value={config}
				onChange={(value) => {
					setConfig(value as "row" | "column");
				}}
			/>
			<div className="mt-4">
				{config === "row" ? <RowConfigComponent {...props} /> : <ColumnConfigComponent {...props} />}
			</div>
		</>
	);
});

export default TableScrollBoardConfigComponent;
