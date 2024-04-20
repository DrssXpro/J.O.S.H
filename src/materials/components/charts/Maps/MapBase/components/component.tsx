import useChartDataFetch from "@/hooks/useChartDataFetch";
import { ChartComponentProps } from "@/materials/types";
import ReactECharts from "echarts-for-react";
import { registerMap } from "echarts/core";
import mapJsonWithoutHainanIsLands from "../mapWithoutHainanIsLands.json";
import { useEffect, useRef, useState } from "react";

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

	//先注册空内容 保证初始化不报错
	!isInit && registerMap(`${chartConfig.option.mapRegion.adcode}`, { geoJSON: {} as any, specialAreas: {} });

	useEffect(() => {
		setIsInit(true);
		registerMapInitAsync();
	}, []);

	useEffect(() => {
		setMapOptions(chartConfig.option);
	}, [chartConfig.option]);

	// 进行更换初始化地图 如果为china 单独处理
	const registerMapInitAsync = async () => {
		const adCode = `${props.chartConfig.option.mapRegion.adcode}`;
		if (adCode !== "china") {
			await getGeojson(adCode);
		} else {
			await hainanLandsHandle(props.chartConfig.option.mapRegion.showHainanIsLands);
		}
		vEchartsSetOption();
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
	const vEchartsSetOption = () => {
		const echartInstance = chartRef.current.getEchartsInstance();
		setMapOptions({ ...chartConfig.option });
		echartInstance.clear();
		echartInstance.setOption({ ...chartConfig.option });
	};

	// 处理海南群岛
	const hainanLandsHandle = async (newData: boolean) => {
		if (newData) {
			await getGeojson("china");
		} else {
			registerMap("china", { geoJSON: mapJsonWithoutHainanIsLands as any, specialAreas: {} });
		}
	};

	return (
		<ReactECharts
			ref={chartRef}
			theme={themeColor}
			option={mapOptions}
			style={{ height: "100%", width: "100%", display: isInit ? undefined : "none" }}
			opts={{ renderer: chartConfig.rendererType }}
			onChartReady={advancedEvent?.onChartReady}
			onEvents={{
				...baseEvent
			}}
		/>
	);
};

export default MapBaseComponent;
