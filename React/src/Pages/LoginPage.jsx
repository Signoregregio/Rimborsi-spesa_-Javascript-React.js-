import LoginForm from "../Components/LoginPageComponents/LoginForm";
import { useState } from "react";
import { getRole, hasRegistered, getId } from "../API/fetchFunc";
import { useNavigate } from "react-router-dom";

export default function LoginPage({disabled, setDisabled}){
    
    const [user, setUser] = useState({
		username: "Fabio",
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
		let userHasRegistered = await hasRegistered(user);
		if (userHasRegistered) {
			let id = await getId(user)
			console.log(id)
			let role = await getRole(id);
			console.log(user.username + " - " + role + " - " + id);
			sessionStorage.setItem("userRole", role);
			sessionStorage.setItem("userId", id);
			navigate(`/home/${id}`);
            setDisabled(false)
		}

		console.log("entro");
		setWrongData(true);
		setUser({
			username: "",
			password: "",
		});
        setDisabled(false)
	}

    return (
        <LoginForm handleUsernameChange={handleUsernameChange} login={login} wrongData={wrongData} disabled={disabled} />
    )
}