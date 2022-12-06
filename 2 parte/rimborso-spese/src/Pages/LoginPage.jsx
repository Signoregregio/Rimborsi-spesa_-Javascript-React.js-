import LoginForm from "../Components/LoginPageComponents/LoginForm";
import { useState } from "react";
import { getRole, hasRegistered } from "../API/fetchFunc";
import { useNavigate } from "react-router-dom";

export default function LoginPage({disabled, setDisabled}){
    
    const [user, setUser] = useState({
		id: "5",
		password: "5",
	});
	const [wrongData, setWrongData] = useState(false);
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
        setDisabled(true)
		let idHasRegistered = await hasRegistered(user.id);
		if (idHasRegistered) {
			let role = await getRole(user.id);
			console.log(user.id + " - " + role);
			sessionStorage.setItem("userRole", role);
			sessionStorage.setItem("userId", user.id);
			navigate(`/home/${user.id}`);
            setDisabled(false)
		}

		console.log("entro");
		setWrongData(true);
		setUser({
			id: "",
			password: "",
		});
        setDisabled(false)
	}

    return (
        <LoginForm handleUsernameChange={handleUsernameChange} login={login} wrongData={wrongData} disabled={disabled} />
    )
}