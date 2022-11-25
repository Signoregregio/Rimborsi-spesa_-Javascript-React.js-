import Form, {tableRefund} from "../formRefund/Form";

export default function TableRefund() {
	return (
		<table className="tableForm">
			<thead>
				<th>Data</th>
				<th>Tipo</th>
				<th>Importo</th>
				<th>Ricevuta</th>
				<th>Stato</th>
				<th>Importo dovuto</th>
				<th>Filters</th>
			</thead>
            <tbody>
                <td>{tableRefund.id}</td>
            </tbody>
		</table>
	);
}
