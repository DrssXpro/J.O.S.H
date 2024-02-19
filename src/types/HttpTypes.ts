// 数据相关
export enum RequestDataValueEnum {
	// 静态数据
	STATIC = 0,
	// 请求数据
	DYNAMIC = 1,
	// 公共接口
	PUBLIC = 2
}
// 配置数据请求类型
export enum RequestDataLabelEnum {
	STATIC = "静态数据",
	DYNAMIC = "动态请求",
	PUBLIC = "公共接口"
}

// 请求方法
export enum RequestHttpEnum {
	GET = "get",
	POST = "post",
	PATCH = "patch",
	PUT = "put",
	DELETE = "delete"
}

// 请求间隔
export enum RequestHttpIntervalEnum {
	// 秒
	SECOND = "second",
	// 分
	MINUTE = "minute",
	// 时
	HOUR = "hour",
	// 天
	DAY = "day"
}

// 请求头部类型
export enum RequestBodyEnum {
	NONE = "none",
	FORM_DATA = "form-data",
	X_WWW_FORM_URLENCODED = "x-www-form-urlencoded",
	JSON = "json"
}

// 请求参数类型
export enum RequestParamsTypeEnum {
	PARAMS = "Params",
	BODY = "Body",
	HEADER = "Header"
}

// ajax 请求类型
export interface SelectHttpType {
	label: RequestHttpEnum;
	value: RequestHttpEnum;
	disabled?: boolean;
	style?: object;
}

// 类型选项
export const selectTypeOptions: SelectHttpType[] = [
	{
		label: RequestHttpEnum.GET,
		value: RequestHttpEnum.GET,
		style: {
			color: "greenyellow",
			fontWeight: "bold"
		}
	},
	{
		label: RequestHttpEnum.POST,
		value: RequestHttpEnum.POST,
		style: {
			color: "skyblue",
			fontWeight: "bold"
		}
	},
	{
		label: RequestHttpEnum.PUT,
		value: RequestHttpEnum.PUT,
		style: {
			color: "goldenrod",
			fontWeight: "bold"
		}
	},
	{
		label: RequestHttpEnum.PATCH,
		value: RequestHttpEnum.PATCH,
		style: {
			color: "violet",
			fontWeight: "bold"
		}
	},
	{
		label: RequestHttpEnum.DELETE,
		value: RequestHttpEnum.DELETE,
		disabled: true,
		style: {
			fontWeight: "bold"
		}
	}
];

// 请求间隔名称
export const SelectHttpTimeNameObj = {
	[RequestHttpIntervalEnum.SECOND]: "秒",
	[RequestHttpIntervalEnum.MINUTE]: "分",
	[RequestHttpIntervalEnum.HOUR]: "时",
	[RequestHttpIntervalEnum.DAY]: "天"
};

// ajax 请求间隔
export interface SelectHttpTimeType {
	label: string;
	value: RequestHttpIntervalEnum;
	disabled?: boolean;
}

// 设置时间间隔选项
export const selectTimeOptions: SelectHttpTimeType[] = [
	{
		label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.SECOND],
		value: RequestHttpIntervalEnum.SECOND
	},
	{
		label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.MINUTE],
		value: RequestHttpIntervalEnum.MINUTE
	},
	{
		label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.HOUR],
		value: RequestHttpIntervalEnum.HOUR
	},
	{
		label: SelectHttpTimeNameObj[RequestHttpIntervalEnum.DAY],
		value: RequestHttpIntervalEnum.DAY
	}
];

// 设置 RequestBody 选项
export const RequestBodyEnumList = [
	RequestBodyEnum.NONE,
	RequestBodyEnum.FORM_DATA,
	RequestBodyEnum.X_WWW_FORM_URLENCODED,
	RequestBodyEnum.JSON
];

export type RequestParamsObjType = {
	[T: string]: string;
};
export type RequestParams = {
	[RequestParamsTypeEnum.PARAMS]: RequestParamsObjType;
	[RequestParamsTypeEnum.HEADER]: RequestParamsObjType;
	[RequestParamsTypeEnum.BODY]: {
		[RequestBodyEnum.FORM_DATA]: RequestParamsObjType;
		[RequestBodyEnum.X_WWW_FORM_URLENCODED]: RequestParamsObjType;
		[RequestBodyEnum.JSON]: string;
	};
};

// 请求公共类型
type RequestPublicConfigType = {
	// 时间单位（时分秒）
	requestIntervalUnit: RequestHttpIntervalEnum;
	// 请求内容
	requestParams: RequestParams;
};

// 单个图表请求配置
export interface RequestConfigType extends RequestPublicConfigType {
	// 所选全局数据池的对应 id
	requestDataPondId?: string;
	// 组件定制轮询时间
	requestInterval?: number;
	// 获取数据的方式
	requestDataType: RequestDataValueEnum;
	// 请求方式 get/post/del/put/patch
	requestHttpType: RequestHttpEnum;
	// 源后续的 url
	requestUrl?: string;
	// 请求体类型
	requestParamsBodyType: RequestBodyEnum;
}
