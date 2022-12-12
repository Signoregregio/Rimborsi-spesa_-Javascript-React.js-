import dayjs from "dayjs";
import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";


export let rangeDate = {}

function getMinMaxDate(month) {
	let maxDate;
	let currentMonth = dayjs().format("YYYY-MM");
	if (currentMonth === month) {
		maxDate = dayjs().format("YYYY-MM-DD");
	}
	if (currentMonth !== month) {
		let daysInMonth = dayjs(`${month}-01`).daysInMonth();
		maxDate = month + "-" + daysInMonth;
	}
	let rangeDate = {
		min: `${month}-01`,
		max: maxDate,
	};

	return rangeDate;
}

export default function Form({ handleAddFormChange, handleAddFormSubmit, disabled }) {
	const inputDate = useRef();
	let { month } = useParams();
	
	useEffect(() => {
		rangeDate = getMinMaxDate(month);
		inputDate.current.setAttribute("max", rangeDate.max);
		inputDate.current.setAttribute("min", rangeDate.min);
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
				<button type="submit" id="submitButton" disabled={disabled}>
					Submit
				</button>
			</div>
		</form>
	);
}
