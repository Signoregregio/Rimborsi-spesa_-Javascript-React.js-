import dayjs from "dayjs";
import { useState } from "react";
import Select from 'react-select'

export default function Form({ handleAddFormChange, handleAddFormSubmit, formObject }) {
	const refundTypes = [
		{ value: "Taxi", label: "Taxi" },
		{ value: "Vitto", label: "Vitto" },
		{ value: "Hotel", label: "Hotel" },
		{ value: "Treno", label: "Treno" },
	];


	return (
		<form onSubmit={handleAddFormSubmit}>
			{/* <div className="formBox">
				<label>Mese :</label>
				<input name="month" type="month"  max={dayjs().format("YYYY-MM")} onChange={handleAddFormChange} />
			</div> */}

			<div className="formBox">
				<label>Tipo:</label>
				<Select className="Select" placeholder="Inserire il tipo" options={refundTypes} onChange={handleAddFormChange}/>
			</div>

			<div className="formBox">
				<label>Data:</label>
				<input
					type="date"
					name="dateRefund"
					max={dayjs().format("YYYY-MM-DD")}
					onChange={handleAddFormChange}
				/>
			</div>

			<div className="formBox">
				<label>Importo richiesto:</label>
				<input name="amount" onChange={handleAddFormChange} />
			</div>

			<div className="formBox">
				<label>Ricevuta?</label>
				<input type="checkbox" name="ticket" onChange={handleAddFormChange} />
			</div>
			<div className="divButton">
				<button type="submit" id="submitButton">
					Submit
				</button>
			</div>
		</form>
	);
}
