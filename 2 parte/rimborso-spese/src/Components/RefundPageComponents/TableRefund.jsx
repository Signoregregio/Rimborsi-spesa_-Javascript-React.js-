import { Fragment, useRef, useEffect } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import {rangeDate} from "./Form";
export default function TableRefund({
	rows,
	editRowId,
	handleEditClick,
	handleEditFormChange,
	editFormData,
	handleEditFormSubmit,
	handleDeleteClick,
	handleCancelClick,
	disabled,
	sortingBy,
	sortBy,
}) {
	const inputDateFilter = useRef()
	useEffect(() => {
		// let rangeDate = getMinMaxDate(month);
		inputDateFilter.current.setAttribute("max", rangeDate.max);
		inputDateFilter.current.setAttribute("min", rangeDate.min);
	}, [rangeDate]);

	return (
		<form onSubmit={handleEditFormSubmit}>
			<table id="tableForm">
				<thead>
					<tr key={1}>
						<th onClick={sortingBy}>
							{sortBy.type === 0 ? (sortBy.asc === true ? "Data △" : "Data ▽") : "Data"}
						</th>
						<th onClick={sortingBy}>
							{sortBy.type === 1 ? (sortBy.asc === true ? "Tipo △" : "Tipo ▽") : "Tipo"}
						</th>
						<th onClick={sortingBy}>
							{sortBy.type === 2 ? (sortBy.asc === true ? "Importo △" : "Importo ▽") : "Importo"}
						</th>
						<th onClick={sortingBy}>
							{sortBy.type === 3 ? (sortBy.asc === true ? "Ricevuta △" : "Ricevuta ▽") : "Ricevuta"}
						</th>
						<th onClick={sortingBy}>
							{sortBy.type === 4 ? (sortBy.asc === true ? "Stato △" : "Stato ▽") : "Stato"}
						</th>
						<th onClick={sortingBy}>
							{sortBy.type === 5
								? sortBy.asc === true
									? "Importo Dovuto △"
									: "Importo Dovuto ▽"
								: "Importo Dovuto"}
						</th>
						<th>Filters</th>
					</tr>
					<tr>
						<th>
							
							<input type="date" className="inputFilter" placeholder="filtra per giorno..." ref={inputDateFilter} />
						</th>
						<th>
							<input type="text" className="inputFilter" placeholder="filtra per giorno..." />
						</th>
						<th>
							<input type="text" className="inputFilter" placeholder="filtra per giorno..." />
						</th>
						<th>
							<input type="text" className="inputFilter" placeholder="filtra per giorno..." />
						</th>
						<th>
							<input type="text" className="inputFilter" placeholder="filtra per giorno..." />
						</th>
						<th>
							<input type="text" className="inputFilter" placeholder="filtra per giorno..." />
						</th>
						<th>
							<input type="text" className="inputFilter" placeholder="filtra per giorno..." />
						</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<Fragment key={row.primaryKey}>
							{editRowId === row.primaryKey ? (
								<EditableRow
									handleEditFormChange={handleEditFormChange}
									editFormData={editFormData}
									handleCancelClick={handleCancelClick}
								/>
							) : (
								<ReadOnlyRow
									row={row}
									handleEditClick={handleEditClick}
									handleDeleteClick={handleDeleteClick}
									disabled={disabled}
								/>
							)}
						</Fragment>
					))}
				</tbody>
				<tfoot>
					<tr key={2}>
						<td colSpan="4"></td>
						<td>IMPORTO TOTALE :</td>
						<td>{rows.reduce((accumulator, currentValue) => accumulator + currentValue.refund, 0)}</td>
						<td></td>
					</tr>
				</tfoot>
			</table>
		</form>
	);
}
