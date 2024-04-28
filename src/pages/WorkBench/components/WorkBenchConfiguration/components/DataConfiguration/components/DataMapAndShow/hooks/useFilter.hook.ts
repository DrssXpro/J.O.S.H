import { customizeHttp } from "@/service/http";
import { RequestConfigType, RequestDataValueEnum, RequestGlobalConfigType } from "@/types/HttpTypes";
import { cloneDeep } from "lodash-es";
import { useEffect, useMemo, useState } from "react";

const useFilter = (
	chartFilter: string,
	chartRequestConfig: RequestConfigType,
	requestGlobalConfig: RequestGlobalConfigType
) => {
	// filter code
	const [filterCode, setFilterCode] = useState(chartFilter || "return data;");
	// filter modal
	const [isOpenFilter, setIsOpenFilter] = useState(false);
	// filter error
	const [filterError, setFilterError] = useState(false);
	// 图表动态请求获取数据
	const [sourceData, setSourceData] = useState<any>("");
	// filter show or hidden
	const showFilter = useMemo(() => chartRequestConfig.requestDataType !== RequestDataValueEnum.STATIC, []);
	// filter 执行结果
	const filterRes = useMemo(() => {
		try {
			const fn = new Function("data", "res", filterCode);
			const response = cloneDeep(sourceData);
			const res = fn(response.data, response);
			setFilterError(false);
			return res;
		} catch (error) {
			setFilterError(true);
			return `过滤函数错误，日志：${error}`;
		}
	}, [sourceData, filterCode]);

	// 打开 filter modal 时获取一次数据
	useEffect(() => {
		isOpenFilter && fetchTargetData();
	}, [isOpenFilter]);

	// 动态获取数据
	const fetchTargetData = async () => {
		try {
			const res = await customizeHttp(chartRequestConfig, requestGlobalConfig);
			if (res) {
				setSourceData(res);
				return;
			}
			window.$message.warning("没有拿到返回值，请检查接口！");
		} catch (error) {
			console.error(error);
			window.$message.error("数据异常，请检查参数！");
		}
	};

	return {
		showFilter,
		isOpenFilter,
		filterError,
		filterRes,
		filterCode,
		sourceData,
		setIsOpenFilter,
		setFilterCode
	};
};

export default useFilter;
