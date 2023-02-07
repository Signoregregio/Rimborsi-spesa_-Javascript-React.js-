import "./homePage.css";
import {useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function FormMonth() {
	let navigate = useNavigate()
	const [month, setMonth] = useState("")
	let { id } = useParams()
	
	function handleMonthChange(event) {
		event.preventDefault();
		const fieldValue = event.target.value;
		setMonth(fieldValue);
		console.log(fieldValue);
	}
	return (
		<div className="container">
			<div className="divFormMonth">
				<h2> Scegli il mese </h2>
				<form>
					<div className="formbox divInputMonth">
						<input type="month" className="inputMonth" onChange={handleMonthChange}></input>
					</div>
					<button type="submit" onClick={() => {navigate(`/refundpage/${id}/${month}`)}}> Confirm</button>
				</form>
			</div>
		</div>
	);
}