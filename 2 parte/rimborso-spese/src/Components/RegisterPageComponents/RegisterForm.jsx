import { useState } from "react";
import "./registerForm.css";
import { hasRegistered, registerNewUser } from "../../API/fetchFunc";

export default function RegisterForm({setDisabled}) {
	const [formElements, getFormElements] = useState({
		createdAt: "",
		name: "",
		username: "",
		role: "",
		password: "",
		passwordRepeat: "",
	});


	function handleFormChange(event) {

		const fieldName = event.target.name;
		const fieldValue = event.target.value;
		console.log()
		const newElement = {...formElements}
		newElement[fieldName] = fieldValue;

		getFormElements(newElement);
	}

	async function handleFormSubmit(event){
		event.preventDefault();
		// //user already taken?
		setDisabled(true)
		if(formElements.password !== formElements.passwordRepeat){
			//errore le password non coincidono
			setDisabled(false)
			return console.log("Password non coincidono")
		}
		if(await hasRegistered(formElements.username)){
			//set div error
			setDisabled(false)
			return console.log("User already taken")
		}	
		let date = new Date;
		console.log("Registrazione utente " + formElements.username + " con password " + formElements.password + " in data: " + date)
		const userData = {...formElements}
		userData['createdAt'] = date; 
		await registerNewUser(userData);
		setDisabled(false)
	}
	
	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Inserisci i dati: </h2>
				<div className="inputLogin">
					<label>Username:</label>
					<input name="username" type="text" className="inputUsername" onChange={handleFormChange} />
				</div>
				<div className="inputLogin">
					<label>Name:</label>
					<input name="name" type="text" className="inputUsername" onChange={handleFormChange} />
				</div>
				<div className="inputLogin">
					<label>Ruolo :</label>
					<select name="role" onChange={handleFormChange} defaultValue={"Inserire il rsuolo"}>
						<option disabled>Inserire il ruolo</option>
						<option value="Segretaria">Segretario/a</option>
						<option value="Dipendente">Dipendente</option>
						<option value="Manager">Manager</option>
						<option value="Presidente">Presidente</option>
					</select>
				</div>
				<div className="inputLogin">
					<label>Password</label>
					<input
						name="password"
						type="password"
						className="inputPassword"
						placeholder="Password..."
						onChange={handleFormChange}
					/>
				</div>
				<div className="inputLogin">
					<label>Repeat password</label>
					<input
						name="passwordRepeat"
						type="password"
						className="inputPassword"
						placeholder="Password..."
						onChange={handleFormChange}
					/>
				</div>
				<button className="loginBtn" onClick={handleFormSubmit}>Register</button>
			</div>
		</div>
	);
}
