import { useState } from "react";
import { Radio, Tabs, TabsProps, Typography } from "antd";
import RequestConfigTable from "../RequestConfigTable";
import { RequestBodyEnum, RequestBodyEnumList } from "@/types/HttpTypes";
import JCodeMirror from "@/components/JCodeMirror";

const BodyConfig = () => {
	const [selectBody, setSelectBody] = useState(RequestBodyEnumList[0]);
	const [code, setCode] = useState("");

	const bodyMap = {
		[RequestBodyEnum.NONE]: (
			<div className="p-2">
				<Typography.Text type="secondary">该接口没有 body 体</Typography.Text>
			</div>
		),
		[RequestBodyEnum.FORM_DATA]: <RequestConfigTable />,
		[RequestBodyEnum.X_WWW_FORM_URLENCODED]: <RequestConfigTable />,
		[RequestBodyEnum.JSON]: (
			<div className="border-1 border-[#303030] h-[200px]">
				<JCodeMirror
					code={code}
					lan="json"
					changeCode={(code) => setCode(code)}
					placeHolder="请输入 JSON 格式数据"
				/>
			</div>
		)
	};

	return (
		<>
			<div className="mb-5">
				<Radio.Group
					value={selectBody}
					onChange={(e) => {
						setSelectBody(e.target.value);
					}}
				>
					{RequestBodyEnumList.map((i) => (
						<Radio key={i} value={i}>
							{i}
						</Radio>
					))}
				</Radio.Group>
			</div>
			<div className="w-[80%]">{bodyMap[selectBody]}</div>
		</>
	);
};

const items: TabsProps["items"] = [
	{
		key: "1",
		label: "Params",
		children: (
			<div className="w-[80%]">
				<RequestConfigTable />
			</div>
		)
	},
	{
		key: "2",
		label: "Body",
		children: <BodyConfig />
	},
	{
		key: "3",
		label: "Header",
		children: (
			<div className="w-[80%]">
				<RequestConfigTable />
			</div>
		)
	}
];

const NormalRequestConfig = () => {
	return <Tabs items={items}></Tabs>;
};

export default NormalRequestConfig;
