import { ComponentType } from "@/materials/types";
import { EventLife } from "@/types/EventTypes";
import * as echarts from "echarts";
// 所有图表组件集合对象
const components: { [K in string]?: any } = {};

// 项目提供的npm 包变量
export const npmPkgs = { echarts };

export const handleChartEvent = (chartConfig: ComponentType) => {
	if (!chartConfig.events) return {};

	const baseEvent: Record<string, any> = {};

	// 处理 baseEvent
	for (const key in chartConfig.events.baseEvent) {
		const fnStr: string | undefined = (chartConfig.events.baseEvent as any)[key];
		if (fnStr) {
			baseEvent[key] = generateBaseFunc(fnStr);
		}
	}

	// 处理 advancedEvent
	const events = chartConfig.events.advancedEvents || {};
	const advancedEvent = {
		[EventLife.CHART_READY](e: any) {
			// 存储组件
			components[chartConfig.id] = e.component;
			const fnStr = (events[EventLife.CHART_READY] || "").trim();
			generateFunc(fnStr, e);
		}
	};
	return {
		baseEvent,
		advancedEvent
	};
};

function generateBaseFunc(fnStr: string) {
	try {
		return new Function(`
      return (
        async function(components,mouseEvent){
          ${fnStr}
        }
      )`)().bind(undefined, components);
	} catch (error) {
		console.error(error);
	}
}

function generateFunc(fnStr: string, e: any) {
	try {
		// npmPkgs 便于拷贝 echarts 示例时设置option 的formatter等相关内容
		Function(`
      "use strict";
      return (
        async function(e, components, node_modules){
          const {${Object.keys(npmPkgs).join()}} = node_modules;
          ${fnStr}
        }
      )`)().bind(e)(e, components, npmPkgs);
	} catch (error) {
		console.error(error);
	}
}
