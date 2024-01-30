import { CanvasLayoutEventName } from "@/types/EventTypes";
import { bus } from "@/utils";
import { create } from "zustand";
import { ICanvasConfig, ICanvasGlobal } from "./types";
import { PreviewScaleEnum } from "@/types/LayoutTypes";

interface ICanvasState {
	canvasGlobal: ICanvasGlobal;
	canvasConfig: ICanvasConfig;
}

interface ICanvasGlobalAction {
	setCanvasDOM: (dom: HTMLDivElement) => void;
	setcanvasContainerDOM: (dom: HTMLDivElement) => void;
	setScale: (scale: number) => void;
	addScale: (value: number) => void;
	subScale: (value: number) => void;
	setScaleDisabled: (lockScale: boolean) => void;
	autoLayoutCanvas: () => void;
}

interface ICanvasConfigAction {
	setCanvasSize: (width: number, height: number) => void;
}

const useCanvasStore = create<ICanvasState & ICanvasGlobalAction & ICanvasConfigAction>((set) => ({
	canvasGlobal: {
		canvasDOM: null,
		canvasContainerDOM: null,
		lockScale: false,
		scale: 1
	},
	canvasConfig: {
		canvasProjectName: "",
		canvasWidth: 1920,
		canvasHeight: 1080,
		canvasBackground: "",
		canvasBackgroundImage: "",
		canvasPreviewType: PreviewScaleEnum.FIT
	},
	setCanvasDOM: (dom) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, canvasDOM: dom } }));
	},
	setcanvasContainerDOM: (dom) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, canvasContainerDOM: dom } }));
	},
	setScale: (scale) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, scale } }));
	},
	addScale: (value) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, scale: canvasGlobal.scale + value } }));
	},
	subScale: (value) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, scale: canvasGlobal.scale - value } }));
	},
	setScaleDisabled: (lockScale) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, lockScale } }));
	},
	setCanvasSize: (width, height) => {
		set(({ canvasConfig }) => ({ canvasConfig: { ...canvasConfig, canvasWidth: width, canvasHeight: height } }));
	},
	autoLayoutCanvas: () => {
		set((state) => {
			const { lockScale, scale, canvasContainerDOM } = state.canvasGlobal;
			const { canvasWidth, canvasHeight } = state.canvasConfig;
			if (lockScale) return { ...state };
			let canvasScale = scale;
			if (canvasContainerDOM) {
				const containerWidth = canvasContainerDOM.clientWidth - 40;
				const containerHeight = canvasContainerDOM.clientHeight;

				// 计算画布与容器宽高比
				const containerRatio = parseFloat((containerWidth / containerHeight).toFixed(3));
				const canvasRatio = parseFloat((canvasWidth / canvasHeight).toFixed(3));
				// canvas: 16:9（1920 * 1080） container: 20:13（1000 * 650）, canvas 更宽

				if (canvasRatio > containerRatio) {
					const scaleWidth = parseFloat((containerWidth / canvasWidth).toFixed(3));
					canvasScale = scaleWidth > 1 ? 1 : scaleWidth;
				} else {
					// cavans: 4:3 container: 4:2 canvas 更高
					const scaleHeight = parseFloat((containerHeight / canvasHeight).toFixed(3));
					canvasScale = scaleHeight > 1 ? 1 : scaleHeight;
				}
				setTimeout(() => {
					bus.emit(CanvasLayoutEventName.AUTOLAYOUTCANVASPOS);
				}, 500);
			}
			return {
				canvasGlobal: {
					...state.canvasGlobal,
					scale: canvasScale
				}
			};
		});
	}
}));

export default useCanvasStore;
