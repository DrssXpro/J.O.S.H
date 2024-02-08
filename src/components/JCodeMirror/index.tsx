import CodeMirror from "@uiw/react-codemirror";
import { basicDark } from "@uiw/codemirror-theme-basic";
import language from "./config";

interface IJCodeMirrorProps {
	code: string;
	lan: "javascript" | "json";
	height?: number;
	disabled?: boolean;
	changeCode?: (code: string) => void;
}

// react-codemirror documnet: https://uiwjs.github.io/react-codemirror/#/
const JCodeMirror = (props: IJCodeMirrorProps) => {
	const { code, height, disabled = false, lan, changeCode } = props;
	return (
		<CodeMirror
			value={code}
			height={height ? `${height}px` : "auto"}
			style={{
				width: "100%",
				fontSize: "18px"
			}}
			basicSetup={{ highlightActiveLine: false, lineNumbers: false, foldGutter: false }}
			tabIndex={2}
			editable={!disabled}
			theme={basicDark}
			extensions={language[lan]}
			onChange={changeCode}
		></CodeMirror>
	);
};

export default JCodeMirror;
