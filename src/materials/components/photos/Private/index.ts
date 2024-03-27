import { ChartFrameEnum, IMaterialConfigType, MaterialCategoryEnum } from "@/materials/types";
import { StorageEnum } from "@/types/StorageTypes";
import { getLocalStorage, setLocalStorage } from "@/utils/storages";
import { Image } from "../../informations/Mores/Image";
import { backgroundImageSize } from "@/settings/designSetting";
import { FileTypeEnum } from "@/types/FileTypes";

const userPhotosList: IMaterialConfigType[] = getLocalStorage(StorageEnum.J_USER_MEDIA_PHOTOS) || [];

const uploadFile = (callback: (...args: any[]) => void) => {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = ".png,.jpg,.jpeg,.gif"; // 这里只允许部分图片类型
	input.onchange = async () => {
		if (!input.files || !input.files.length) return;
		const file = input.files[0];
		const { name, size, type } = file;
		if (size > 1024 * 1024 * backgroundImageSize) {
			window["$message"].warning(`图片超出 ${backgroundImageSize}M 限制，请重新上传！`);
			return false;
		}
		if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
			window["$message"].warning("文件格式不符合，请重新上传！");
			return false;
		}
		const reader = new FileReader();
		reader.onload = () => {
			const eventObj = { fileName: name, url: reader.result as string };
			callback && callback(eventObj);
		};
		reader.readAsDataURL(file);
	};
	input.click();
};

const addConfig: IMaterialConfigType = {
	...Image,
	category: "Private",
	categoryName: "私有图",
	menu: MaterialCategoryEnum.PHOTOS,
	chartFrame: ChartFrameEnum.STATIC,
	title: "上传图片",
	image: "upload.png",
	redirectComponent: `${Image.menu}/${Image.category}/${Image.key}`, // 跳转组件路径规则：menuName/categoryName/componentKey
	disabled: true,
	configEvents: {
		// 点击上传事件
		uploadImage: () => {
			uploadFile((e: any) => {
				const newPhoto = {
					...Image,
					category: "Private",
					categoryName: "私有图",
					menu: MaterialCategoryEnum.PHOTOS,
					chartFrame: ChartFrameEnum.STATIC,
					title: e.fileName,
					image: e.url,
					dataset: e.url,
					redirectComponent: `${Image.menu}/${Image.category}/${Image.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
				};
				userPhotosList.unshift(newPhoto);
				// 存储在本地数据中
				setLocalStorage(StorageEnum.J_USER_MEDIA_PHOTOS, userPhotosList);
			});
		}
	}
};

export default [addConfig, ...userPhotosList];
