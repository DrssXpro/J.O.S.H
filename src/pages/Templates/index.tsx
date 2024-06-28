import JTemplateCard from "@/components/JTemplateCard";
import { TemplateInfo } from "@/service/types/requestTypes";
import { Button, Col, Modal, Pagination, Row, Select } from "antd";
import { useState } from "react";
import EmptyImage from "@/assets/images/empty-data.png";
import { TemplateListData } from "@/settings/systemDataSetting";

interface TemplateState {
	list: TemplateInfo[];
	currentTemplate: undefined | TemplateInfo;
	loading: boolean;
	empty: boolean;
	total: number;
	page: number;
	pageSize: number;
}

const EmptyBox = () => {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<img className="w-100 h-85" src={EmptyImage} alt="空" />
		</div>
	);
};

const TemplatesPage = () => {
	const [templateState, setTemplateState] = useState<TemplateState>({
		list: TemplateListData,
		currentTemplate: undefined,
		loading: false,
		empty: false,
		total: 0,
		page: 1,
		pageSize: 10
	});
	const [projectsState, setProjectState] = useState({
		list: [] as { value: string; label: string }[],
		currentProject: 0,
		isOpen: false
	});

	return (
		<>
			{templateState.empty ? (
				<div className="w-full h-full" style={{ height: `calc(100vh - 104px)` }}>
					<EmptyBox />
				</div>
			) : (
				<>
					<div style={{ minHeight: `calc(100vh - 152px)` }}>
						<Row gutter={[16, 16]}>
							{templateState.list.map((detail, index) => (
								<Col md={12} lg={8} xxl={6} key={index}>
									<JTemplateCard isUser={false} detail={detail} />
								</Col>
							))}
						</Row>
					</div>
					<div className="w-full flex flex-row-reverse mt-4">
						<Pagination showSizeChanger current={templateState.page} total={templateState.total} />
					</div>
					<Modal
						styles={{ header: { background: "none" } }}
						open={projectsState.isOpen}
						title="应用该模板"
						footer={
							<div className="flex items-center justify-end">
								<Button
									onClick={() => {
										setTemplateState((pre) => ({ ...pre, currentTemplate: undefined }));
										setProjectState((pre) => ({ ...pre, isOpen: false }));
									}}
								>
									取消
								</Button>
								<Button type="primary">应用</Button>
							</div>
						}
					>
						<div className="my-4 flex items-center">
							<div>选择我的应用：</div>
							<Select
								showSearch
								placeholder="请选择自己的应用"
								optionFilterProp="label"
								className="flex-1"
								onChange={(val) => {
									setProjectState((pre) => ({ ...pre, currentProject: Number(val) }));
								}}
								filterOption={(input: string, option?: { label: string; value: string }) =>
									(option?.label ?? "").includes(input)
								}
								options={projectsState.list}
							/>
						</div>
					</Modal>
				</>
			)}
		</>
	);
};

export default TemplatesPage;
