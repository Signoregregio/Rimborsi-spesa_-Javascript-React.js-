import Form from "./RefundPage/Form";
import TableRefund from "./RefundPage/TableRefund";
import TitleRefundPage from "./Header/TitleRefundPage";
import Nav from "./Header/Nav";
import { useState } from "react";
import { nanoid } from "nanoid";


export default function RefundPage() {
	const [rows, setRows] = useState([]);
	const [formObject, setFormObject] = useState({
		month: "",
		type: "",
		dateRefund: "",
		amount: "",
		ticket: "",
	});

	const handleAddFormChange = (event) => {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...formObject };
		newFormData[fieldName] = fieldValue;

		setFormObject(newFormData);
	};

	function handleAddFormSubmit(event) {
		event.preventDefault();

		const newRow = {
			id: nanoid(),
			type: formObject.type,
			dateRefund: formObject.dateRefund,
			amount: formObject.amount,
			ticket: formObject.ticket === false ? (formObject.ticket = "Sì") : (formObject.ticket = "No"),
		};
		const newRows = [...rows, newRow];
		setRows(newRows);
		console.log(newRow);
		console.log(newRows);
		console.log(rows);
	}


	return (
		<div className="flexbox">
			<div className="divHeader">
				<header>
				<TitleRefundPage dateMonth = { formObject.dateRefund }/>
				<Nav/>
				</header>
			</div>
			<div id="leftSide">
				<Form
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
					formObject={formObject}
				/>
			</div>
			<div id="rightSide">
				<div className="table">
					<TableRefund rows={rows} />
				</div>
			</div>
		</div>
	);
}
