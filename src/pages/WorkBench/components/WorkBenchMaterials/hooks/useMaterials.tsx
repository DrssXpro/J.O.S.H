import { useEffect, useState } from "react";
import { materialsList } from "@/materials/components";
import { MaterialNameEnum, MaterialCategoryEnum, IMaterialConfigType } from "@/materials/types";
import { PictureOutlined, AimOutlined, PieChartOutlined, SketchOutlined, TableOutlined } from "@ant-design/icons";

export interface MenuOptionsType {
	key: MaterialCategoryEnum;
	label: string;
	icon: JSX.Element;
	list: IMaterialConfigType[];
}

interface CatergoryOptionsType {
	key: string;
	categoryName: string;
	list: IMaterialConfigType[];
}

const menuOptions: MenuOptionsType[] = [
	{
		key: MaterialCategoryEnum.CHARTS,
		label: MaterialNameEnum.CHARTS,
		icon: <PieChartOutlined style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.CHARTS]
	},
	{
		key: MaterialCategoryEnum.INFORMATIONS,
		label: MaterialNameEnum.INFORMATIONS,
		icon: <AimOutlined style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.INFORMATIONS]
	},
	{
		key: MaterialCategoryEnum.TABLES,
		label: MaterialNameEnum.TABLES,
		icon: <TableOutlined style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.TABLES]
	},
	{
		key: MaterialCategoryEnum.DECORATES,
		label: MaterialNameEnum.DECORATES,
		icon: <SketchOutlined style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.DECORATES]
	},
	{
		key: MaterialCategoryEnum.PHOTOS,
		label: MaterialNameEnum.PHOTOS,
		icon: <PictureOutlined style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.PHOTOS]
	}
];

const menusMap = menuOptions.reduce<Record<MaterialCategoryEnum, MenuOptionsType>>((prev, current) => {
	prev[current.key] = current;
	return prev;
}, {} as any);

// 数据结构转换: MenuOptionsType -> CatergoryOptionsType[]
const handleCategoryData = (menu: MenuOptionsType, key: MaterialCategoryEnum): CatergoryOptionsType[] => {
	const category = menu.list.reduce<
		Record<string, { key: string; categoryName: string; list: IMaterialConfigType[] }>
	>(
		(prev, current) => {
			prev[current.category] = {
				key: current.category,
				categoryName: current.categoryName,
				list: menusMap[key].list.filter((item) => item.category === current.category)
			};
			return prev;
		},
		{ all: { key: "all", categoryName: "所有", list: menusMap[key].list } }
	);

	return Object.keys(category).map((key) => category[key]);
};

function useMaterials() {
	const [currentCategory, setCurrnetCategory] = useState("all");
	const [categoryOptions, setCategoryOptions] = useState<CatergoryOptionsType[]>([]);
	const [materialList, setMaterialList] = useState<IMaterialConfigType[]>([]);

	// 初始默认为 menu 第一项里的 category
	useEffect(() => {
		setCategoryOptions(handleCategoryData(menusMap["charts"], MaterialCategoryEnum.CHARTS));
	}, []);

	// 初始默认为 category 第一项里的 materialList
	useEffect(() => {
		categoryOptions.length && setMaterialList(categoryOptions[0].list);
	}, [categoryOptions]);

	const handleClickMenu = (key: MaterialCategoryEnum) => {
		setCategoryOptions(handleCategoryData(menusMap[key], key));
		setCurrnetCategory("all");
	};

	const handleClickCategory = (key: string) => {
		setCurrnetCategory(key);
		setMaterialList(categoryOptions.find((item) => item.key === key)!.list);
	};
	return {
		menuOptions,
		categoryOptions,
		materialList,
		currentCategory,
		handleClickMenu,
		handleClickCategory
	};
}

export { useMaterials };
