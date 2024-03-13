import { PublicConfigClass } from "@/materials/public/publicConfig";
import { ImageCarousel } from ".";
import { ComponentType } from "@/materials/types";

export const enum DotPositionEnum {
	TOP = "top",
	BOTTOM = "bottom",
	LEFT = "left",
	RIGHT = "right"
}

export const option = {
	// 图片资源列表
	dataset: [
		"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
		"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
		"https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg"
	],
	// 自动播放
	autoplay: true,
	// 自动播放的间隔（豪秒）
	interval: 5000,
	// 渐变效果
	fade: false,
	// 动效动画时间
	animateSpeed: 500,
	// 指示器位置
	dotPlacement: DotPositionEnum.BOTTOM
};

export default class Config extends PublicConfigClass implements ComponentType {
	public key = ImageCarousel.key;
	public chartConfig = ImageCarousel;
	public option = option;
}
