import "./index.css";
import Form from "./formRefund/Form";
import TableRefund from "./Table/TableRefund";
import { useState } from "react";

function App() {
	const [refund, setRefund ] = useState([])
	
	const works = (data) => {
		console.log("wowowo")
		console.log(data);
		setRefund(data);
		console.log(refund);
	}

	
	return (
		<div>
			<Form func={works}></Form>
			<TableRefund trows={refund}></TableRefund>
		</div>
	);
}

export default App;
