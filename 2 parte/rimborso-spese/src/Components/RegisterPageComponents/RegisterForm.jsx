import "./registerForm.css";


export default function RegisterForm(){
    return(
        <div className="container">
			<div className="divFormMonth">
				<h2> Non funziona, to do: </h2>
				<div className="inputLogin">
					<label>Choose an username:</label>
					<input type="text" className="inputUsername" />
				</div>
				<div className="inputLogin">
					<label>Password</label>
					<input type="password" className="inputPassword" placeholder="Password..."/>
				</div>
				<div className="inputLogin">
					<label>Repeat password</label>
					<input type="password" className="inputPassword" placeholder="Password..."/>
				</div>
                <button className="loginBtn" >Register</button>
			</div>
		</div>
    )
}