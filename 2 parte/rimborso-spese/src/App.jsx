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


let id;

function App() {
	const [user, setUser] = useState({
		id: "",
		password: "",
	});
	let navigate = useNavigate();

	function handleUsernameChange(event) {
		event.preventDefault();
		const fieldValue = event.target.value;
		const fieldName = event.target.name;
		const newData = { ...user };
		newData[fieldName] = fieldValue; 

		setUser(newData);

	}

	async function login() {
		let role = await getRole(user.id);
		if (role) {
			console.log(user.id + " - " + role)
			sessionStorage.setItem("userRole", role);
			sessionStorage.setItem("userId", user.id);
			navigate(`/home/${user.id}`);
		}
		if (!user.role) {
			setUser({
				id: "",
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
					<Route path="/refundpage/:id/:month" element={<RefundPage />} />
					<Route path="/home/:id" element={<HomePage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
		</div>
	);
}

export default App;
