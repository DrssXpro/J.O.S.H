import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";
import { registerMap } from "echarts/core";
// import mapJsonWithoutHainanIsLands from "../mapWithoutHainanIsLands.json";
import mapJsonChina from "../mapGeojson/china.json";
import { useEffect, useMemo, useRef, useState } from "react";
import { cloneDeep } from "lodash-es";

const MapBaseComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;
	const [mapOptions, setMapOptions] = useState(chartConfig.option);
	const [isInit, setIsInit] = useState(false);
	const chartRef = useRef<any>(null);
	// 每次 chartOptions 改变时根据 dataset 重新设置 option
	const datasetOptions = useMemo(() => {
		const newOptions = cloneDeep(chartConfig.option);
		const dataset = newOptions.dataset;
		newOptions.series.forEach((item: any) => {
			if (item.type === "effectScatter" && dataset.point) item.data = dataset.point;
			else if (item.type === "lines" && dataset.line) {
				item.data = dataset.line.map((it: any) => {
					return {
						...it,
						lineStyle: {
							color: newOptions.series[2].lineStyle.color
						}
					};
				});
			} else if (item.type === "map" && dataset.map) item.data = dataset.map;
		});
		if (dataset.pieces) newOptions.visualMap.pieces = dataset.pieces;

		return newOptions;
	}, [chartConfig.option]);

	useChartDataFetch(
		chartConfig,
		(err) => {
			requestErrorCallback && requestErrorCallback(err);
		},
		() => {
			requestSuccessCallback && requestSuccessCallback();
		}
	);

	//需提前注册地图信息
	!isInit && registerMap(`${mapOptions.mapRegion.adcode}`, { geoJSON: mapJsonChina as any, specialAreas: {} });

	useEffect(() => {
		setIsInit(true);
	}, []);

	useEffect(() => {
		setMapOptions({ ...datasetOptions });
	}, [chartConfig.option]);

	// //动态获取json注册地图
	// const getGeojson = (regionId: string) => {
	// 	return new Promise<boolean>((resolve) => {
	// 		import(`../mapGeojson/${regionId}.json`).then((data) => {
	// 			registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} });
	// 			console.log("first");
	// 			resolve(true);
	// 		});
	// 	});
	// };

	// // 手动触发渲染
	// const vEchartsSetOption = (options: any) => {
	// 	const echartInstance = chartRef.current.getEchartsInstance();
	// 	echartInstance.clear();
	// 	echartInstance.setOption({ ...options });
	// };

	// // 处理海南群岛
	// const hainanLandsHandle = async (newData: boolean) => {
	// 	if (newData) {
	// 		await getGeojson("china");
	// 	} else {
	// 		registerMap("china", { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} });
	// 	}
	// };

	return (
		<ReactECharts
			ref={chartRef}
			theme={themeColor}
			option={mapOptions}
			style={{ height: "100%", width: "100%" }}
			opts={{ renderer: "canvas" }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default MapBaseComponent;
