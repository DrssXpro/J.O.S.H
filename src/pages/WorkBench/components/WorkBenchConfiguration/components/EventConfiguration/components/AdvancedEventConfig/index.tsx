import { useState } from "react";
import { Button, Modal, Tag, Typography } from "antd";
import JCollapseBox from "@/components/JChartConfiguration/public/JCollapseBox";
import JCodeMirror from "@/components/JCodeMirror";
import JIcon from "@/components/JIcon";
import { Document, Pencil } from "@ricons/ionicons5";
import { initAdvancedEventCode } from "../codeConfig";

const AdvancedEventConfig = () => {
	const [advancedCode, setAdvancedCode] = useState(initAdvancedEventCode);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<JCollapseBox
				name="高级事件配置"
				operator={
					<Button
						type="primary"
						ghost
						size="small"
						icon={<JIcon icon={<Pencil />} />}
						onClick={() => setIsOpen(true)}
					>
						编辑
					</Button>
				}
			>
				<div className="p-1 border-1 border-[#3E3E3F]">
					<JCodeMirror
						lan="javascript"
						fontSize={14}
						code={advancedCode}
						changeCode={(code) => setAdvancedCode(code)}
						disabled
					/>
				</div>
			</JCollapseBox>
			<Modal
				open={isOpen}
				width={1000}
				closable={false}
				styles={{ header: { background: "none" } }}
				footer={
					<div className="w-full h-10 flex items-center justify-between">
						<div className="flex items-center">
							<Tag color="processing">
								<div className="p-1 flex items-center">
									<JIcon icon={<Document />}></JIcon>
									说明
								</div>
							</Tag>
							<Typography.Text>编写方式同正常 JavaScript 写法</Typography.Text>
						</div>
						<div className="flex items-center justify-center">
							<Button onClick={() => setIsOpen(false)}>取消</Button>
							<Button type="primary" onClick={() => setIsOpen(false)}>
								保存
							</Button>
						</div>
					</div>
				}
			></Modal>
		</>
	);
};

export default AdvancedEventConfig;
