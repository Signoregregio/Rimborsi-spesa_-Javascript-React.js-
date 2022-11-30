export default function ReadOnlyRow({ row, handleEditClick, handleDeleteClick }) {
	return (
		<tr key={row.id}>
			<td>{row.dateRefund}</td>
			<td>{row.type}</td>
			<td>{row.amount}</td>
			<td>{row.ticket}</td>
			<td>{row.state}</td>
			<td>{row.refund}</td>
			<td>
				<button className="editButton" type="button" onClick={(event) => handleEditClick(event, row)}>
					Edit
				</button>
                <button className="editButton" type="button" onClick={()=> handleDeleteClick(row.id)}>Delete</button>
			</td>
		</tr>
	);
}
