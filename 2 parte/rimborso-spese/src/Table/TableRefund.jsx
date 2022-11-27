import Form, { tableRefund } from "../formRefund/Form";

export default function TableRefund() {
	return (
		<table className="tableForm">
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
				{tableRefund.map((tableRefund) => (
					<tr>
						<td>{tableRefund.date}</td>
						<td>{tableRefund.type}</td>
						<td>{tableRefund.amount}</td>
						<td>{tableRefund.ticket}</td>
						<td></td>
						<td></td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
