import React from "react";
import { Route, Routes } from "react-router-dom";

const Login = React.lazy(() => import("./pages/Login/index"));

function App() {
	return (
		<Routes>
			<Route element={<Login />} path="/"></Route>
			<Route element={<Login />} path="/login"></Route>
		</Routes>
	);
}

export default App;
