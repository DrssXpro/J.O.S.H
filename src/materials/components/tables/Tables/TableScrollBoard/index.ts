import { TableCategoryEnum, TableNameEnum, MaterialCategoryEnum, IMaterialConfigType } from "@/materials/types";

export const TableScrollBoard: IMaterialConfigType = {
	key: "TableScrollBoard",
	chartCanvasKey: "TableScrollBoardCanvas",
	configKey: "TableScrollBoardConfig",
	title: "轮播列表",
	category: TableCategoryEnum.TABLE,
	categoryName: TableNameEnum.TABLE,
	menu: MaterialCategoryEnum.TABLES,
	image: "table_scrollboard.png"
};
