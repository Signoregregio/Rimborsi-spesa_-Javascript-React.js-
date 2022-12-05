import { useEffect, useRef } from "react";
import { rangeDate } from "./Form";

export default function FilterRow({ handleFilterChange }) {
	const inputDateFilter = useRef();
	useEffect(() => {
		// let rangeDate = getMinMaxDate(month);
		inputDateFilter.current.setAttribute("max", rangeDate.max);
		inputDateFilter.current.setAttribute("min", rangeDate.min);
	}, [rangeDate]);

	return (
		<tr>
			<th>
				<input
                name="date"
					type="date"
					className="inputFilter"
					placeholder="filtra per giorno..."
					ref={inputDateFilter}
					onChange={handleFilterChange}
				/>
			</th>
			<th>
				<select name="type" defaultValue={"per tipo..."} onChange={handleFilterChange} >
					<option disabled>per tipo...</option>
					<option value=""></option>
					<option value="Taxi">Taxi</option>
					<option value="Vitto">Vitto</option>
					<option value="Hotel">Hotel</option>
					<option value="Treno">Treno</option>
				</select>
			</th>
			<th>
				<input name="amountMin" type="number" className="inputFilter" placeholder="Min" onChange={handleFilterChange} />
				<input name="amountMax" type="number" className="inputFilter" placeholder="Max" onChange={handleFilterChange} />
			</th>
			<th>
				<select name="ticket" defaultValue={"Sì o No"} onChange={handleFilterChange}>
					<option disabled>Sì o No...</option>
					<option value=""></option>
					<option value="Sì">Sì</option>
					<option value="No">No</option>
				</select>
			</th>
			<th>
				<select name="state" defaultValue={"Approvazione..."} onChange={handleFilterChange}>
					<option disabled>Approvazione...</option>
					<option value=""></option>
					<option value="Approvata">Approvata</option>
					<option value="Non approvata">Non approvata</option>
				</select>
			</th>
			<th>
				<input name="refundMin" type="number" className="inputFilter" placeholder="Min" onChange={handleFilterChange} />
				<input name="refundMax" type="number" className="inputFilter" placeholder="Max" onChange={handleFilterChange} />
			</th>
			<th></th>
		</tr>
	);
}
