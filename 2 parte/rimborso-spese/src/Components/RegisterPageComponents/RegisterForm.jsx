import { useState } from "react";
import "./registerForm.css";

export default function RegisterForm() {
	const [formElements, getFormElements] = useState({
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

	function handleFormSubmit(event){
		event.preventDefault();

		console.log(formElements.role)
	}
	
	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Inserisci i dati: </h2>
				<div className="inputLogin">
					<label>Nome utente:</label>
					<input name="username" type="text" className="inputUsername" onChange={handleFormChange} />
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
				<button className="loginBtn" onSubmit={handleFormSubmit}>Register</button>
			</div>
		</div>
	);
}
