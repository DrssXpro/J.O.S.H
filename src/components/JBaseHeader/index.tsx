interface IJBaseHeaderProps {
	left?: JSX.Element;
	center?: JSX.Element;
	right?: JSX.Element;
	leftWidth?: string;
	rightWidth?: string;
}

const JBaseHeader = (props: IJBaseHeaderProps) => {
	const { left: Left, center: Center, right: Right, leftWidth, rightWidth } = props;
	return (
		<div className="h-full flex items-center justify-between">
			<div className={`"w-[${leftWidth || "1/4"}]`}>{Left}</div>
			<div className="flex-1">{Center}</div>
			<div className={`w-[${rightWidth || "1/4"}]`}>{Right}</div>
		</div>
	);
};

export default JBaseHeader;
