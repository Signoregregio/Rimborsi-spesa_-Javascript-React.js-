import { Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import FilterRow from "./FilterRow";
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
	handleFilterChange,
	filteredRows,
}) {
	let filterEvent = 0;
	let rowsToPrint = filterEvent === 0 ? filteredRows : rows;
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
					<FilterRow key={2} handleFilterChange={handleFilterChange} />
				</thead>
				<tbody>
					{rowsToPrint.map((row) => (
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
					<tr key={3}>
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
