import { Tooltip, Upload } from "antd";
import { IoShare, IoDownload } from "react-icons/io5";
import { useToolFileOperator } from "./hooks/useToolFileOperator";

type BtnListType = {
	key: string;
	name: string;
	icon: React.ReactNode;
	handle?: () => void;
};

const CanvasTool = () => {
	const { exportHandle, fileProps } = useToolFileOperator();
	// 配置列表
	const btnList: BtnListType[] = [
		{
			key: "import",
			name: "导入",
			icon: <IoDownload color="#fff" />
		},
		{
			key: "export",
			name: "导出",
			icon: <IoShare color="#fff" />,
			handle: exportHandle
		}
	];
	return (
		<div
			className="absolute right-5 bottom-20  px-1 py-2 bg-[#232324] border-[#2a2a2b] border-1 border-solid rounded-2xl flex flex-col items-center gap-5"
			style={{ boxShadow: "0 8px 20px #00000026" }}
		>
			{btnList.map((i) => (
				<div
					key={i.key}
					className="bg-[#353535] w-8 h-8 p-1 rounded-full flex items-center justify-center cursor-pointer"
					onClick={i.handle}
				>
					<Tooltip title={i.name}>
						{i.key === "import" ? (
							<Upload {...fileProps} showUploadList={false}>
								{i.icon}
							</Upload>
						) : (
							i.icon
						)}
					</Tooltip>
				</div>
			))}
		</div>
	);
};

export default CanvasTool;
