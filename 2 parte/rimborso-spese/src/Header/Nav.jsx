import GoHome from "./GoHome";
import LogIn from "./LogIn";
import LogOut from "./LogOut";

export default function Nav() {
	return (
		<div className="divNav">
			<nav>
				<GoHome />
				<LogOut></LogOut>
			</nav>
		</div>
	);
}
