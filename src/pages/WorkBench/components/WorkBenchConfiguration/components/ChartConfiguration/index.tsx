import JNameSetting from "@/components/JChartConfiguration/JNameSetting";
import JPosSetting from "@/components/JChartConfiguration/JPosSetting";
import JSizeSetting from "@/components/JChartConfiguration/JSizeSetting";
import JStylesSetting from "@/components/JChartConfiguration/JStylesSetting";
import useEditCharts from "@/hooks/useEditCharts";
import useChartStore from "@/store/chartStore/chartStore";

const ChartConfiguration = () => {
	const updateChartConfig = useChartStore((selector) => selector.updateChartConfig);
	const { getTargetChartIndex, getTargetData } = useEditCharts();
	const chartIndex = getTargetChartIndex()!;
	const component = getTargetData()!;

	return (
		<>
			<JNameSetting title={component.chartConfig.title} chartIndex={chartIndex} update={updateChartConfig} />
			<JSizeSetting attr={component.attr} chartIndex={chartIndex} update={updateChartConfig} />
			<JPosSetting attr={component.attr} chartIndex={chartIndex} update={updateChartConfig} />
			<JStylesSetting />
			{component && (
				<component.ChartConfigComponent
					chartIndex={chartIndex}
					chartRendererType={component.rendererType}
					chartOptions={component.option}
					update={updateChartConfig}
				/>
			)}
		</>
	);
};

export default ChartConfiguration;
