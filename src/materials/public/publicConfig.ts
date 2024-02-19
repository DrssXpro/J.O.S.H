import { nanoid } from "nanoid";
import { cloneDeep } from "lodash-es";
import { chartInitConfig } from "@/settings/designSetting";
import { PublicConfigType } from "../types";
import { BaseEvent, EventLife } from "../types/eventTypes";
import {
	RequestBodyEnum,
	RequestConfigType,
	RequestDataValueEnum,
	RequestHttpEnum,
	RequestHttpIntervalEnum
} from "@/types/HttpTypes";

// 请求基础属性
export const requestConfig: RequestConfigType = {
	requestDataType: RequestDataValueEnum.STATIC,
	requestHttpType: RequestHttpEnum.GET,
	requestUrl: "",
	requestInterval: undefined,
	requestIntervalUnit: RequestHttpIntervalEnum.SECOND,
	requestParamsBodyType: RequestBodyEnum.NONE,
	requestParams: {
		Body: {
			"form-data": {},
			"x-www-form-urlencoded": {},
			json: ""
		},
		Header: {},
		Params: {}
	}
};

// 单实例类
export class PublicConfigClass implements PublicConfigType {
	public id = nanoid(5);
	public isGroup = false;
	// 基本信息
	public attr = { ...chartInitConfig, zIndex: -1 };
	// 基本样式
	public styles = {
		// 使用滤镜
		filterShow: false,
		// 色相
		hueRotate: 0,
		// 饱和度
		saturate: 1,
		// 对比度
		contrast: 1,
		// 亮度
		brightness: 1,
		// 透明
		opacity: 1,

		// 旋转
		rotateZ: 0,
		rotateX: 0,
		rotateY: 0,

		// 倾斜
		skewX: 0,
		skewY: 0,

		// 混合模式
		blendMode: "normal",

		// 动画
		animations: []
	};
	// 预览
	public preview = {
		overFlowHidden: false
	};
	// 状态
	public status = {
		lock: false,
		hide: false
	};
	// 请求
	public request = cloneDeep(requestConfig);
	// 数据过滤
	public filter = undefined;
	// 事件
	public events = {
		baseEvent: {
			[BaseEvent.ON_CLICK]: undefined,
			[BaseEvent.ON_DBL_CLICK]: undefined,
			[BaseEvent.ON_MOUSE_ENTER]: undefined,
			[BaseEvent.ON_MOUSE_LEAVE]: undefined
		},
		advancedEvents: {
			[EventLife.VNODE_MOUNTED]: undefined,
			[EventLife.VNODE_BEFORE_MOUNT]: undefined
		},
		interactEvents: []
	};
}
