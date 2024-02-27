import { ComponentType } from "@/materials/types";

interface IShowComponentBoxProps {
	chartConfig: ComponentType;
	children: any;
}

const ShowComponentBox = (props: IShowComponentBoxProps) => {
	const { children } = props;

	return <div className="w-full h-full">{children}</div>;
};

export default ShowComponentBox;
