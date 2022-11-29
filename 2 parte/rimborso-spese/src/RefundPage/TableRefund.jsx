export default function TableRefund({ rows }) {
	return (
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
					<tr key={row.id}>
						<td>{row.dateRefund}</td>
						<td>{row.type}</td>
						<td>{row.amount}</td>
						<td>{row.ticket}</td>
						<td></td>
						<td></td>
						<td></td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr>
					<td colSpan="4"></td>
					<td>IMPORTO TOTALE :</td>
					<td id="inputTotale"></td>
					<td></td>
				</tr>
			</tfoot>
		</table>
	);
}
