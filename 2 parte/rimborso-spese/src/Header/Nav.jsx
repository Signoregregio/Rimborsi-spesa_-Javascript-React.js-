import GoHome from "./GoHome";
import LogOut from "./LogOut";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Nav() {
	let userId;
	let userRole;
	let navigate = useNavigate();
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
				<Link to="/">
					<LogOut />
				</Link>
			</nav>
		</div>
	);
}
