import "./index.css";
import RefundPage from "./Pages/RefundPage";
import Header from "./Header/Header";
import Nav from "./Header/Nav";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
	return (
		<div>
			{/* <Routes> */}
				<Header />
			{/* </Routes> */}
			<Routes>
				<Route path="/" element={<RefundPage/>} />

				<Route path="/miao" element={<h1>Hi</h1>} />
			</Routes>
		</div>
	);
}

export default App;