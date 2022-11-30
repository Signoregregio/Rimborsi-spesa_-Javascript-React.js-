import dayjs from "dayjs";

export default function Form({ handleAddFormChange, handleAddFormSubmit, formObject }) {

	
	return (
		<form onSubmit={handleAddFormSubmit}>
			{/* <div className="formBox">
				<label>Mese :</label>
				<input name="month" type="month"  max={dayjs().format("YYYY-MM")} onChange={handleAddFormChange} />
			</div> */}

			<div className="formBox">
				<label>Tipo:</label>
				<select name="type" defaultValue={"Inserire il tipo"} onChange={handleAddFormChange}>
					<option   disabled>
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

			<div className="formBox">Scontrino? <br></br>
			<label> Sì </label><input type="radio" className="radioBtn" value="Sì" name="ticket" onChange={handleAddFormChange}/><br />
        	<label> No </label><input type="radio" className="radioBtn" value="No" name="ticket" onChange={handleAddFormChange}/>

			</div>
			<div className="divButton">
				<button type="submit" id="submitButton">
					Submit
				</button>
			</div>
		</form>
	);
}
