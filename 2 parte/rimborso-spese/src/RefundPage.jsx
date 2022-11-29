import Form from "./RefundPage/Form";
import TableRefund from "./RefundPage/TableRefund";
import TitleRefundPage from "./Header/TitleRefundPage";
import Nav from "./Header/Nav";
import { translateStatus, approveStatus, setMaxRefundable } from "./RefundPage/approvationRules";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function RefundPage() {
	const [rows, setRows] = useState([]);
	const [formObject, setFormObject] = useState({
		month: "",
		type: "",
		dateRefund: "",
		amount: 0,
		ticket: "",
		state: "",
		refund: 0,
	});

	const [editFormData, setEditFormData] = useState({
		type: "",
		dateRefund: "",
		amount: 0,
		ticket: "",
	});

	const [editRowId, setEditRowId] = useState();

	function handleAddFormChange(event) {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...formObject };
		newFormData[fieldName] = fieldValue;

		setFormObject(newFormData);
	}

	function handleEditFormChange(event) {
		event.preventDefault();

		const fieldName = event.target.getAttribute("name");
		const fieldValue = event.target.value;

		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;

		setEditFormData(newFormData);
	}

	function handleAddFormSubmit(event) {
		event.preventDefault();
		let state = translateStatus(approveStatus(formObject.ticket, formObject.amount));
		const newRow = {
			id: nanoid(),
			type: formObject.type,
			dateRefund: formObject.dateRefund,
			amount: Number(formObject.amount),
			ticket: formObject.ticket,
			state: state,
			refund: Number(setMaxRefundable(state, formObject.type, formObject.amount)),
		};
		const newRows = [...rows, newRow];
		setRows(newRows);
		console.log(newRow);
		console.log(newRows);
		console.log(rows);
	}

	function handleEditFormSubmit(event) {
		event.preventDefault();

		let state = translateStatus(approveStatus(editFormData.ticket, editFormData.amount));
		const editedRow = {
			id: editFormData.id,
			type: editFormData.type,
			dateRefund: editFormData.dateRefund,
			amount: Number(editFormData.amount),
			ticket: editFormData.ticket,
			state: state,
			refund: Number(setMaxRefundable(state, formObject.type, formObject.amount)),
		};

		const newRows = [...rows];

		const index = rows.findIndex((row) => row.id === editRowId);

		newRows[index] = editedRow;
		setRows(newRows)
		setEditRowId(null)
	}

	function handleEditClick(event, row) {
		event.preventDefault();
		setEditRowId(row.id);
		const formValues = {
			type: row.type,
			dateRefund: row.dateRefund,
			amount: Number(row.amount),
			ticket: row.ticket,
		};

		setEditFormData(formValues);
	}

	return (
		<div className="flexbox">
			<div className="divHeader">
				<header>
					<TitleRefundPage dateMonth={formObject.dateRefund} />
					<Nav />
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
					<TableRefund
						rows={rows}
						editRowId={editRowId}
						handleEditClick={handleEditClick}
						handleEditFormChange={handleEditFormChange}
						editFormData={editFormData}
						handleEditFormSubmit={handleEditFormSubmit}
					/>
				</div>
			</div>
		</div>
	);
}
