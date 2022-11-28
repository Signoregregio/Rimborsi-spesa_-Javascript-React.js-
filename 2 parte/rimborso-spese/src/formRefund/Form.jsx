import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

const tableRefund = [];

export default function Form(prop) {
	const { register, handleSubmit } = useForm([]);
	const [ array, setArray ] = useState([]);
	
	function handleAddFormSubmit(data) {
		console.log(register)
		console.log(data)
		data["id"] = nanoid();
		data.ticket === true ? (data.ticket = "Sì") : (data.ticket = "No");
		tableRefund.push(data)
		setArray(tableRefund)
		console.log(array);
		prop.func(array)
		// table = array;
;
	}


	
	return (
		<form onSubmit={handleSubmit((data) => handleAddFormSubmit(data))}>
			<h1>Nuovo rimborso</h1>
			<div className="formBox">
				<label>Mese :</label>
				<input name="mese" type="month" value={"2022-10"}{...register("month")} max={dayjs().format("YYYY-MM")} />
			</div>

			<div className="formBox">
				<label>Tipo:</label>
				<select name="Tipo" {...register("type")}>
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
				<input type="date" name="date" value={"2022-10-31"} {...register("date")} max={dayjs().format("YYYY-MM-DD")} />
			</div>

			<div className="formBox">
				<label>Importo richiesto:</label>
				<input name="Importo" value={42}{...register("amount", { pattern: /^[+]?\d+(\.\d{1,2})?$/ })} />
			</div>

			<div className="formBox">
				<label>Ricevuta?</label>
				<input type="checkbox" name="Ricevuta" {...register("ticket")} />
			</div>
			<input type="submit" />
		</form>
	);
}

export { tableRefund};
