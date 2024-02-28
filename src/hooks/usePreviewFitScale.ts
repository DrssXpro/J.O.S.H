import { PreviewScaleEnum } from "@/types/LayoutTypes";
import { throttle } from "lodash-es";

const usePreviewFitScale = (
	width: number,
	height: number,
	fitType: PreviewScaleEnum,
	scaleRef: React.MutableRefObject<HTMLDivElement | null>
) => {
	// * 画布尺寸（px）
	const baseWidth = width;
	const baseHeight = height;

	// * 默认缩放值
	const scale = {
		width: 1,
		height: 1
	};

	const calcRate = getScaleMethod(baseWidth, baseHeight, scale, fitType);

	const resize = throttle(() => {
		calcRate();
	}, 200);

	// * 改变窗口大小重新绘制
	const windowResize = () => {
		window.addEventListener("resize", resize);
	};

	// * 卸载监听
	const unWindowResize = () => {
		window.removeEventListener("resize", resize);
	};

	// 根据 fit type 来计算不同的缩放比例
	function getScaleMethod(
		baseWidth: number,
		baseHeight: number,
		scale: { height: number; width: number },
		type: PreviewScaleEnum
	) {
		// 需要保持的比例
		const baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));
		switch (type) {
			case PreviewScaleEnum.FIT:
				return () => {
					if (scaleRef.current) {
						scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5));
						scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `center center`;
					}
				};
			case PreviewScaleEnum.FULL:
				return () => {
					if (scaleRef.current) {
						scale.width = parseFloat((window.innerWidth / width).toFixed(5));
						scale.height = parseFloat((window.innerHeight / height).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `center center`;
					}
				};
			case PreviewScaleEnum.SCROLL_X:
				return () => {
					if (scaleRef.current) {
						scale.width = parseFloat(((window.innerHeight * baseProportion) / baseWidth).toFixed(5));
						scale.height = parseFloat((window.innerHeight / baseHeight).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `left top`;
					}
				};
			case PreviewScaleEnum.SCROLL_Y:
				return () => {
					if (scaleRef.current) {
						scale.height = parseFloat((window.innerWidth / baseProportion / baseHeight).toFixed(5));
						scale.width = parseFloat((window.innerWidth / baseWidth).toFixed(5));
						scaleRef.current.style.transform = `scale(${scale.width}, ${scale.height})`;
						scaleRef.current.style.transformOrigin = `left top`;
					}
				};
		}
	}

	return {
		calcRate,
		windowResize,
		unWindowResize
	};
};

export default usePreviewFitScale;
