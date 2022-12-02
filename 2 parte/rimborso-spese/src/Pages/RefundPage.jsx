import Form from "../Components/RefundPageComponents/Form";
import TableRefund from "../Components/RefundPageComponents/TableRefund";
import {
	translateStatus,
	approveStatus,
	calculateMaxRefundable,
} from "../Components/RefundPageComponents/approvationRules";
import { storageRimborsoMax, downloadTable } from "../API/fetchFunc";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

let userId;
let userRole;
let maxRefundable;

export default function RefundPage() {
	const [rows, setRows] = useState([]);
	const [formObject, setFormObject] = useState({
		id: "",
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

	let { month } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			userId = sessionStorage.getItem("userId");
			userRole = sessionStorage.getItem("userRole");
			maxRefundable = storageRimborsoMax(userRole);
			let newRows = await downloadTable(userId, month);
			setRows(newRows);
			console.log(newRows);
		};
		fetchData();
	}, []);

	function handleAddFormChange(event) {
		// event.preventDefault();
		console.log(userId);

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
			refund: 0,
		};
		newRow.refund = calculateMaxRefundable(newRow, maxRefundable);
		// console.log(maxRefundable)
		// console.log(userId)
		const newRows = [...rows, newRow];
		setRows(newRows);
		console.log(newRows);
	}

	function handleEditFormSubmit(event) {
		event.preventDefault();

		let state = translateStatus(approveStatus(editFormData.ticket, editFormData.amount));
		const editedRow = {
			id: editRowId,
			type: editFormData.type,
			dateRefund: editFormData.dateRefund,
			amount: Number(editFormData.amount),
			ticket: editFormData.ticket,
			state: state,
			refund: Number(calculateMaxRefundable(state, editFormData.type, editFormData.amount)),
		};
		const newRows = [...rows];

		const index = rows.findIndex((row) => row.id === editRowId);

		newRows[index] = editedRow;
		setRows(newRows);
		setEditRowId(null);
	}

	const handleCancelClick = () => {
		setEditRowId(null);
	};

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

	function handleDeleteClick(rowId) {
		const newRows = [...rows];
		const index = rows.findIndex((row) => row.id === rowId);
		newRows.splice(index, 1);
		setRows(newRows);
	}

	return (
		<div className="flexbox">
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
						handleDeleteClick={handleDeleteClick}
						handleCancelClick={handleCancelClick}
					/>
				</div>
			</div>
		</div>
	);
}
