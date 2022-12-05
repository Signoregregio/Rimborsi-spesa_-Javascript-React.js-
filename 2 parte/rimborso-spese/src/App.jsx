// register & Loading spinner & Month table 


import "./index.css";
import RefundPage from "./Pages/RefundPage";
import Header from "./Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { useState } from "react";
import { getRole } from "./API/fetchFunc";
import RegisterPage from "./Pages/RegisterPage";

function App() {
	const [user, setUser] = useState({
		primaryKey: "",
		role: "",
	});
	let navigate = useNavigate();

	async function handleUsernameChange(event) {
		event.preventDefault();
		const fieldValue = event.target.value;
		let role = await getRole(fieldValue);
		console.log(role);
		setUser({ primaryKey: fieldValue, role: role });
	}

	async function login() {
		if (user.role) {
			console.log(user)
			sessionStorage.setItem("userRole", user.role);
			sessionStorage.setItem("userId", user.primaryKey);
			navigate(`/home/${user.primaryKey}`);
		}
		if (!user.role) {
			setUser({
				primaryKey: "",
				role: "",
			});
		}
	}
	// funziona che mi controlla se esiste l'id, e se c'è me lo salva in useContext e lo setta true

	return (
		<div>
				<Header />
				<Routes>
					<Route path="/" element={<LoginPage handleUsernameChange={handleUsernameChange} login={login} />} />
					<Route path="/refundpage/:primaryKey/:month" element={<RefundPage />} />
					<Route path="/home/:primaryKey" element={<HomePage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
		</div>
	);
}

export default App;
