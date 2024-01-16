import { TableCategoryEnum, TableNameEnum, MaterialCategoryEnum, IMaterialConfigType } from "@/materials/types";

export const TableList: IMaterialConfigType = {
	key: "TableList",
	chartCanvasKey: "TableListCanvas",
	configKey: "TableListConfig",
	title: "滚动排名列表",
	category: TableCategoryEnum.TABLE,
	categoryName: TableNameEnum.TABLE,
	menu: MaterialCategoryEnum.TABLES,
	image: "tables_list.png"
};
