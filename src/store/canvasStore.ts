import { CanvasLayoutEventName } from "@/types/EventTypes";
import { bus } from "@/utils";
import { create } from "zustand";

interface ICanvasState {
	canvasWidth: number;
	canvasHeight: number;
	scale: number;
	disableScale: boolean;
	canvasDOM: HTMLDivElement | null;
	canvasContainerDOM: HTMLDivElement | null;
}

interface ICanvasAction {
	setScale: (scale: number) => void;
	addScale: (value: number) => void;
	subScale: (value: number) => void;
	setScaleDisabled: (disabled: boolean) => void;
	setCanvasSize: (width: number, height: number) => void;
	setCanvasDOM: (dom: HTMLDivElement) => void;
	setcanvasContainerDOM: (dom: HTMLDivElement) => void;
	autoLayoutCanvas: () => void;
}

const useCanvasStore = create<ICanvasState & ICanvasAction>((set) => ({
	scale: 1,
	disableScale: false,
	canvasWidth: 1920,
	canvasHeight: 1080,
	canvasDOM: null,
	canvasContainerDOM: null,
	canvasLayoutDOM: null,

	setScale: (scale) => {
		set(() => ({ scale }));
	},
	addScale: (value) => {
		set((state) => ({ scale: state.scale + value }));
	},
	subScale: (value) => {
		set((state) => ({ scale: state.scale - value }));
	},
	setScaleDisabled: (disabled) => {
		set(() => ({ disableScale: disabled }));
	},
	setCanvasSize: (width, height) => {
		set(() => ({ canvasWidth: width, canvasHeight: height }));
	},
	setCanvasDOM: (dom) => {
		set(() => ({ canvasDOM: dom }));
	},
	setcanvasContainerDOM: (dom) => {
		set(() => ({ canvasContainerDOM: dom }));
	},

	autoLayoutCanvas: () => {
		set((state) => {
			const { canvasDOM, canvasWidth, canvasHeight, canvasContainerDOM } = state;
			let scale = state.scale;
			if (canvasDOM && canvasContainerDOM) {
				const containerWidth = canvasContainerDOM.clientWidth - 40;
				const containerHeight = canvasContainerDOM.clientHeight;

				// 计算画布与容器宽高比
				const containerRatio = parseFloat((containerWidth / containerHeight).toFixed(3));
				const canvasRatio = parseFloat((canvasWidth / canvasHeight).toFixed(3));
				// canvas: 4:3 container: 4:7, canvas 更宽

				if (canvasRatio > containerRatio) {
					const scaleWidth = parseFloat(((containerHeight * containerRatio) / canvasWidth).toFixed(3));
					scale = scaleWidth > 1 ? 1 : scaleWidth;
				} else {
					// cavans: 4:3 container: 4:2 canvas 更高
					const scaleHeight = parseFloat((containerWidth / containerRatio / canvasHeight).toFixed(3));
					scale = scaleHeight > 1 ? 1 : scaleHeight;
				}
				setTimeout(() => {
					bus.emit(CanvasLayoutEventName.AUTOLAYOUTCANVASPOS);
				}, 500);
			}
			return {
				scale
			};
		});
	}
}));

export default useCanvasStore;
