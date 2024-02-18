import { ComponentType } from "@/materials/types";
import useChartStore from "@/store/chartStore/chartStore";
import { CSSProperties, useMemo } from "react";

interface IEditShapeBoxProps {
	chartConfig: ComponentType;
	children: any;
}

enum PointEnum {
	TOP = "t",
	RIGHT = "r",
	BOTTOM = "b",
	LEFT = "l",
	LEFT_TOP = "lt",
	RIGHT_TOP = "rt",
	LEFT_BOTTOM = "lb",
	RIGHT_BOTTOM = "rb"
}

const PointCursorStyleMap = {
	[PointEnum.TOP]: "n",
	[PointEnum.RIGHT]: "e",
	[PointEnum.BOTTOM]: "s",
	[PointEnum.LEFT]: "w",
	[PointEnum.LEFT_TOP]: "nw",
	[PointEnum.RIGHT_TOP]: "ne",
	[PointEnum.LEFT_BOTTOM]: "sw",
	[PointEnum.RIGHT_BOTTOM]: "se"
};

interface Point {
	direction: PointEnum;
	style: CSSProperties;
}

const points: Point[] = [
	{
		direction: PointEnum.TOP,
		style: {
			top: 0,
			left: "50%",
			width: "40px",
			transform: "translate(-50%, -50%)"
		}
	},
	{
		direction: PointEnum.RIGHT,
		style: {
			top: "50%",
			right: 0,
			height: "40px",
			transform: "translate(50%, -50%)"
		}
	},
	{
		direction: PointEnum.BOTTOM,
		style: {
			left: "50%",
			bottom: 0,
			width: "40px",
			transform: "translate(-50%, 50%)"
		}
	},
	{
		direction: PointEnum.LEFT,
		style: {
			left: 0,
			top: "50%",
			height: "40px",
			transform: "translate(-50%, -50%)"
		}
	},
	{
		direction: PointEnum.LEFT_TOP,
		style: {
			left: 0,
			top: 0,
			transform: "translate(-25%, -25%)"
		}
	},
	{
		direction: PointEnum.RIGHT_TOP,
		style: {
			right: 0,
			top: 0,
			transform: "translate(25%, -25%)"
		}
	},
	{
		direction: PointEnum.LEFT_BOTTOM,
		style: {
			left: 0,
			bottom: 0,
			transform: "translate(-25%, 25%)"
		}
	},
	{
		direction: PointEnum.RIGHT_BOTTOM,
		style: {
			right: 0,
			bottom: 0,
			transform: "translate(25%, 25%)"
		}
	}
];

const EditShapeBox = (props: IEditShapeBoxProps) => {
	const { children, chartConfig } = props;
	const { selectId } = useChartStore();

	const isSelect = useMemo(() => {
		return selectId.find((i) => chartConfig.id === i);
	}, [selectId]);
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			{children}

			{/*  points style */}
			{isSelect &&
				points.map(({ direction, style }) => (
					<div
						className="absolute z-11 w-3 h-3 border-3 border-[#1668DC] bg-[#fff]"
						key={direction}
						style={{ borderRadius: "5px", cursor: `${PointCursorStyleMap[direction]}-resize`, ...style }}
					></div>
				))}

			{/* select/hover border style */}
			<div
				className="absolute z-10 top-0 w-full h-full border-[#1668DC] rounded hover:border-2 hover:border-dotted cursor-move"
				style={{
					borderStyle: isSelect ? "solid" : undefined,
					borderWidth: isSelect ? "2px" : undefined
				}}
			></div>
			{/* select background style */}
			<div
				className="absolute z-9 top-0 w-full h-full"
				style={{
					opacity: isSelect ? 0.1 : 1,
					background: isSelect ? "#1668DC" : undefined
				}}
			></div>
		</div>
	);
};

export default EditShapeBox;
