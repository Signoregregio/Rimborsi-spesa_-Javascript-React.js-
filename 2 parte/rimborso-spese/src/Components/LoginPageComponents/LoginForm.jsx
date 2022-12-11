import { useEffect } from "react";
import "./loginForm.css";

export default function LoginForm({ handleUsernameChange, login, wrongData, disabled }) {
	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Inserisci le credenziali: </h2>
				<small>(Se non si è creato un account, refreshare e premere "Login")</small>
				{wrongData ? <small className="wrongInputs">Credenziali di accesso sbagliate.</small> : <></>}
				<div className="inputLogin">
					<label>Username:</label>
					<input
						name="username"
						className="inputUsername"
						required
						autoFocus
						placeholder="Username"
						onChange={handleUsernameChange}
					/>
				</div>
				<div className="inputLogin">
					<label>Password</label>
					<input
						name="password"
						type="password"
						className="inputPassword"
						placeholder="Password..."
						onChange={handleUsernameChange}
					/>
				</div>
				<button
					disabled={disabled}
					className="loginBtn"
					onClick={() => {
						login();
					}}
				>
					Login
				</button>
			</div>
		</div>
	);
}
