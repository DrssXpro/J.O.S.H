import {
	Form,
	InputNumber,
	Upload,
	message,
	type UploadProps,
	ColorPicker,
	Button,
	Radio,
	Tooltip,
	Divider
} from "antd";
import { Scale, FitToScreen, FitToHeight, FitToWidth } from "@ricons/carbon";
import UploadImage from "@/assets/upload.png";
import { PreviewScaleEnum } from "@/types/ConfigTypes";
import ThemeColor from "./components/ThemeColor";
import JIcon from "@/components/JIcon";

const props: UploadProps = {
	name: "file",
	multiple: false,
	action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
	onChange(info) {
		const { status } = info.file;
		if (status !== "uploading") {
			console.log(info.file, info.fileList);
		}
		if (status === "done") {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === "error") {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e) {
		console.log("Dropped files", e.dataTransfer.files);
	}
};

const previewTypeList = [
	{
		key: PreviewScaleEnum.FIT,
		title: "自适应",
		icon: <Scale />,
		desc: "自适应比例展示，页面会有留白"
	},
	{
		key: PreviewScaleEnum.SCROLL_Y,
		title: "Y轴滚动",
		icon: <FitToWidth />,
		desc: "X轴铺满, Y轴自适应滚动"
	},
	{
		key: PreviewScaleEnum.SCROLL_X,
		title: "X轴滚动",
		icon: <FitToHeight />,
		desc: "Y轴铺满, X轴自适应滚动"
	},
	{
		key: PreviewScaleEnum.FULL,
		title: "铺满",
		icon: <FitToScreen />,
		desc: "强行拉伸画面, 填充所有视图"
	}
];

const PageConfiguration = () => {
	const handleRadioChange = () => {};
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
				<Upload.Dragger {...props}>
					<div className="w-full h-full flex flex-col items-center justify-center">
						<img src={UploadImage} className="w-[60%] h-[50%]" />
						<div className="mt-2">背景图需小于 3M, 格式为 png/jpg 的文件</div>
					</div>
				</Upload.Dragger>
				<Form.Item label="背景颜色" className="mt-6">
					<ColorPicker showText format="rgb" className="w-full" />
				</Form.Item>
				<Form.Item label="背景控制">
					<div className="w-full flex gap-3">
						<Button className="flex-1">清除背景</Button>
						<Button className="flex-1">清除颜色</Button>
					</div>
				</Form.Item>
				<Form.Item label="适配方式">
					<Radio.Group onChange={handleRadioChange} defaultValue={PreviewScaleEnum.FIT}>
						{previewTypeList.map((i) => (
							<Tooltip title={i.desc} key={i.key}>
								<Radio.Button value={i.key}>
									<div className="flex items-center justify-center w-[37px] h-full">
										<JIcon icon={i.icon} size={20} />
									</div>
								</Radio.Button>
							</Tooltip>
						))}
					</Radio.Group>
				</Form.Item>
			</Form>
			<Divider />
			<ThemeColor />
		</div>
	);
};

export default PageConfiguration;
