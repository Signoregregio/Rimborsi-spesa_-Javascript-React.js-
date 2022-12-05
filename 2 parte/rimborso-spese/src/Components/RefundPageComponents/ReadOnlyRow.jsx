export default function ReadOnlyRow({ row, handleEditClick, handleDeleteClick, disabled }) {
	return (
		<tr >
			<td>{row.dateRefund}</td>
			<td>{row.type}</td>
			<td>{row.amount}</td>
			<td>{row.ticket}</td>
			<td>{row.state}</td>
			<td>{row.refund}</td>
			<td>
				<button className="editButton" disabled={disabled} type="button" onClick={(event) => handleEditClick(event, row)}>
					Edit
				</button>
                <button className="editButton" disabled={disabled} type="button" onClick={()=> handleDeleteClick(row.primaryKey)}>Delete</button>
			</td>
		</tr>
	);
}
