import GoHome from "./GoHome";
import LogOut from "./LogOut";
import { Link } from "react-router-dom";

export default function Nav() {
	return (
		<div className="divNav">
			<nav>
				<Link to="/home">
					<GoHome />
				</Link>
				<Link to="/">
					<LogOut />
				</Link>
			</nav>
		</div>
	);
}
