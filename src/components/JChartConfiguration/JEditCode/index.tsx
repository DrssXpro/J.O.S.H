import JCodeMirror from "@/components/JCodeMirror";

interface IJEditCodeProps {
	code: string;
	headCodeTooltip: JSX.Element;
	tailCodeTooltip: JSX.Element;
	codeChange?: (code: string) => void;
	height?: number;
	disabled?: boolean;
}

const JEditCode = (props: IJEditCodeProps) => {
	const { code, codeChange, headCodeTooltip, tailCodeTooltip, disabled = false, height = 440 } = props;
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
			<JCodeMirror code={code} lan="javascript" height={height} changeCode={codeChange} disabled={disabled} />
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
