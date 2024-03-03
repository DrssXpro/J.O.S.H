import { ComponentType } from "@/materials/types";
import { EventLife } from "@/types/EventTypes";
import * as echarts from "echarts";
// 所有图表组件集合对象
const components: { [K in string]?: any } = {};

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
		[EventLife.CHART_READY](component: any) {
			// 存储组件
			components[chartConfig.id] = component;
			const fnStr = (events[EventLife.CHART_READY] || "").trim();
			generateFunc(fnStr, component);
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
        async function(components){
          ${fnStr}
        }
      )`)().bind(undefined, components);
	} catch (error) {
		console.error(error);
	}
}

function generateFunc(fnStr: string, component: any) {
	try {
		// npmPkgs 便于拷贝 echarts 示例时设置option 的formatter等相关内容
		Function(`
      "use strict";
      return (
        async function(component, components, echarts){
          ${fnStr}
        }
      )`)().bind(component)(component, components, echarts);
	} catch (error) {
		console.error(error);
	}
}
