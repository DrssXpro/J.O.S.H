import { IComponent } from "@/store/chartStore/types";
import { excludeParseEventKeyList } from "@/types/EventTypes";
import { cloneDeep, omit } from "lodash-es";

// file -> url: 设置 canvas 背景图使用
export const fileToUrl = (file: File): string => {
	const Url = URL || window.URL || window.webkitURL;
	const ImageUrl = Url.createObjectURL(file);
	return ImageUrl;
};

// 函数执行：图表过滤器函数使用
export const newFunctionHandle = (
	data: any,
	res: any,
	funcStr?: string,
	isToString?: boolean,
	errorCallBack?: (...args: any[]) => any,
	successCallBack?: (...args: any[]) => any
) => {
	try {
		if (!funcStr) return data;
		const fn = new Function("data", "res", funcStr);
		const fnRes = fn(cloneDeep(data), cloneDeep(res));
		const resHandle = isToString ? String(fnRes) : fnRes;
		// 成功回调
		successCallBack && successCallBack(resHandle);
		return resHandle;
	} catch (error) {
		// 失败回调
		errorCallBack && errorCallBack(error);
		return "函数执行错误";
	}
};

// requestAnimationFrame 节流 提高拖拽性能
export function rafThrottle(fn: (...args: any[]) => any) {
	let lock = false;
	return function (this: any, ...args: any[]) {
		if (lock) return;
		lock = true;
		window.requestAnimationFrame(() => {
			fn.apply(this, args);
			lock = false;
		});
	};
}

// 深拷贝组件，undo、redo history 记录使用
export function cloneComponent(component: IComponent) {
	// 只深拷贝配置信息，图表和配置组件保存引用
	return {
		...cloneDeep(omit(component, ["ChartComponent", "ChartConfigComponent"])),
		ChartComponent: component.ChartComponent,
		ChartConfigComponent: component.ChartConfigComponent
	};
}

/**
 * * JSON序列化，支持函数和 undefined
 * @param data
 */
export const JSONStringify = <T>(data: T) => {
	return JSON.stringify(
		data,
		(_, val) => {
			// 处理函数丢失问题
			if (typeof val === "function") {
				return `${val}`;
			}
			// 处理 undefined 丢失问题
			if (typeof val === "undefined") {
				return null;
			}
			return val;
		},
		2
	);
};

export const evalFn = (fn: string) => {
	return new Function("return " + fn)();
};

/**
 * * JSON反序列化，支持函数和 undefined
 * @param data
 */
export const JSONParse = (data: string) => {
	return JSON.parse(data, (k, v) => {
		// 过滤函数字符串
		if (excludeParseEventKeyList.includes(k)) return v;
		// 还原函数值
		if (typeof v === "string" && v.indexOf && (v.indexOf("function") > -1 || v.indexOf("=>") > -1)) {
			return evalFn(`(function(){return ${v}})()`);
		} else if (typeof v === "string" && v.indexOf && v.indexOf("return ") > -1) {
			const baseLeftIndex = v.indexOf("(");
			if (baseLeftIndex > -1) {
				const newFn = `function ${v.substring(baseLeftIndex)}`;
				return evalFn(`(function(){return ${newFn}})()`);
			}
		}
		return v;
	});
};
