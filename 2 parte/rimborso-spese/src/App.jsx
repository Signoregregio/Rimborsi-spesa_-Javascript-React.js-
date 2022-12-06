// register & Loading spinner & Month table

import "./index.css";
import RefundPage from "./Pages/RefundPage";
import Header from "./Header/Header";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import LoadingSpinner from "./Components/LoadingSpinner/LoadingSpinner";
import RegisterPage from "./Pages/RegisterPage";
import NotFoundPage from "./Pages/NotFoundPage";
import NotLoggedInPage from "./Pages/NotLoggedInPage";
import { useState } from "react";
import { useEffect } from "react";

function App() {
	const [disabled, setDisabled] = useState(false);
	const [hasLogged, setHasLogged] = useState(false);
	let location = useLocation();


	useEffect(() => {
		let hasId = sessionStorage.getItem("userId") !== null
		if(hasId){
			setHasLogged(true)
		}
	}, [location.pathname])

	return (
		<div>
			<Header />
			{disabled ? <LoadingSpinner /> : <></>}
			<Routes>
				<Route path="/" element={<LoginPage disabled={disabled} setDisabled={setDisabled} />} />
				<Route
					path="/refundpage/:id/:month"
					element={ hasLogged ? <RefundPage disabled={disabled} setDisabled={setDisabled} /> : <NotLoggedInPage />}
				/>
				<Route path="/home/:id" element={ hasLogged ? <HomePage setDisabled={setDisabled} /> : <NotLoggedInPage />} />
				<Route path="/register" element={<RegisterPage setDisabled={setDisabled} />} />
				<Route path="/*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;
