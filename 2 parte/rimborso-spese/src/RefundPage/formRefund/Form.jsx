import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useState } from "react";

const tableRefund = [];

export default function Form(props) {
	// const [rows, setRows] = useState([])
	const [addFormData, setAddFormData] = useState({
		month: "",
		type: "",
		dateRefund: "",
		amount: "",
		ticket: "",
	})

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;

		const newFormData = {...addFormData}
		newFormData[fieldName] = fieldValue;

		setAddFormData(newFormData)
	}
	
	function handleAddFormSubmit(event) {
		event.preventDefault();

		const newRow = {
			id: nanoid(),
			type: addFormData.type,
			dateRefund: addFormData.dateRefund,
			amount: addFormData.amount,
			ticket: addFormData.ticket === false ? addFormData.ticket = "Sì" : addFormData.ticket = "No",
		}
		// const newRows = [...rows, newRow]
		// setRows(newRows)
		console.log(newRow)
		// console.log(newRows)
		props.func(newRow)
	}

	return (
		<form onSubmit={handleAddFormSubmit} >
			<h1>Nuovo rimborso</h1>
			{/* <div className="formBox">
				<label>Mese :</label>
				<input name="month" type="month"  max={dayjs().format("YYYY-MM")} onChange={handleAddFormChange} />
			</div> */}

			<div className="formBox">
				<label>Tipo:</label>
				<select name="type" onChange={handleAddFormChange}>
					<option value="" defaultValue={"Inserire il tipo"} disabled>
						Inserire il tipo
					</option>
					<option value="Taxi">Taxi</option>
					<option value="Vitto">Vitto</option>
					<option value="Hotel">Hotel</option>
					<option value="Treno">Treno</option>
				</select>
			</div>

			<div className="formBox">
				<label>Data:</label>
				<input type="date" name="dateRefund"  max={dayjs().format("YYYY-MM-DD")} onChange={handleAddFormChange} />
			</div>

			<div className="formBox">
				<label>Importo richiesto:</label>
				<input name="amount" onChange={handleAddFormChange} />
			</div>

			<div className="formBox">
				<label>Ricevuta?</label>
				<input type="checkbox" name="ticket" onChange={handleAddFormChange} />
			</div>
			<input type="submit" />
		</form>
	);
}

export { tableRefund };
