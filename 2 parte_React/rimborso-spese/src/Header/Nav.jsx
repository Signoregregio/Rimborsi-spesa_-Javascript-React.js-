import GoHome from "./GoHome";
import LogOut from "./LogOut";
import Register from "./Register";
import { Link, useLocation, useNavigate } from "react-router-dom";

let userId = "";

export default function Nav() {
	let navigate = useNavigate();
	let location = useLocation();

	function goHome() {
		userId = sessionStorage.getItem("userId");
		console.log(userId)
		navigate(`/home/${userId}`);
	}
	
	function logOut(){
		sessionStorage.removeItem("userId");
		sessionStorage.removeItem("userRole");
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
							<LogOut logOut={logOut}/>
						</Link>
					)}
			</nav>
		</div>
	);
}
