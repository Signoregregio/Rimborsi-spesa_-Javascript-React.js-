import { Fragment } from "react";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

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
	sortingBy
}) {
	return (
		<form onSubmit={handleEditFormSubmit}>
			<table id="tableForm">
				<thead>
					<tr key={1}>
						<th onClick={sortingBy}>Data</th>
						<th onClick={sortingBy}>Tipo</th>
						<th onClick={sortingBy}>Importo</th>
						<th onClick={sortingBy}>Ricevuta</th>
						<th onClick={sortingBy}>Stato</th>
						<th onClick={sortingBy}>Importo dovuto</th>
						<th>Filters</th>
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
