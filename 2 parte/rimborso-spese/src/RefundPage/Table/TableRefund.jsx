import { useState } from "react";
import Form, { tableRefund } from "../formRefund/Form";

export default function TableRefund(props) {
	const [refund, setRefund] = useState([])

	const work = (data) => {
		console.log("Sono in TableRefund")
		console.log(data)
		const newRefund = [...refund, data]
		setRefund(newRefund)
		console.log(refund)
	}
	
	return (
		<div>
			<div>
				<Form func={work}></Form>
			</div>
			<div>
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
						{refund.map((tableRefund) => (
							<tr key={tableRefund.id}>
								<td>{tableRefund.dateRefund}</td>
								<td>{tableRefund.type}</td>
								<td>{tableRefund.amount}</td>
								<td>{tableRefund.ticket}</td>
								<td></td>
								<td></td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
