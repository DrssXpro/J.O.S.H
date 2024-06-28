import { useState } from "react";
import useTotalChartsInfo from "@/hooks/useTotalChartsInfo";
import { getLocalStorage, setSessionStorage } from "@/utils/storages";
import { StorageEnum } from "@/types/StorageTypes";

const useInfoOperator = (projectId: number) => {
	const [saveLoading] = useState(false);
	const [showPublishModal, setShowPublishModal] = useState(false);

	const { getTotalChartsInfo } = useTotalChartsInfo();

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

	const copyPublishUrl = async (url: string) => {
		try {
			await navigator.clipboard.writeText(url);
			window.$message.success("复制成功");
		} catch (error) {
			window.$message.error("复制失败");
		}
	};

	return {
		saveLoading,
		showPublishModal,
		infoStatus: false,
		setShowPublishModal,
		previewScreenInfo,
		copyPublishUrl
	};
};

export default useInfoOperator;
