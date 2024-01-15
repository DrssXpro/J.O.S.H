import { KeyBoardEventName } from "@/types/EventTypes";
import { bus } from "@/utils";

export function initKeyBoardEvent() {
	addKeyBoardListener();
}

export function removeKeyBoardEventListener() {
	document.onkeydown = null;
	document.onkeyup = null;
}

function addKeyBoardListener() {
	document.onkeydown = (e) => {
		const { code } = e;
		if (code === "Space") e.preventDefault();
		// space ctrl 键给予提示
		if (code === "Space" || code === "ControlRight" || code === "ControlLeft") showPressKeyText(code);
	};

	document.onkeyup = (e) => {
		const { code } = e;
		code === "Space" && bus.emit(KeyBoardEventName.SpaceKeyPress, false);
		bus.emit(KeyBoardEventName.ChangeKeyBoardText, "");
	};
}

function showPressKeyText(code: string) {
	let text = "";
	switch (code) {
		case "Space":
			text = `按下了「Space」键`;
			bus.emit(KeyBoardEventName.SpaceKeyPress, true);
			break;
		default:
			text = `按下了「Ctrl」键`;
	}
	bus.emit(KeyBoardEventName.ChangeKeyBoardText, text);
}
