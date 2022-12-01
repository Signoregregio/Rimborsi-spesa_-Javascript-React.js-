import "./index.css";
import RefundPage from "./Pages/RefundPage";
import Header from "./Header/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

function App() {
	return (
		<div >
			<Header />
			<Routes>
				<Route path="/refundpage/:id/:month" element={<RefundPage />} />


				<Route path="/home/:id" element={<HomePage />} />
				<Route path="/" element={<LoginPage />} />
			</Routes>
		</div>
	);
}

export default App;
