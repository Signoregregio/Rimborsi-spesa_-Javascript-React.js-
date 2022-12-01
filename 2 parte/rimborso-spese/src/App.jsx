import "./index.css";
import RefundPage from "./Pages/RefundPage";
import Header from "./Header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import { useState, useMemo } from "react";
import { getRole, storageRimborsoMax } from "./API/fetchFunc";

function App() {
	const [user, setUser] = useState({
		id: "",
		role: "",
	});
	let navigate = useNavigate();
	const value = useMemo(() => ({ user }), [user]);

	async function handleUsernameChange(event) {
		event.preventDefault();
		const fieldValue = event.target.value;
		let role = await getRole(fieldValue);
		console.log(role);
		setUser({ id: fieldValue, role: role });
	}

	async function login() {
		if (user.role) {
			console.log(user)
			sessionStorage.setItem("userRole", user.role);
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

	// id, ruolo usecontext
	return (
		<div>
				<Header />
				<Routes>
					<Route path="/" element={<LoginPage handleUsernameChange={handleUsernameChange} login={login} />} />
					<Route path="/refundpage/:id/:month" element={<RefundPage />} />
					<Route path="/home/:id" element={<HomePage />} />
				</Routes>
		</div>
	);
}

export default App;
