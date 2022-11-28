import { useState } from "react";
import Form, { tableRefund } from "../formRefund/Form";

export default function TableRefund() {
	// const [ table, handleTable ] = useState(tableRefund);


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
			{/* {table.length < 1 ? 
			<tr>
				<td colSpan={4}> Insert some data</td>
			</tr>:
			table.map((tableRefund) => (
            <tr key={tableRefund.id}>
                <td>{tableRefund.date}</td>
                <td>{tableRefund.type}</td>
                <td>{tableRefund.amount}</td>
                <td>{tableRefund.ticket}</td>
                <td></td>
                <td></td>
                </tr>
        ))}			 */}
			</tbody>
		</table>

	);
}
