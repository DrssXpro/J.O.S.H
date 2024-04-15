import { Form, InputNumber, Upload, type UploadProps, ColorPicker, Button, Radio, Tooltip, Divider } from "antd";
import { MdFitScreen, MdZoomOutMap } from "react-icons/md";
import { AiOutlineColumnWidth, AiOutlineColumnHeight } from "react-icons/ai";
import UploadImage from "@/assets/upload.png";
import { PreviewScaleEnum } from "@/types/LayoutTypes";
import ThemeColor from "./components/ThemeColor";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import { FileTypeEnum } from "@/types/FileTypes";
import { fileToUrl } from "@/utils/utils";
import { CanvasConfigTypeEnum } from "@/store/canvasStore/types";

const previewTypeList = [
	{
		key: PreviewScaleEnum.FIT,
		title: "自适应",
		icon: <MdFitScreen size={22} />,
		desc: "自适应比例展示，页面会有留白"
	},
	{
		key: PreviewScaleEnum.SCROLL_Y,
		title: "Y轴滚动",
		icon: <AiOutlineColumnWidth size={22} />,
		desc: "X轴铺满, Y轴自适应滚动"
	},
	{
		key: PreviewScaleEnum.SCROLL_X,
		title: "X轴滚动",
		icon: <AiOutlineColumnHeight size={22} />,
		desc: "Y轴铺满, X轴自适应滚动"
	},
	{
		key: PreviewScaleEnum.FULL,
		title: "铺满",
		icon: <MdZoomOutMap size={22} />,
		desc: "强行拉伸画面, 填充所有视图"
	}
];

const PageConfiguration = () => {
	const { canvasConfig, setCanvasConfig } = useCanvasStore();
	const { canvasWidth, canvasHeight, canvasBackground, canvasBackgroundImage } = canvasConfig;

	const uploadProps: UploadProps = {
		showUploadList: false,
		customRequest(options) {
			const { file } = options;
			const url = fileToUrl(file as File);
			setCanvasConfig(CanvasConfigTypeEnum.CANVAS_BACKGROUND_IMAGE, url);
		},
		onDrop(e) {
			const url = fileToUrl(e.dataTransfer.files[0] as File);
			setCanvasConfig(CanvasConfigTypeEnum.CANVAS_BACKGROUND_IMAGE, url);
		},
		beforeUpload(file) {
			const type = file.type;
			const size = file.size;
			if (size > 1024 * 1024 * 3) {
				window.$message.warning(`图片超出 3M 限制，请重新上传`);
				return false;
			}
			if (type !== FileTypeEnum.PNG && type !== FileTypeEnum.JPEG && type !== FileTypeEnum.GIF) {
				window.$message.warning("文件格式不符合，请重新上传!");
				return false;
			}
			return true;
		}
	};

	return (
		<div className="w-full">
			<Form>
				<div className="flex items-center gap-4">
					<Form.Item label="宽度" className="flex-1">
						<InputNumber
							className="w-30"
							min={192}
							max={10000}
							defaultValue={canvasWidth}
							onChange={(width) => {
								width !== null && setCanvasConfig(CanvasConfigTypeEnum.CANVAS_WIDTH, width);
							}}
						/>
					</Form.Item>
					<Form.Item label="高度" className="flex-1">
						<InputNumber
							className="w-30"
							min={108}
							max={10000}
							defaultValue={canvasHeight}
							onChange={(height) => {
								height !== null && setCanvasConfig(CanvasConfigTypeEnum.CANVAS_HEIGHT, height);
							}}
						/>
					</Form.Item>
				</div>
				<Upload.Dragger {...uploadProps}>
					{canvasBackgroundImage ? (
						<img className="w-full h-full" src={canvasBackgroundImage}></img>
					) : (
						<div className="w-full h-full flex flex-col items-center justify-center">
							<img src={UploadImage} className="w-[60%] h-[50%]" />
							<div className="mt-2">背景图需小于 3M, 格式为 png/jpg 的文件</div>
						</div>
					)}
				</Upload.Dragger>
				<Form.Item label="背景颜色" className="mt-6">
					<ColorPicker
						showText
						format="rgb"
						className="w-full"
						value={canvasBackground || "rgba(0, 0, 0, 1)"}
						onChange={(color) => {
							setCanvasConfig(CanvasConfigTypeEnum.CANVAS_BACKGROUND, color.toRgbString());
						}}
					/>
				</Form.Item>
				<Form.Item label="背景控制">
					<div className="w-full flex gap-3">
						<Button
							className="flex-1"
							disabled={!canvasBackgroundImage}
							onClick={() => setCanvasConfig(CanvasConfigTypeEnum.CANVAS_BACKGROUND_IMAGE, "")}
						>
							清除背景
						</Button>
						<Button
							className="flex-1"
							disabled={!canvasBackground}
							onClick={() => setCanvasConfig(CanvasConfigTypeEnum.CANVAS_BACKGROUND, "")}
						>
							清除颜色
						</Button>
					</div>
				</Form.Item>
				<Form.Item label="适配方式">
					<Radio.Group
						onChange={(e) => {
							setCanvasConfig(CanvasConfigTypeEnum.CANVAS_PREVIEW_TYPE, e.target.value);
						}}
						defaultValue={PreviewScaleEnum.FIT}
					>
						{previewTypeList.map((i) => (
							<Tooltip title={i.desc} key={i.key}>
								<Radio.Button value={i.key}>
									<div className="flex items-center justify-center w-[37px] h-full">{i.icon}</div>
								</Radio.Button>
							</Tooltip>
						))}
					</Radio.Group>
				</Form.Item>
			</Form>
			<Divider />
			<ThemeColor />
			<Divider />
		</div>
	);
};

export default PageConfiguration;
