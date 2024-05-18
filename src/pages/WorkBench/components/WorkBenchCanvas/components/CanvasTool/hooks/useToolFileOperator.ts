import domToImage from "dom-to-image";
import { UploadProps } from "antd";
import { omit } from "lodash-es";
import useCanvasStore from "@/store/canvasStore/canvasStore";
import useChartStore from "@/store/chartStore/chartStore";
import { CanvasGlobalTypeEnum } from "@/store/canvasStore/types";
import { downloadByLink, downloadTextFile, readFile } from "@/utils/fileUtils";
import { JSONParse, JSONStringify } from "@/utils/utils";
import { FileTypeEnum } from "@/types/FileTypes";
import { fetchComponent } from "@/materials/components";
import { ComponentType, FetchComFlagType } from "@/materials/types";
import useChartHistoryStore from "@/store/chartHistoryStore/chartHistoryStore";
import useStoreSelector from "@/hooks/useStoreSelector";

type BeforeUpload = Pick<UploadProps, "beforeUpload">["beforeUpload"];
type CustomRequest = Pick<UploadProps, "customRequest">["customRequest"];

const useToolFileOperator = () => {
	const { clearHistory } = useChartHistoryStore(useStoreSelector(["clearHistory"]));
	const { getChartConfigs, setTargetSelectChart, addComponentList, setrequestGlobalConfig, clearComponentList } =
		useChartStore(
			useStoreSelector([
				"getChartConfigs",
				"setTargetSelectChart",
				"addComponentList",
				"setrequestGlobalConfig",
				"clearComponentList"
			])
		);
	const { canvasGlobal, getGlobalCanvasConfig, setCanvasGlobal, setGlobalCanvasConfig } = useCanvasStore(
		useStoreSelector(["canvasGlobal", "getGlobalCanvasConfig", "setCanvasGlobal", "setGlobalCanvasConfig"])
	);
	const scale = canvasGlobal[CanvasGlobalTypeEnum.SCALE];

	const beforeUpload: BeforeUpload = (file) => {
		if (file.type !== FileTypeEnum.JSON && file.type !== FileTypeEnum.TXT) {
			window.$message.warning("仅支持上传 【JSON】 格式文件，请重新上传！");
			return false;
		}
		return true;
	};

	// 导入
	const customRequest: CustomRequest = (options) => {
		const { file } = options;

		readFile(file as File).then((fileData) => {
			try {
				fileData = JSONParse(fileData);
				importDataHandle(fileData);
				window.$message.success("导入成功！");
			} catch (error) {
				window.$message.error("组件导入失败，请检查文件完整性！");
			}
		});
	};

	// 导入文件内容处理
	const importDataHandle = (canvasData: any) => {
		// 先清除之前的所有历史记录和界面组件
		clearHistory();
		setTargetSelectChart();
		clearComponentList();

		const { componentList, requestGlobalConfig, canvasConfig } = canvasData;

		// 组件注册
		componentList.forEach((com: ComponentType) => {
			// 获取图表组件
			const ChartComponent: any = fetchComponent(com.key, FetchComFlagType.VIEW);
			// 获取图表配置组件
			const ChartConfigComponent: any = fetchComponent(com.key, FetchComFlagType.CONFIG);
			addComponentList({ ...com, ChartComponent, ChartConfigComponent });
		});

		// 全局请求设置
		setrequestGlobalConfig(requestGlobalConfig);

		// 全局 canvas 设置
		setGlobalCanvasConfig(canvasConfig);
	};

	// 导出
	const exportHandle = () => {
		// 置空当前视图上选择的组件
		setTargetSelectChart();
		const canvasDom = document.querySelector("#chartCanvas") as HTMLElement;

		if (!canvasDom) {
			window.$message.error("导出失败！");
			return;
		}

		const chartConfigs = getChartConfigs();
		const canvasConfig = getGlobalCanvasConfig();

		// 导出 json 文件
		const storageInfo = {
			canvasConfig,
			...chartConfigs,
			// 移除 jsx 组件文本属性
			componentList: chartConfigs.componentList.map((i) => {
				return omit(i, ["ChartComponent", "ChartConfigComponent"]);
			})
		};
		downloadTextFile(JSONStringify(storageInfo), undefined, "json");

		// 导出为图片
		const tempScale = scale;
		setCanvasGlobal(CanvasGlobalTypeEnum.SCALE, 1);
		setTimeout(() => {
			domToImage.toPng(canvasDom).then((image) => {
				downloadByLink(image, undefined, "png");
				setCanvasGlobal(CanvasGlobalTypeEnum.SCALE, tempScale);
				window.$message.success("导出成功！");
			});
		}, 600);
	};

	return { exportHandle, importDataHandle, fileProps: { beforeUpload, customRequest } };
};

export { useToolFileOperator };
