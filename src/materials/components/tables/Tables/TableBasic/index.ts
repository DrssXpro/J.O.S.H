import { TableCategoryEnum, TableNameEnum, MaterialCategoryEnum, IMaterialConfigType } from "@/materials/types";

export const TableBasic: IMaterialConfigType = {
	key: "TableBasic",
	chartCanvasKey: "TableBasicCanvas",
	configKey: "TableBasicConfig",
	title: "基础分页表格",
	category: TableCategoryEnum.TABLE,
	categoryName: TableNameEnum.TABLE,
	menu: MaterialCategoryEnum.TABLES,
	image: "tables_basic.png"
};
