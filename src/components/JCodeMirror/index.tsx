import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import language from "./config";

interface IJCodeMirrorProps {
	code: string;
	lan: "javascript" | "json";
	height?: number;
	fontSize?: number;
	disabled?: boolean;
	placeHolder?: string;
	changeCode?: (code: string) => void;
}

// react-codemirror documnet: https://uiwjs.github.io/react-codemirror/#/
const JCodeMirror = (props: IJCodeMirrorProps) => {
	const { code, height, disabled = false, placeHolder = "", fontSize = 18, lan, changeCode } = props;
	return (
		<CodeMirror
			value={code}
			height={height ? `${height}px` : "auto"}
			style={{
				width: "100%",
				fontSize: `${fontSize}px`,
				fontWeight: "700"
			}}
			basicSetup={{ highlightActiveLine: false, lineNumbers: false, foldGutter: false }}
			tabIndex={2}
			editable={!disabled}
			theme={vscodeDark}
			extensions={language[lan]}
			onChange={changeCode}
			placeholder={placeHolder}
		></CodeMirror>
	);
};

export default JCodeMirror;
