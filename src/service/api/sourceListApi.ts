import { GET } from "../axios";
import { SourceItem } from "../types/requestTypes";

// 获取资源库内容
async function getSourceListApi() {
	return GET<SourceItem[]>("/source_list");
}

export { getSourceListApi };
