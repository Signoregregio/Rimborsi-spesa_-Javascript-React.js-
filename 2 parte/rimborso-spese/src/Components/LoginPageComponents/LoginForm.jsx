import "./loginForm.css";

export default function LoginForm({handleUsernameChange, login}) {
	

	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Inserisci le credenziali: </h2>
				<div className="inputLogin">
					<label>Username:</label>
					<select name="id" className="inputUsername" required autoFocus defaultValue={"Username"} onChange={handleUsernameChange}>
						<option disabled>Username</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="24">24</option>
						<option value="25">25</option>
						<option value="26">26</option>
					</select>
				</div>
				<div className="inputLogin">
					<label>Password</label>
					<input name="password" type="password" className="inputPassword" placeholder="Password..." onChange={handleUsernameChange}/>
				</div>
                <button className="loginBtn" onClick={() => {login()}}>Login</button>
			</div>
		</div>
	);
}
