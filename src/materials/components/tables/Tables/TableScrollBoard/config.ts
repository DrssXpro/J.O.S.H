import { PublicConfigClass } from "@/materials/public/publicConfig";
import { TableScrollBoard } from ".";
import { ComponentType } from "@/materials/types";
import tableData from "./data";

export type AlignType = "left" | "center" | "right";

export type AnimationType = "none" | "row" | "page";

export type ColumnType = {
	title: string;
	columnWidth: number;
	mapField: string;
	defaultValue: string;
	isIndex: boolean;
};

export const initColumn = (title: string, mapField: string, isIndex = false): ColumnType => ({
	title,
	mapField,
	isIndex,
	defaultValue: "",
	columnWidth: 110
});

const tableOptions = () => {
	const options = {
		dataset: tableData as Record<string, string>[],
		publicConfig: {
			animationStyle: "row" as AnimationType,
			animationTime: 2,
			hoverStop: false,
			oddBg: "#2A2A2CFF",
			evenBg: "#232324FF"
		},
		rowConfig: {
			header: {
				headerBg: "#B885851A",
				headerHeight: 40,
				show: true,
				fontStyle: {
					size: 14,
					weight: "normal",
					color: "#fff",
					skew: "normal"
				}
			},
			body: {
				isFixedHeight: false,
				rowHeight: 50,
				rowCount: 7,
				rowSpacing: 0,
				fontStyle: {
					size: 14,
					weight: "normal",
					color: "#fff",
					skew: "normal"
				}
			}
		},
		columnConfig: {
			fixedWidth: false,
			showIndex: false,
			align: "center" as AlignType,
			indexColumn: {
				title: "#",
				startIndex: 1,
				columnWidth: 50,
				fontStyle: {
					size: 14,
					weight: "normal",
					color: "",
					skew: "normal"
				}
			},
			columns: [] as ColumnType[]
		}
	};

	const keys = Object.keys(options.dataset[0]);
	keys.forEach((key) => {
		options.columnConfig.columns.push(initColumn(key, key));
	});
	return options;
};

export const option = tableOptions();

export type ScrollBoardConfigType = typeof option;

export default class Config extends PublicConfigClass implements ComponentType {
	public key = TableScrollBoard.key;
	public chartConfig = TableScrollBoard;
	public option = option;
}
