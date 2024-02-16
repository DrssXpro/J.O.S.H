import JNameSetting from "@/components/JChartConfiguration/JNameSetting";
import JPosSetting from "@/components/JChartConfiguration/JPosSetting";
import JSizeSetting from "@/components/JChartConfiguration/JSizeSetting";
import JStylesSetting from "@/components/JChartConfiguration/JStylesSetting";
import useEditCharts from "@/hooks/useEditCharts";

const ChartConfiguration = () => {
	const { getTargetData } = useEditCharts();
	const component = getTargetData();
	return (
		<>
			<JNameSetting />
			<JSizeSetting />
			<JPosSetting />
			<JStylesSetting />
			{component && component.ChartConfigComponent({})}
		</>
	);
};

export default ChartConfiguration;
