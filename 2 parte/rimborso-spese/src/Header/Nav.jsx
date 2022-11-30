import GoHome from "./GoHome";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import {  Routes, Route, Link } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import RefundPage from "../Pages/RefundPage";

export default function Nav() {
	return (
			<div className="divNav">
				<nav>
					<Link to={"/"}>
						<GoHome />
					</Link>
					<Link to={"/RefundPage"}>
						<LogOut />
					</Link>
				</nav>
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/RefundPage" element={<RefundPage />} />
				</Routes>
			</div>
	);
}
