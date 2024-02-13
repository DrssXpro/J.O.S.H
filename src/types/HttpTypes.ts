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

// 时间选项
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
