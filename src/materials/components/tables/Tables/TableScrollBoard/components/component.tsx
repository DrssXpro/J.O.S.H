import { ChartComponentProps } from "@/materials/types";
import { ColumnType, ScrollBoardConfigType, initColumn } from "../config";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "antd";

interface HeaderComponentProps {
	headerTitles: string[];
	columnWidths: string[];
	config: ScrollBoardConfigType;
}

interface BodyComponentProps {
	data: string[][];
	columnWidths: string[];
	height: number;
	config: ScrollBoardConfigType;
}

const justifyAlignMap = {
	left: "flex-start",
	center: "center",
	right: "flex-end"
};

const TableHeader = memo((props: HeaderComponentProps) => {
	const { config, headerTitles, columnWidths } = props;

	// 头数据整体样式
	const headerStyle = useMemo<React.CSSProperties>(() => {
		const headerConfig = config.rowConfig.header;
		const { headerHeight, headerBg, fontStyle } = headerConfig;
		return {
			height: `${headerHeight}px`,
			lineHeight: `${headerHeight}px`,
			background: `${headerBg}`,
			fontSize: `${fontStyle.size}px`,
			fontWeight: `${fontStyle.weight}`,
			color: `${fontStyle.color}`,
			fontStyle: `${fontStyle.skew}`
		};
	}, [config.rowConfig.header]);

	return (
		<div
			className="w-full flex items-center"
			style={{
				...headerStyle
			}}
		>
			{headerTitles.map((title, index) => (
				<div key={index} style={{ width: columnWidths[index], textAlign: config.columnConfig.align }}>
					{title}
				</div>
			))}
		</div>
	);
});

