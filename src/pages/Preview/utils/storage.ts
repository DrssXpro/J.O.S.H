import { StorageEnum } from "@/types/StorageTypes";
import { getSessionStorage } from "@/utils/storages";

const getSessionStorageCanvasInfo = () => {
	const previewId = document.location.pathname.split("/")[2];
	if (previewId) {
		const storageList = getSessionStorage(StorageEnum.J_CHART_STORAGE_LIST);
		if (storageList) {
			for (let i = 0; i < storageList.length; i++) {
				if (storageList[i].projectId == previewId) {
					return storageList[i];
				}
			}
		}
	}
	return;
};

export { getSessionStorageCanvasInfo };
