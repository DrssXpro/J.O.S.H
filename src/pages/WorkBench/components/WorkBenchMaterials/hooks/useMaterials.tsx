import { useEffect, useState } from "react";
import { materialsList } from "@/materials/components";
import { MaterialNameEnum, MaterialCategoryEnum, IMaterialConfigType, ChartFrameEnum } from "@/materials/types";
import {
	AiOutlinePicture,
	AiOutlineAim,
	AiOutlinePieChart,
	AiOutlineSketch,
	AiOutlineTable,
	AiOutlineGift
} from "react-icons/ai";
import { getSourceListApi } from "@/service/api/sourceListApi";
import { JSONParse } from "@/utils/utils";

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
		icon: <AiOutlinePieChart style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.CHARTS]
	},
	{
		key: MaterialCategoryEnum.INFORMATIONS,
		label: MaterialNameEnum.INFORMATIONS,
		icon: <AiOutlineAim style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.INFORMATIONS]
	},
	{
		key: MaterialCategoryEnum.TABLES,
		label: MaterialNameEnum.TABLES,
		icon: <AiOutlineTable style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.TABLES]
	},
	{
		key: MaterialCategoryEnum.DECORATES,
		label: MaterialNameEnum.DECORATES,
		icon: <AiOutlineSketch style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.DECORATES]
	},
	{
		key: MaterialCategoryEnum.PHOTOS,
		label: MaterialNameEnum.PHOTOS,
		icon: <AiOutlinePicture style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.PHOTOS]
	},
	// 资源库：动态请求获取
	{
		key: MaterialCategoryEnum.SOURCELIB,
		label: MaterialNameEnum.SOURCELIB,
		icon: <AiOutlineGift style={{ fontSize: "20px" }} />,
		list: materialsList[MaterialCategoryEnum.SOURCELIB]
	}
];

// 资源库图片统一配置
const imageConfig: IMaterialConfigType & { attr: any } = {
	key: "Image",
	chartCanvasKey: "ImageCanvas",
	configKey: "ImageConfig",
	title: "",
	category: "",
	categoryName: "",
	menu: MaterialCategoryEnum.SOURCELIB,
	chartFrame: ChartFrameEnum.COMMON,
	image: "",
	attr: {},
	resource: true
};

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
	const [sourceLoading, setSourceLoading] = useState(false);
	const [categoryOptions, setCategoryOptions] = useState<CatergoryOptionsType[]>([]);
	const [materialList, setMaterialList] = useState<IMaterialConfigType[]>([]);

	// 初始默认为 menu 第一项里的 category
	useEffect(() => {
		setSourceLoading(true);
		getSourceListApi()
			.then((res) => {
				const list = res.data.map((i) => ({
					...imageConfig,
					category: i.category,
					categoryName: i.categoryName,
					image: i.thumbnail,
					title: i.projectName,
					attr: JSONParse(i.content).attr
				}));
				menuOptions[menuOptions.length - 1].list = list;
			})
			.finally(() => {
				setCategoryOptions(handleCategoryData(menusMap["charts"], MaterialCategoryEnum.CHARTS));
				setSourceLoading(false);
			});
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
		sourceLoading,
		handleClickMenu,
		handleClickCategory
	};
}

export { useMaterials };
