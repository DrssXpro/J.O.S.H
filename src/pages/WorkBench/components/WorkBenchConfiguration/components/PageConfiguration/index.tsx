import { Form, InputNumber } from "antd";

const PageConfiguration = () => {
	return (
		<div className="w-full">
			<Form>
				<div className="flex items-center gap-4">
					<Form.Item label="宽度" className="flex-1">
						<InputNumber className="w-30" min={1} max={10000} defaultValue={1920} />
					</Form.Item>
					<Form.Item label="高度" className="flex-1">
						<InputNumber className="w-30" min={1} max={10000} defaultValue={1080} />
					</Form.Item>
				</div>
			</Form>
		</div>
	);
};

export default PageConfiguration;
