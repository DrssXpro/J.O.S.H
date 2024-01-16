import { TableCategoryEnum, TableNameEnum, MaterialCategoryEnum, IMaterialConfigType } from "@/materials/types";

export const TableScrollBoard: IMaterialConfigType = {
	key: "TableScrollBoard",
	chartCanvasKey: "TableScrollBoardCanvas",
	configKey: "TableScrollBoardConfig",
	title: "滚动排名列表",
	category: TableCategoryEnum.TABLE,
	categoryName: TableNameEnum.TABLE,
	menu: MaterialCategoryEnum.TABLES,
	image: "tables_list.png"
};
