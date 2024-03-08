import { ChartComponentProps } from "@/materials/types";
import { option } from "../config";
import { CSSProperties } from "react";
const TextCommonComponent = (props: ChartComponentProps & { dataset: string }) => {
	const {
		linkHead,
		link,
		fontColor,
		fontSize,
		letterSpacing,
		paddingY,
		paddingX,
		textAlign,
		borderWidth,
		borderColor,
		borderRadius,
		writingMode,
		backgroundColor,
		fontWeight
	} = props.chartConfig.option as typeof option;

	const computedContainerStyle: () => CSSProperties = () => ({
		display: "flex",
		alignItems: "center",
		justifyContent: `${textAlign}`
	});

	const computedContentStyle: () => CSSProperties = () => ({
		color: `${fontColor}`,
		padding: `${paddingY}px ${paddingX}px`,
		fontSize: `${fontSize}px`,
		fontWeight: `${fontWeight}`,
		letterSpacing: `${letterSpacing}px`,
		writingMode: writingMode as any,
		borderStyle: "solid",
		borderWidth: `${borderWidth}px`,
		borderRadius: `${borderRadius}px`,
		borderColor: `${borderColor}`,
		backgroundColor: `${backgroundColor}`
	});

	//打开链接
	const skipToLink = () => {
		window.open(linkHead + link);
	};
	return (
		<div style={{ ...computedContainerStyle() }}>
			<div style={{ ...computedContentStyle() }}>
				{link && (
					<span onClick={skipToLink} className="whitespace-pre-wrap">
						{option.dataset}
					</span>
				)}
				<span className="whitespace-pre-wrap">{option.dataset}</span>
			</div>
		</div>
	);
};

export default TextCommonComponent;
