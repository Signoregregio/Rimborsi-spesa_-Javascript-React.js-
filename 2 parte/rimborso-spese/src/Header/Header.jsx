import TitleRefundPage from "./TitleRefundPage";
import Nav from "./Nav";

export default function Header({dateMonth}) {
	return (
		<div className="divHeader">
			<header>
				<TitleRefundPage dateMonth={dateMonth} />
				<Nav />
			</header>
		</div>
	);
}
