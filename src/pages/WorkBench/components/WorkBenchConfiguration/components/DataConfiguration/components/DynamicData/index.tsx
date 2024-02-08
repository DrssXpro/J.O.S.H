import { Button, Card, Input } from "antd";
import JSettingBox from "@/components/JChartConfiguration/public/JSettingBox";
import JSettingItem from "@/components/JChartConfiguration/public/JSettingItem";
import { Flash, Pulse } from "@ricons/ionicons5";
import JIcon from "@/components/JIcon";
import DataMapAndShow from "../DataMapAndShow";

const DynamicData = () => {
	return (
		<>
			<Card bodyStyle={{ padding: "20px 10px", background: "#232324" }} className="relative">
				<JSettingBox name="请求配置">
					<div className="grid grid-cols-2 gap-2">
						<JSettingItem text="类型">
							<Button type="primary" ghost block>
								普通请求
							</Button>
						</JSettingItem>
						<JSettingItem text="方式">
							<Input value={"get"} disabled />
						</JSettingItem>
						<JSettingItem text="组件间隔">
							<Input suffix="秒" value={"暂无"} disabled />
						</JSettingItem>
						<JSettingItem text="全局间隔（默认）">
							<Input suffix="秒" value={"30"} disabled />
						</JSettingItem>
					</div>
				</JSettingBox>
				<JSettingBox name="源地址">
					<Input prefix={<JIcon icon={<Pulse />} />} value={"暂无"} disabled />
				</JSettingBox>
				<JSettingBox name="组件地址">
					<Input prefix={<JIcon icon={<Flash />} />} value={"暂无"} disabled />
				</JSettingBox>
				<div
					className="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer opacity-0 hover:opacity-100 border-[#1668DC] border-1 transition-all duration-500"
					style={{ backdropFilter: "blur(3px)" }}
				>
					<Button type="primary">编辑配置</Button>
				</div>
			</Card>
			<div className="mt-5">
				<JSettingBox name="测试">
					<Button icon={<JIcon icon={<Flash />} />} type="primary" ghost block>
						发送请求
					</Button>
				</JSettingBox>
			</div>

			<DataMapAndShow />
		</>
	);
};

export default DynamicData;
