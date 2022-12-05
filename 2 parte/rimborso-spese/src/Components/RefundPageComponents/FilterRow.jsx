import { useEffect, useRef } from "react";
import { rangeDate } from "./Form";

export default function FilterRow() {
    const inputDateFilter = useRef();
	useEffect (() => {
		// let rangeDate = getMinMaxDate(month);
		inputDateFilter.current.setAttribute("max", rangeDate.max);
		inputDateFilter.current.setAttribute("min", rangeDate.min);
	}, [rangeDate]);
    
	return (
		<tr>
			<th>
				<input type="date" className="inputFilter" placeholder="filtra per giorno..." ref={inputDateFilter} />
			</th>
			<th>
				<select defaultValue={"per tipo..."}>
					<option disabled>per tipo...</option>
					<option value=""></option>
					<option value="Taxi">Taxi</option>
					<option value="Vitto">Vitto</option>
					<option value="Hotel">Hotel</option>
					<option value="Treno">Treno</option>
				</select>
			</th>
			<th>
				<input type="number" className="inputFilter" placeholder="Min" />
				<input type="number" className="inputFilter" placeholder="Max" />
			</th>
			<th>
				<select defaultValue={"Sì o No"}>
					<option disabled>Sì o No...</option>
					<option value=""></option>
					<option value="Sì">Sì</option>
					<option value="No">No</option>
				</select>
			</th>
			<th>
				<select defaultValue={"Approvata?"}>
					<option disabled>Approvazione...</option>
					<option value=""></option>
					<option value="Approvvata">Approvvata</option>
					<option value="Non approvata">Non approvata</option>
				</select>
			</th>
			<th>
				<input type="number" className="inputFilter" placeholder="Min" />
				<input type="number" className="inputFilter" placeholder="Max" />
			</th>
			<th></th>
		</tr>
	);
}
