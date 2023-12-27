import userStore from "@/store/userStore";
import { Button } from "antd";

const Increment = () => {
	const increment = userStore((state) => state.increment);
	return (
		<Button type="primary" onClick={increment}>
			add
		</Button>
	);
};
const Decrement = () => {
	const decrement = userStore((state) => state.decrement);
	return (
		<Button type="primary" onClick={decrement}>
			sub
		</Button>
	);
};

const Login = () => {
	const count = userStore((state) => state.count);
	return (
		<div>
			<div>Login:{count}</div>
			<div style={{ display: "flex", gap: 20, marginTop: "10px" }}>
				<Increment />
				<Decrement />
			</div>
		</div>
	);
};

export default Login;
