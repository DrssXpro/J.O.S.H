import { GET } from "../axios";
import { SourceItem } from "../types/requestTypes";
const BASEURL = import.meta.env.VITE_BASE_URL;

// 获取资源库内容
async function getSourceListApi() {
	return GET<SourceItem[]>(`${BASEURL}/source_list`);
}

export { getSourceListApi };
