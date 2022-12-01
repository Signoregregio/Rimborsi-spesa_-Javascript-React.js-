import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";

export default function LoginForm() {
    let navigate = useNavigate();
    const [username, setUsername] = useState("")
    function handleUsernameChange(event){
        event.preventDefault();
        const fieldValue = event.target.value
        setUsername(fieldValue);
    }
    
	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Inserisci le credenziali: </h2>
				<div className="inputLogin">
					<label>Username:</label>
					<select className="inputUsername" required autoFocus defaultValue={"Username"} onChange={handleUsernameChange}>
						<option disabled>Username</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
						<option value="7">7</option>
						<option value="8">8</option>
						<option value="9">9</option>
						<option value="10">10</option>
					</select>
				</div>
				<div className="inputLogin">
					<label>Password</label>
					<input type="text" className="inputPassword" placeholder="Password..."/>
				</div>
                <button className="loginBtn" onClick={() => {navigate(`/home/${username}`)}}>Login</button>
			</div>
		</div>
	);
}
