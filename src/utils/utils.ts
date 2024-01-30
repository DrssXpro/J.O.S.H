// file -> url: 设置 canvas 背景图使用
export const fileToUrl = (file: File): string => {
	const Url = URL || window.URL || window.webkitURL;
	const ImageUrl = Url.createObjectURL(file);
	return ImageUrl;
};
