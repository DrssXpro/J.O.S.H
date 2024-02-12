import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";

const language: {
	[key: string]: any;
} = {
	javascript: javascript(),
	json: json()
};

export default language;
