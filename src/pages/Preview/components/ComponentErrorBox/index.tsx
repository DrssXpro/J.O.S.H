interface IShowComponentBoxProps {
	children: any;
	isError?: boolean;
}

const ShowComponentBox = (props: IShowComponentBoxProps) => {
	const { children, isError = true } = props;

	return (
		<div className="relative w-full h-full">
			{children}

			{isError && (
				<div
					className="absolute z-10 w-full h-full top-0 border-[red] border-4 border-dashed"
					style={{ background: "rgba(255, 0, 0, 0.3)" }}
				>
					<div className="absolute text-[25px] text-[red] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] transition-all">
						数据加载失败...
					</div>
				</div>
			)}
		</div>
	);
};

export default ShowComponentBox;
