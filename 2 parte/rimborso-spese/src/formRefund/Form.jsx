import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useState } from "react";

const tableRefund = [];

export default function Form() {
	const { register, handleSubmit } = useForm(tableRefund);
	const [rows, setRows] = useState()
	const [addFormData, setAddFormData] = useState({
		month: "",
		type: "",
		dateRefund: "",
		amount: "",
		ticket: "",
	})
	
	function handleAddFormSubmit(event) {
		event.preventDefault();

		const newRow = {
			id: nanoid(),
			month: addFormData.month,
			type: addFormData.type,
			dateRefund: addFormData.dateRefund,
			amount: addFormData.amount,
			ticket: addFormData.ticket,
		}
		const newRows = [...]
	}

	return (
		<form onSubmit={handleAddFormSubmit} >
			<h1>Nuovo rimborso</h1>
			<div className="formBox">
				<label>Mese :</label>
				<input name="month" type="month"  max={dayjs().format("YYYY-MM")} />
			</div>

			<div className="formBox">
				<label>Tipo:</label>
				<select name="type" >
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
				<input type="dateRefund" name="date"  max={dayjs().format("YYYY-MM-DD")} />
			</div>

			<div className="formBox">
				<label>Importo richiesto:</label>
				<input name="amount" pattern = "/^[+]?\d+(\.\d{1,2})?$/"  />
			</div>

			<div className="formBox">
				<label>Ricevuta?</label>
				<input type="checkbox" name="ticket"  />
			</div>
			<input type="submit" />
		</form>
	);
}

export { tableRefund };
