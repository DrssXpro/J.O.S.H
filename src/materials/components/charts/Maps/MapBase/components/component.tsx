import { useEffect, useRef, useState } from "react";
import useChartDataFetch from "@/hooks/useChartDataFetch";
import ReactECharts from "echarts-for-react";
import { registerMap } from "echarts/core";
import { ChartComponentProps } from "@/materials/types";
import mapJsonWithoutHainanIsLands from "../mapWithoutHainanIsLands.json";

const MapBaseComponent = (props: ChartComponentProps) => {
	const { chartConfig, themeColor, requestErrorCallback, requestSuccessCallback, baseEvent, advancedEvent } = props;
	const [mapOptions, setMapOptions] = useState(chartConfig.option);
	const [isInit, setIsInit] = useState(false);
	const chartRef = useRef<any>(null);

	useChartDataFetch(
		chartConfig,
		(err) => {
			requestErrorCallback && requestErrorCallback(err);
		},
		() => {
			requestSuccessCallback && requestSuccessCallback();
		}
	);

	useEffect(() => {
		registerMapAsync(`${mapOptions.mapRegion.adcode}`);
	}, []);

	useEffect(() => {
		handleOptionsDataset();
	}, [chartConfig.option]);

	// handle showHainanIsLands change
	useEffect(() => {
		const isShow = chartConfig.option.mapRegion.showHainanIsLands;
		hainanLandsHandle(isShow).then(() => {
			setMapOptions((pre: any) => {
				vEchartsSetOption(pre);
				return pre;
			});
		});
	}, [chartConfig.option.mapRegion.showHainanIsLands]);

	// handle area change
	useEffect(() => {
		const adcode = String(chartConfig.option.mapRegion.adcode);
		checkOrMapArea(adcode).then(() => {
			setMapOptions((pre: any) => {
				vEchartsSetOption(pre);
				return pre;
			});
		});
	}, [chartConfig.option.mapRegion.adcode]);

	// 注册地图数据（在挂载之前初始化）
	async function registerMapAsync(adCode: string) {
		if (adCode !== "china") {
			await getGeojson(adCode);
		} else {
			await hainanLandsHandle(chartConfig.option.mapRegion.showHainanIsLands);
		}
		setIsInit(true);
	}

	// 处理 dataset 更改
	const handleOptionsDataset = () => {
		const dataset = chartConfig.option.dataset;
		if (dataset.point && dataset.map && dataset.line) {
			setMapOptions({
				...chartConfig.option,
				series: [
					{ ...chartConfig.option.series[0], data: dataset.point },
					{ ...chartConfig.option.series[1], data: dataset.map },
					{
						...chartConfig.option.series[2],
						data: dataset.line.map((it: any) => {
							return {
								...it,
								lineStyle: {
									color: chartConfig.option.series[2].lineStyle.color
								}
							};
						})
					}
				]
			});
		}
	};

	//动态获取json注册地图
	const getGeojson = (regionId: string) => {
		return new Promise<boolean>((resolve) => {
			import(`../mapGeojson/${regionId}.json`).then((data) => {
				registerMap(regionId, { geoJSON: data.default as any, specialAreas: {} });
				resolve(true);
			});
		});
	};

	// 手动触发渲染
	const vEchartsSetOption = (options: any) => {
		if (chartRef.current) {
			const echartInstance = chartRef.current.getEchartsInstance();
			echartInstance.clear();
			echartInstance.setOption({ ...options });
		}
	};

	// 处理海南群岛
	const hainanLandsHandle = async (newData: boolean) => {
		if (newData) {
			await getGeojson("china");
		} else {
			registerMap("china", { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} });
		}
	};

	// 切换地图区域
	const checkOrMapArea = async (newData: string) => {
		await getGeojson(newData);
		setMapOptions((pre: any) => ({
			...pre,
			geo: { ...pre.geo, map: newData },
			series: [pre.series[0], { ...pre.series[1], map: newData }, pre.series[2]]
		}));
	};

	return (
		<>
			{isInit && (
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
			)}
		</>
	);
};

export default MapBaseComponent;
