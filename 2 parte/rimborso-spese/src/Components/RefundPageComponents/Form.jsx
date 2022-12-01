import dayjs from "dayjs";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Form({ handleAddFormChange, handleAddFormSubmit }) {
	let { month } = useParams();
	console.log(month);
	const inputDate = useRef();
	let { id } = useParams();

	console.log(id, month);

	useEffect(() => {
		let maxDate = "";

		let currentMonth = dayjs().format("YYYY-MM");
		if (currentMonth === month) {
			maxDate = dayjs().format("YYYY-MM-DD");
		}
		if (currentMonth !== month) {
			 let daysInMonth = dayjs(`${month}-01`).daysInMonth();
			maxDate = month + "-" + daysInMonth;
		}
		inputDate.current.setAttribute("max", maxDate);
		console.log(maxDate);
	}, [month]);

	return (
		<form onSubmit={handleAddFormSubmit}>
			{/* <div className="formBox">
				<label>Mese :</label>
				<input name="month" type="month"  max={dayjs().format("YYYY-MM")} onChange={handleAddFormChange} />
			</div> */}

			<div className="formBox">
				<label>Tipo:</label>
				<select name="type" defaultValue={"Inserire il tipo"} onChange={handleAddFormChange}>
					<option disabled>Inserire il tipo</option>
					<option value="Taxi">Taxi</option>
					<option value="Vitto">Vitto</option>
					<option value="Hotel">Hotel</option>
					<option value="Treno">Treno</option>
				</select>
			</div>

			<div className="formBox">
				<label>Data:</label>
				<input
					type="date"
					name="dateRefund"
					ref={inputDate}
					min={`${month}-01`}
					onChange={handleAddFormChange}
				/>
			</div>

			<div className="formBox">
				<label>Importo richiesto:</label>
				<input name="amount" onChange={handleAddFormChange} placeholder="Importo richiesto..." />
			</div>

			<div className="formBox">
				Scontrino? <br></br>
				<label> Sì </label>
				<input type="radio" className="radioBtn" value="Sì" name="ticket" onChange={handleAddFormChange} />
				<br />
				<label> No </label>
				<input type="radio" className="radioBtn" value="No" name="ticket" onChange={handleAddFormChange} />
			</div>
			<div className="divButton">
				<button type="submit" id="submitButton">
					Submit
				</button>
			</div>
		</form>
	);
}
