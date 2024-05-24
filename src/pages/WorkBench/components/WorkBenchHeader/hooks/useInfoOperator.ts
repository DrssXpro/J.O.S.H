import { useState } from "react";
import { updateProjectApi, uploadProjectCoverApi } from "@/service/api/projectApi";
import { useFileOperator } from "../../WorkBenchCanvas/hooks/useFileOperator";
import useTotalChartsInfo from "@/hooks/useTotalChartsInfo";
import useProjectStore from "@/store/projectStore/projectStore";
import useStoreSelector from "@/hooks/useStoreSelector";
import { JSONStringify } from "@/utils/utils";
import { dataURLtoFile } from "@/utils/fileUtils";
import { getLocalStorage, setSessionStorage } from "@/utils/storages";
import { StorageEnum } from "@/types/StorageTypes";

const useInfoOperator = (projectId: number) => {
	const [saveLoading, setSaveLoading] = useState(false);
	const { getProjectInfo } = useProjectStore(useStoreSelector(["getProjectInfo"]));
	const { getTotalChartsInfo } = useTotalChartsInfo();
	const { exportHandle } = useFileOperator();
	// 保存逻辑
	const saveScreenDataInfo = async () => {
		setSaveLoading(true);
		// 上传项目图片
		const imageDataUrl = await exportHandle(false, false);
		const file = dataURLtoFile(imageDataUrl, "projectImage.png");
		const fd = new FormData();
		fd.append("file", file);
		const res1 = await uploadProjectCoverApi(projectId, fd);
		const storageInfo = getTotalChartsInfo();
		// 将图片地址和大屏信息进行保存
		const res2 = await updateProjectApi({
			...getProjectInfo(),
			cover: res1.data,
			detail: JSONStringify(storageInfo)
		});
		window.$message.success(res2.data);
		setSaveLoading(false);
	};

	const previewScreenInfo = () => {
		const localStorageInfo = getLocalStorage("chart") || [];
		// 当前画布内容打包
		const storageInfo = getTotalChartsInfo();
		// 根据当前项目 id 判断 sessionStorage 是否已存在，存在替换，不存在则添加
		if (localStorageInfo.length) {
			const repeateIndex = localStorageInfo.findIndex((e: { id: string }) => e.id === String(projectId));
			if (repeateIndex !== -1) {
				localStorageInfo.splice(repeateIndex, 1, { id: projectId, ...storageInfo });
				setSessionStorage(StorageEnum.J_CHART_STORAGE_LIST, localStorageInfo);
			} else {
				localStorageInfo.push({
					id: projectId,
					...storageInfo
				});
				setSessionStorage(StorageEnum.J_CHART_STORAGE_LIST, localStorageInfo);
			}
		} else {
			// 初次 sessionStorage 为空，直接 push
			setSessionStorage(StorageEnum.J_CHART_STORAGE_LIST, [{ projectId, ...storageInfo }]);
		}
		window.open(`/preview/${projectId}`);
	};

	return { saveLoading, saveScreenDataInfo, previewScreenInfo };
};

export default useInfoOperator;
