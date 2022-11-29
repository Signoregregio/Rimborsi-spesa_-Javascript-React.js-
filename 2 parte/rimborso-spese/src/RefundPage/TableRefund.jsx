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
}) {
	return (
		<form onSubmit={handleEditFormSubmit}>
			<table id="tableForm">
				<thead>
					<tr>
						<th>Data</th>
						<th>Tipo</th>
						<th>Importo</th>
						<th>Ricevuta</th>
						<th>Stato</th>
						<th>Importo dovuto</th>
						<th>Filters</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<Fragment>
							{editRowId === row.id ? (
								<EditableRow handleEditFormChange={handleEditFormChange} editFormData={editFormData} />
							) : (
								<ReadOnlyRow row={row} handleEditClick={handleEditClick} />
							)}
						</Fragment>
					))}
				</tbody>
				<tfoot>
					<tr>
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
