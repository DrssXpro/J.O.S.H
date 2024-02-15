import JCodeMirror from "@/components/JCodeMirror";

interface IJEditCodeProps {
	code: string;
	codeChange: (code: string) => void;
	headCodeTooltip: JSX.Element;
	tailCodeTooltip: JSX.Element;
}

const JEditCode = (props: IJEditCodeProps) => {
	const { code, codeChange, headCodeTooltip, tailCodeTooltip } = props;
	return (
		<>
			<div
				className="mb-2 font-semibold text-lg border-1 inline-block px-1"
				style={{
					borderColor: "rgba(112, 192, 232, 0.3)",
					fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
				}}
			>
				{headCodeTooltip}
			</div>
			<JCodeMirror code={code} lan="javascript" height={440} changeCode={codeChange} />
			<div
				className="mt-2 text-base border-1 px-1 inline-block"
				style={{
					borderColor: "rgba(112, 192, 232, 0.3)",
					fontFamily: 'Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace'
				}}
			>
				{tailCodeTooltip}
			</div>
		</>
	);
};

export default JEditCode;
