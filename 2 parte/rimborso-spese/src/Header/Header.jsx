import TitleRefundPage from "./TitleRefundPage";
import Nav from "./Nav";
import './header.css'

export default function Header() {
	return (
			<header className="mainHeader">
				<TitleRefundPage />
              
				<Nav />
			</header>
	);
}
