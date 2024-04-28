import JNameSetting from "@/components/JChartConfiguration/JNameSetting";
import JPosSetting from "@/components/JChartConfiguration/JPosSetting";
import JSizeSetting from "@/components/JChartConfiguration/JSizeSetting";
import JStylesSetting from "@/components/JChartConfiguration/JStylesSetting";
import { ConfigurationProps } from "@/materials/types";

const ChartConfiguration = (props: ConfigurationProps) => {
	const { component, chartIndex, update } = props;

	return (
		<>
			<JNameSetting title={component.chartConfig.title} chartIndex={chartIndex} update={update} />
			<JSizeSetting attr={component.attr} chartIndex={chartIndex} update={update} />
			<JPosSetting attr={component.attr} chartIndex={chartIndex} update={update} />
			<JStylesSetting />
			{component && (
				<component.ChartConfigComponent
					chartIndex={chartIndex}
					chartRendererType={component.rendererType}
					chartOptions={component.option}
					update={update}
				/>
			)}
		</>
	);
};

export default ChartConfiguration;
