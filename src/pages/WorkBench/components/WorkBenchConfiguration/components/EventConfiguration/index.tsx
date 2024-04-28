import { Typography } from "antd";
import BaseEventConfig from "./components/BaseEventConfig";
import AdvancedEventConfig from "./components/AdvancedEventConfig";
import { ConfigurationProps } from "@/materials/types";

const EventConfiguration = (props: ConfigurationProps) => {
	const { component, chartIndex, update } = props;
	return (
		<>
			<div className="mb-4">
				<Typography.Text type="secondary">组件 id：</Typography.Text>
				<Typography.Text>{component.id}</Typography.Text>
			</div>
			<BaseEventConfig chartIndex={chartIndex} events={component.events} update={update} />
			<AdvancedEventConfig chartIndex={chartIndex} events={component.events} update={update} />
		</>
	);
};

export default EventConfiguration;
