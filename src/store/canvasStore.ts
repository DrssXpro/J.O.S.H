import { create } from "zustand";

interface ICanvasState {
	canvasWidth: number;
	canvasHeight: number;
	scale: number;
	disableScale: boolean;
}

interface ICanvasAction {
	setScale: (scale: number) => void;
	addScale: (value: number) => void;
	subScale: (value: number) => void;
	setScaleDisabled: (disabled: boolean) => void;
	setCanvasSize: (width: number, height: number) => void;
}

const useCanvasStore = create<ICanvasState & ICanvasAction>((set) => ({
	scale: 1,
	disableScale: false,
	canvasWidth: 800,
	canvasHeight: 600,
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
	}
}));

export default useCanvasStore;
