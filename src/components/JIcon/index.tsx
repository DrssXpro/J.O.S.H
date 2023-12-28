import { Icon } from "@ricons/utils";

const JIcon = (props: { icon: any; size?: number }) => {
	const { icon, size } = props;
	return <Icon size={size || 15}>{icon}</Icon>;
};

export default JIcon;
