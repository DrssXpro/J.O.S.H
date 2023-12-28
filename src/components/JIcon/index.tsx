import { Icon } from "@ricons/utils";

const JIcon = (props: { icon: JSX.Element; size?: number }) => {
	const { icon, size } = props;
	return <Icon size={size || 15}>{icon}</Icon>;
};

export default JIcon;
