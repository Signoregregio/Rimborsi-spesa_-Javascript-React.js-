import "./index.css";
import RefundPage from "./Pages/RefundPage";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
	return (
		<div >
			<Header />
			<Routes>
				<Route path="/" element={<RefundPage />} />

				<Route path="/home" element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
