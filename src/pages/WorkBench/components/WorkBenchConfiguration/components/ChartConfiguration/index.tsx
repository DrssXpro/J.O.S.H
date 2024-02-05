import JNameSetting from "@/components/JChartConfiguration/JNameSetting";
import JPosSetting from "@/components/JChartConfiguration/JPosSetting";
import JSizeSetting from "@/components/JChartConfiguration/JSizeSetting";
import JStylesSetting from "@/components/JChartConfiguration/JStylesSetting";

const ChartConfiguration = () => {
	return (
		<>
			<JNameSetting />
			<JSizeSetting />
			<JPosSetting />
			<JStylesSetting />
		</>
	);
};

export default ChartConfiguration;
