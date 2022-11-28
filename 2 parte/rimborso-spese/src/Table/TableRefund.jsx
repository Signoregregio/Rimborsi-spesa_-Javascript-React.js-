import { useEffect, useState } from "react";
import Form, { tableRefund } from "../formRefund/Form";

export default function TableRefund(props) {
	// const [ table, handleArray ] = useState(Form.table);
	useEffect(() => {
		console.log("ciao in tableRefund è cambiato props")

	}, [props])

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
			{/* {props.length < 1 ? 
			<tr>
				<td colSpan={8}> Insert some data</td>
			</tr>:
			props.map((tableRefund) => (
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
