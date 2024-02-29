import { bus } from "@/utils";
import { create } from "zustand";
import { ICanvasConfigAction, ICanvasGlobalAction, ICanvasState } from "./types";
import { CanvasLayoutEventName } from "@/types/EventTypes";
import { PreviewScaleEnum } from "@/types/LayoutTypes";
import { defaultTheme } from "@/theme";

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
		canvasPreviewType: PreviewScaleEnum.FIT,
		// 图表主题色
		chartThemeColor: defaultTheme,
		// 自定义颜色列表
		chartCustomThemeColorInfo: undefined
	},
	addScale: (value) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, scale: canvasGlobal.scale + value } }));
	},
	subScale: (value) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, scale: canvasGlobal.scale - value } }));
	},
	setCanvasGlobal: (key, value) => {
		set(({ canvasGlobal }) => ({ canvasGlobal: { ...canvasGlobal, [key]: value } }));
	},
	setCanvasConfig: (key, value) => {
		set(({ canvasConfig }) => ({ canvasConfig: { ...canvasConfig, [key]: value } }));
	},
	// 重新设置 canvasConfig (preview 从 storage 中获取赋值)
	setGlobalCanvasConfig: (config) => {
		set(() => ({ canvasConfig: config }));
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
