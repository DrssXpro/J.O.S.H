interface IJBaseHeaderProps {
	left?: JSX.Element;
	center?: JSX.Element;
	right?: JSX.Element;
}

const JBaseHeader = (props: IJBaseHeaderProps) => {
	const { left: Left, center: Center, right: Right } = props;
	return (
		<div className="h-full flex items-center justify-between">
			<div className="w-1/4">{Left}</div>
			<div className="flex-1">{Center}</div>
			<div className="w-1/4">{Right}</div>
		</div>
	);
};

export default JBaseHeader;
