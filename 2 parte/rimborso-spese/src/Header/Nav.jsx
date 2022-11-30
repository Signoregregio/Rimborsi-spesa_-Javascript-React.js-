import HomePage from "../Pages/HomePage";
import RefundPage from "../Pages/RefundPage";
import GoHome from "./GoHome";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import { Routes, Route, Link } from "react-router-dom";

export default function Nav() {
	return (
		// <div className="divNav">
		// 	{/* <nav> */}
		// 	<Routes>
		// 		<Route path="/home" element={<h1>Ciao Home</h1>} />

		// 		<Route path="/miao" element={<h1>Hi</h1>} />
		// 	</Routes>

		// 	{/* </nav> */}
		// </div>
		<div className="divNav">
			<nav>
				<GoHome />
				<LogOut />
			</nav>
		</div>
	);
}
