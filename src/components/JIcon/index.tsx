import { Icon } from "@ricons/utils";

const JIcon = (props: { icon: JSX.Element; size?: number; color?: string }) => {
	const { icon, size, color } = props;
	return (
		<Icon size={size || 15} color={color}>
			{icon}
		</Icon>
	);
};

export default JIcon;
