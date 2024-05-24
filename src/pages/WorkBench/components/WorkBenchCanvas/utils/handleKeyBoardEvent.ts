import keymaster from "keymaster";
import { bus } from "@/utils";
import { KeyBoardEventName } from "@/types/EventTypes";
import { MenuEnum, WinKeyboard } from "@/types/EditCanvasTypes";
import { debounce } from "lodash-es";

const winCtrlMerge = (e: string) => `${WinKeyboard.CTRL}+${e}`;
const winShiftMerge = (e: string) => `${WinKeyboard.SHIFT}+${e}`;

// 枚举 window 快捷键所有操作
export const winKeyboardValue = {
	[MenuEnum.ARROW_UP]: winCtrlMerge("up"),
	[MenuEnum.ARROW_RIGHT]: winCtrlMerge("right"),
	[MenuEnum.ARROW_DOWN]: winCtrlMerge("down"),
	[MenuEnum.ARROW_LEFT]: winCtrlMerge("left"),
	[MenuEnum.SAVE]: winCtrlMerge("s"),
	[MenuEnum.COPY]: winCtrlMerge("c"),
	[MenuEnum.CUT]: winCtrlMerge("x"),
	[MenuEnum.PARSE]: winCtrlMerge("v"),
	[MenuEnum.DELETE]: "delete",
	[MenuEnum.BACK]: winCtrlMerge("z"),
	[MenuEnum.FORWORD]: winCtrlMerge(winShiftMerge("z")),
	[MenuEnum.GROUP]: winCtrlMerge("g"),
	[MenuEnum.UN_GROUP]: winCtrlMerge(winShiftMerge("g")),
	[MenuEnum.LOCK]: winCtrlMerge("l"),
	[MenuEnum.UNLOCK]: winCtrlMerge(winShiftMerge("l")),
	[MenuEnum.HIDE]: winCtrlMerge("h"),
	[MenuEnum.SHOW]: winCtrlMerge(winShiftMerge("h"))
};

// Win 快捷键列表
const winKeyList: Array<string> = [
	winKeyboardValue.up,
	winKeyboardValue.right,
	winKeyboardValue.down,
	winKeyboardValue.left,

	winKeyboardValue.delete,
	winKeyboardValue.copy,
	winKeyboardValue.cut,
	winKeyboardValue.parse,

	winKeyboardValue.back,
	winKeyboardValue.forward,

	winKeyboardValue.group,
	winKeyboardValue.unGroup,

	winKeyboardValue.lock,
	winKeyboardValue.unLock,

	winKeyboardValue.hide,
	winKeyboardValue.show,

	winKeyboardValue.save
];

export function initKeyBoardListener() {
	addOperatorKeyboard();
	addSpaceAndControlKeyBoard();
}

export function removeKeyBoardEventListener() {
	document.onkeydown = null;
	document.onkeyup = null;

	winKeyList.forEach((key: string) => {
		keymaster.unbind(key);
	});
}

export function addSpaceAndControlKeyBoard() {
	document.onkeydown = (e) => {
		const { code } = e;
		if (code === "Space" && e.target === document.body) e.preventDefault();
		// space ctrl 键给予提示
		if (code === "Space" || code === "ControlRight" || code === "ControlLeft") showPressKeyText(code);
	};

	document.onkeyup = (e) => {
		const { code } = e;
		code === "Space" && bus.emit(KeyBoardEventName.SPACEKEYPRESS, false);
		bus.emit(KeyBoardEventName.ChANGEKEYBOARDTEXT, "");
	};
}

function showPressKeyText(code: string) {
	let text = "";
	switch (code) {
		case "Space":
			text = `按下了「Space」键`;
			bus.emit(KeyBoardEventName.SPACEKEYPRESS, true);
			break;
		default:
			text = `按下了「Ctrl」键`;
	}
	bus.emit(KeyBoardEventName.ChANGEKEYBOARDTEXT, text);
}

export const addOperatorKeyboard = () => {
	const switchKeyBoardHandle = (keyboardValue: typeof winKeyboardValue, event: string) => {
		const throttleTime = 50;
		switch (event) {
			case keyboardValue[MenuEnum.DELETE]:
				keymaster(
					event,
					debounce(() => {
						bus.emit(KeyBoardEventName.DELETEPRESS);
						return false;
					}, throttleTime)
				);
				break;
			case keyboardValue[MenuEnum.SAVE]:
				keymaster(event, () => {
					bus.emit(KeyBoardEventName.SAVEPROJECT);
					return false;
				});
				break;
			default:
				break;
		}
	};

	winKeyList.forEach((key: string) => {
		switchKeyBoardHandle(winKeyboardValue, key);
	});
};
