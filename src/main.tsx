import ReactDOM from "react-dom/client";
import { IconContext } from "react-icons";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./styles/reset.css";
// 引入动画
import "animate.css/animate.min.css";
// 引入 unocss
import "virtual:uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<IconContext.Provider value={{ size: "18px" }}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</IconContext.Provider>
);
