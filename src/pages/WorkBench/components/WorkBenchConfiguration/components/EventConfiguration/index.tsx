import { Typography } from "antd";
import { nanoid } from "nanoid";
import BaseEventConfig from "./components/BaseEventConfig";
import AdvancedEventConfig from "./components/AdvancedEventConfig";

const EventConfiguration = () => {
	return (
		<>
			<div className="mb-4">
				<Typography.Text type="secondary">组件 id：</Typography.Text>
				<Typography.Text>{nanoid(10)}</Typography.Text>
			</div>
			<BaseEventConfig />
			<AdvancedEventConfig />
		</>
	);
};

export default EventConfiguration;
