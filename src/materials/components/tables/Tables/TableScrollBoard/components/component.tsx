import { ChartComponentProps } from "@/materials/types";
import { ScrollBoardConfigType } from "../config";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Typography } from "antd";

interface HeaderComponentProps {
	headerTitles: string[];
	config: ScrollBoardConfigType;
	calcColumnWidth: (index: number) => string;
}

interface BodyComponentProps {
	data: string[][];
	config: ScrollBoardConfigType;
	height: number;
	calcColumnWidth: (index: number) => string;
}

const justifyAlignMap = {
	left: "flex-start",
	center: "center",
	right: "flex-end"
};

const TableHeader = memo((props: HeaderComponentProps) => {
	const { config, headerTitles, calcColumnWidth } = props;

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
				<div key={index} style={{ width: `${calcColumnWidth(index)}`, textAlign: config.columnConfig.align }}>
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
	const { data, config, height, calcColumnWidth } = props;
	const { animationTime, animationStyle, hoverStop } = config.publicConfig;

	// 滚动动画状态
	const animationRef = useRef({
		rowCount: config.rowConfig.body.rowCount,
		updater: 0,
		rowHeight: 0,
		animationIndex: 0,
		animationTimer: 0 as unknown as NodeJS.Timeout
	});

	// 列对齐方式计算
	const calcAlign = useMemo(() => justifyAlignMap[config.columnConfig.align], [config.columnConfig.align]);

	// 行高计算（区分固定高度）
	const calcRowHeight = (rowCount: number) => {
		const totalHeight = height - config.rowConfig.header.headerHeight;
		if (config.rowConfig.body.isFixedHeight) {
			return config.rowConfig.body.rowHeight;
		} else {
			return totalHeight / rowCount;
		}
	};

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
		resize();
	}, [config.rowConfig.body.rowCount]);

	const resize = () => {
		const rowCount = config.rowConfig.body.rowCount;
		const rowHeight = calcRowHeight(rowCount);
		animationRef.current = { ...animationRef.current, rowCount, rowHeight };
		reAnimation();
	};

	const calcRowsData = () => {
		const rowLength = data.length;
		const { rowCount } = animationRef.current;
		let newData = data.map((i, index) => ({ ceils: i, rowIndex: index }));
		if (rowLength > rowCount && rowLength < 2 * rowCount) {
			newData = [...newData, ...newData];
		}
		const scrollData = newData.map((i, index) => ({ ...i, scrollKey: index }));

		return {
			rows: scrollData,
			rowsData: scrollData,
			heights: new Array(data.length).fill(calcRowHeight(config.rowConfig.body.rowCount))
		};
	};

	const [bodyState, setBodyState] = useState<{
		rowsData: RowType[];
		rows: RowType[];
		heights: number[];
	}>(calcRowsData);

	const startAnimation = async (start = false) => {
		const { rowsData } = bodyState;
		let { animationIndex } = animationRef.current;
		const { rowCount, rowHeight, updater } = animationRef.current;
		if (animationStyle === "none") return;
		if (start) {
			await new Promise((resolve) => setTimeout(resolve, animationTime * 1000));
			if (updater !== animationRef.current.updater) {
				console.log("stop update");
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
			console.log("stop update");
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
	};

	const stopAnimation = () => {
		const { updater } = animationRef.current;
		animationRef.current.updater = (updater + 1) % 999999;
		animationRef.current.animationTimer && clearTimeout(animationRef.current.animationTimer);
	};

	const reAnimation = () => {
		stopAnimation();
		startAnimation(true);
	};

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
									width: `${calcColumnWidth(i)}`,
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
	const config = chartConfig.option as ScrollBoardConfigType;

	const headerTitles = useMemo(() => {
		const headers = config.columnConfig.showIndex ? [config.columnConfig.indexColumn.title] : [];
		config.columnConfig.columns.forEach((column) => headers.push(column.title));
		return headers;
	}, [config.columnConfig]);

	const rowsData = useMemo(() => {
		const columnConfig = config.columnConfig;
		let startIndex = columnConfig.indexColumn.startIndex;
		const keyFileds = columnConfig.columns.map((i) => i.mapField);
		const rows = config.dataset.map((item) => {
			const row = columnConfig.showIndex ? [`${startIndex++}`] : [];
			for (const index in keyFileds) {
				row.push(item[keyFileds[index]] || columnConfig.columns[index].defaultValue);
			}
			return row;
		});
		return rows;
	}, [config.columnConfig]);

	const calcColumnWidth = useCallback(
		(index: number) => {
			const columns = config.columnConfig.columns;
			const indexColumn = config.columnConfig.indexColumn;
			const showIndex = config.columnConfig.showIndex;

			const contentTotalWidth = columns
				.map((col) => col.columnWidth)
				.reduce((prev, current) => prev + current, 0);
			const totalWidth = showIndex ? contentTotalWidth + indexColumn.columnWidth : contentTotalWidth;

			if (config.columnConfig.fixedWidth) {
				if (showIndex) {
					if (index === 0) return `${indexColumn.columnWidth}px`;
					else return `${columns[index - 1].columnWidth}px`;
				} else {
					return `${columns[index].columnWidth}px`;
				}
			} else {
				if (showIndex) {
					return `calc(${(
						((index === 0 ? indexColumn.columnWidth : columns[index - 1].columnWidth) / totalWidth) *
						100
					).toFixed(2)}%)`;
				} else {
					return `calc(${((columns[index].columnWidth / totalWidth) * 100).toFixed(2)}%)`;
				}
			}
		},
		[config.columnConfig]
	);
	return (
		<div className="w-full h-full overflow-hidden">
			{config.rowConfig.header.show && (
				<TableHeader headerTitles={headerTitles} config={config} calcColumnWidth={calcColumnWidth} />
			)}
			<TableBody data={rowsData} config={config} calcColumnWidth={calcColumnWidth} height={chartConfig.attr.h} />
		</div>
	);
};

export default TableScrollBoardComponent;