const TableBody = memo((props: BodyComponentProps) => {
	type RowType = {
		ceils: string[];
		rowIndex: number;
		scrollKey: number;
	};
	const { data, config, height, columnWidths } = props;
	const { animationTime, animationStyle, hoverStop } = config.publicConfig;

	// 滚动动画状态
	const animationRef = useRef({
		rowCount: config.rowConfig.body.rowCount,
		rowsData: [] as RowType[],
		updater: 0,
		rowHeight: 0,
		animationIndex: 0,
		animationTimer: 0 as unknown as NodeJS.Timeout
	});

	const [bodyState, setBodyState] = useState<{
		rows: RowType[];
		heights: number[];
	}>(calcRowsData);

	// 列对齐方式计算
	const calcAlign = useMemo(() => justifyAlignMap[config.columnConfig.align], [config.columnConfig.align]);

	// 行数据文字样式
	const rowFontStyle = useMemo<React.CSSProperties>(() => {
		const fontStyle = config.rowConfig.body.fontStyle;
		return {
			fontSize: `${fontStyle.size}px`,
			fontWeight: `${fontStyle.weight}`,
			color: `${fontStyle.color}`,
			fontStyle: `${fontStyle.skew}`
		};
	}, [config.rowConfig.body]);

	useEffect(() => {
		reAnimation();
	}, [config.publicConfig]);

	useEffect(() => {
		setBodyState(calcRowsData);
	}, [config.columnConfig, config.rowConfig]);

	// 行高计算（区分固定高度）
	function calcRowHeight(rowCount: number) {
		const totalHeight = height - config.rowConfig.header.headerHeight;
		if (config.rowConfig.body.isFixedHeight) {
			return config.rowConfig.body.rowHeight;
		} else {
			return totalHeight / rowCount;
		}
	}

	// 转化数据源
	function calcRowsData() {
		const rowLength = data.length;
		const rowCount = config.rowConfig.body.rowCount;
		let newData = data.map((i, index) => ({ ceils: i, rowIndex: index }));
		if (rowLength > rowCount && rowLength < 2 * rowCount) {
			newData = [...newData, ...newData];
		}
		const scrollData = newData.map((i, index) => ({ ...i, scrollKey: index }));
		const heights = new Array(data.length).fill(calcRowHeight(config.rowConfig.body.rowCount));
		animationRef.current.rowsData = scrollData;
		animationRef.current.rowHeight = heights[0];
		animationRef.current.rowCount = rowCount;
		reAnimation();
		return {
			rows: scrollData,
			heights
		};
	}

	async function startAnimation(start = false) {
		// eslint-disable-next-line prefer-const
		let { animationIndex, rowsData, rowCount, rowHeight, updater } = animationRef.current;
		if (animationStyle === "none") return;
		if (start) {
			await new Promise((resolve) => setTimeout(resolve, animationTime * 1000));
			if (updater !== animationRef.current.updater) {
				return;
			}
		}
		const animationNum = animationStyle === "row" ? 1 : rowCount;
		const rowLength = rowsData.length;
		let rows = rowsData.slice(animationIndex);
		rows.push(...rowsData.slice(0, animationIndex));
		rows = rows.slice(0, animationStyle === "row" ? rowCount + 1 : rowCount * 2);
		const heights = new Array(rowLength).fill(rowHeight);
		setBodyState((pre) => ({ ...pre, rows, heights }));
		await new Promise((resolve) => setTimeout(resolve, 300));
		if (updater !== animationRef.current.updater) {
			return;
		}
		animationIndex += animationNum;
		const back = animationIndex - rowLength;
		if (back >= 0) animationIndex = back;
		const newHeights = [...heights];
		newHeights.splice(0, animationNum, ...new Array(animationNum).fill(0));
		setBodyState((pre) => ({ ...pre, heights: newHeights }));
		animationRef.current.animationIndex = animationIndex;
		animationRef.current.animationTimer = setTimeout(startAnimation, animationTime * 1000 + 300);
	}

	function stopAnimation() {
		const { updater } = animationRef.current;
		animationRef.current.updater = (updater + 1) % 999999;
		animationRef.current.animationTimer && clearTimeout(animationRef.current.animationTimer);
	}

	function reAnimation() {
		stopAnimation();
		startAnimation(true);
	}

	return (
		<div
			className="flex flex-col"
			style={{ gap: `${config.rowConfig.body.rowSpacing}px` }}
			onMouseEnter={() => {
				hoverStop && stopAnimation();
			}}
			onMouseLeave={() => {
				if (hoverStop) {
					reAnimation();
				}
			}}
		>
			{bodyState.rows.map((row, index) => {
				return (
					<div
						key={`row-${row.scrollKey}`}
						className="flex transition-all overflow-hidden"
						style={{
							background: row.rowIndex % 2 === 0 ? config.publicConfig.evenBg : config.publicConfig.oddBg,
							height: `${bodyState.heights[index]}px`
						}}
					>
						{row.ceils.map((item, i) => (
							<div
								className="flex items-center"
								key={i}
								style={{
									width: columnWidths[i],
									justifyContent: calcAlign
								}}
							>
								<Typography.Text ellipsis={{ tooltip: true }} style={{ ...rowFontStyle }}>
									{item}
								</Typography.Text>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
});

const TableScrollBoardComponent = (props: ChartComponentProps) => {
	const { chartConfig } = props;
	const [options, setOptions] = useState<ScrollBoardConfigType>(chartConfig.option);

	useEffect(() => {
		setOptions(chartConfig.option);
	}, [chartConfig.option]);

	useEffect(() => {
		setOptions(() => {
			const newOptions = chartConfig.option as ScrollBoardConfigType;
			if (!Array.isArray(newOptions.dataset) || typeof newOptions.dataset[0] !== "object") return newOptions;
			const keys = Object.keys(newOptions.dataset[0]);
			const columns: ColumnType[] = [];
			keys.forEach((key) => {
				columns.push(initColumn(key, key));
			});
			return { ...newOptions, columnConfig: { ...newOptions.columnConfig, columns } };
		});
	}, [chartConfig.option.dataset]);

	const headerTitles = useMemo(() => {
		const headers = options.columnConfig.showIndex ? [options.columnConfig.indexColumn.title] : [];
		options.columnConfig.columns.forEach((column) => headers.push(column.title));
		return headers;
	}, [options.columnConfig]);

	const rowsData = useMemo(() => {
		const columnConfig = options.columnConfig;
		let startIndex = columnConfig.indexColumn.startIndex;
		const keyFileds = columnConfig.columns.map((i) => i.mapField);
		const rows = options.dataset.map((item) => {
			const row = columnConfig.showIndex ? [`${startIndex++}`] : [];
			for (const index in keyFileds) {
				row.push(item[keyFileds[index]] || columnConfig.columns[index].defaultValue);
			}
			return row;
		});
		return rows;
	}, [options.columnConfig]);

	const columnWidths = useMemo(() => {
		const columns = options.columnConfig.columns;
		const indexColumn = options.columnConfig.indexColumn;
		const showIndex = options.columnConfig.showIndex;

		const contentTotalWidth = columns.map((col) => col.columnWidth).reduce((prev, current) => prev + current, 0);
		const totalWidth = showIndex ? contentTotalWidth + indexColumn.columnWidth : contentTotalWidth;

		if (options.columnConfig.fixedWidth) {
			return showIndex
				? [`${indexColumn.columnWidth}px`, ...columns.map((col) => `${col.columnWidth}px`)]
				: columns.map((col) => `${col.columnWidth}px`);
		} else {
			return showIndex
				? [
						`calc(${((indexColumn.columnWidth / totalWidth) * 100).toFixed(2)}%)`,
						...columns.map((col) => `calc(${((col.columnWidth / totalWidth) * 100).toFixed(2)}%)`)
					]
				: columns.map((col) => `calc(${((col.columnWidth / totalWidth) * 100).toFixed(2)}%)`);
		}
	}, [options.columnConfig]);

	return (
		<div className="w-full h-full overflow-hidden">
			{options.rowConfig.header.show && (
				<TableHeader headerTitles={headerTitles} config={options} columnWidths={columnWidths} />
			)}
			<TableBody data={rowsData} config={options} columnWidths={columnWidths} height={chartConfig.attr.h} />
		</div>
	);
};

export default TableScrollBoardComponent;
