import { Radio, Tabs, TabsProps, Typography } from "antd";
import RequestConfigTable from "../RequestConfigTable";
import { RequestBodyEnum, RequestBodyEnumList, RequestConfigType, RequestParamsTypeEnum } from "@/types/HttpTypes";
import JCodeMirror from "@/components/JCodeMirror";
import useChartStore from "@/store/chartStore/chartStore";
import { memo } from "react";

const BodyConfig = (props: { chartIndex: number; request: RequestConfigType }) => {
	const { chartIndex, request } = props;
	const { updateChartRequestParams, updateChartConfig } = useChartStore(
		({ updateChartRequestParams, updateChartConfig }) => ({ updateChartRequestParams, updateChartConfig })
	);
	const { requestParamsBodyType } = request;
	const { Body } = request.requestParams;

	const bodyMap = {
		[RequestBodyEnum.NONE]: (
			<div className="p-2">
				<Typography.Text type="secondary">该接口没有 body 体</Typography.Text>
			</div>
		),
		[RequestBodyEnum.FORM_DATA]: (
			<RequestConfigTable
				dataParams={Body[RequestBodyEnum.FORM_DATA]}
				updateParams={(value) => {
					updateChartRequestParams(chartIndex, RequestParamsTypeEnum.BODY, {
						...Body,
						[RequestBodyEnum.FORM_DATA]: value
					});
				}}
			/>
		),
		[RequestBodyEnum.X_WWW_FORM_URLENCODED]: (
			<RequestConfigTable
				dataParams={Body[RequestBodyEnum.X_WWW_FORM_URLENCODED]}
				updateParams={(value) => {
					updateChartRequestParams(chartIndex, RequestParamsTypeEnum.BODY, {
						...Body,
						[RequestBodyEnum.X_WWW_FORM_URLENCODED]: value
					});
				}}
			/>
		),
		[RequestBodyEnum.JSON]: (
			<div className="border-1 border-solid border-[#303030] h-[200px]">
				<JCodeMirror
					code={Body[RequestBodyEnum.JSON]}
					lan="json"
					changeCode={(code) =>
						updateChartRequestParams(chartIndex, RequestParamsTypeEnum.BODY, {
							...Body,
							[RequestBodyEnum.JSON]: code
						})
					}
					placeHolder="请输入 JSON 格式数据"
				/>
			</div>
		)
	};

	return (
		<>
			<div className="mb-5">
				<Radio.Group
					value={requestParamsBodyType}
					onChange={(e) => {
						updateChartConfig(chartIndex, "request", "requestParamsBodyType", e.target.value);
					}}
				>
					{RequestBodyEnumList.map((i) => (
						<Radio key={i} value={i}>
							{i}
						</Radio>
					))}
				</Radio.Group>
			</div>
			<div className="w-[80%]">{bodyMap[requestParamsBodyType]}</div>
		</>
	);
};

const NormalRequestConfig = memo((props: { chartIndex: number; request: RequestConfigType }) => {
	const { chartIndex, request } = props;
	const updateChartRequestParams = useChartStore((selector) => selector.updateChartRequestParams);
	const { Params, Header } = request.requestParams;
	const items: TabsProps["items"] = [
		{
			key: "1",
			label: "Params",
			children: (
				<div className="w-[80%]">
					<RequestConfigTable
						dataParams={Params}
						updateParams={(value) => {
							updateChartRequestParams(chartIndex, RequestParamsTypeEnum.PARAMS, value);
						}}
					/>
				</div>
			)
		},
		{
			key: "2",
			label: "Body",
			children: <BodyConfig {...props} />
		},
		{
			key: "3",
			label: "Header",
			children: (
				<div className="w-[80%]">
					<RequestConfigTable
						dataParams={Header}
						updateParams={(value) => {
							updateChartRequestParams(chartIndex, RequestParamsTypeEnum.HEADER, value);
						}}
					/>
				</div>
			)
		}
	];
	return <Tabs items={items}></Tabs>;
});

export default NormalRequestConfig;
