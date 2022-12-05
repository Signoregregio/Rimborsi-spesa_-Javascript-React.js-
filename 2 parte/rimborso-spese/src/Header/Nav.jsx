import GoHome from "./GoHome";
import LogOut from "./LogOut";
import Register from "./Register";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

let userId = "";
let userRole = "";

export default function Nav() {
	let navigate = useNavigate();
	let location = useLocation();
	useEffect(() => {
		userId = sessionStorage.getItem("userId");
	}, []);

	function goHome() {
		navigate(`/home/${userId}`);
	}

	return (
		<div className="divNav">
			<nav>
				<GoHome goHome={goHome} />
					{location.pathname === "/" ? (
						<Link to={"/register"}>
							<Register />
						</Link>
					) : (
						<Link to="/">
							<LogOut />
						</Link>
					)}
			</nav>
		</div>
	);
}
