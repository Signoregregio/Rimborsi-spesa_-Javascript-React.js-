import Form from "../Components/RefundPageComponents/Form";
import TableRefund from "../Components/RefundPageComponents/TableRefund";
import {
	translateStatus,
	approveStatus,
	calculateMaxRefundable,
} from "../Components/RefundPageComponents/approvationRules";
import { sortByColumn } from "../Components/RefundPageComponents/modifyRows"
import { storageRimborsoMax, downloadTable, submitMonthMock } from "../API/fetchFunc";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRef } from "react";

let userId;
let userRole;
let maxRefundable;

export default function RefundPage() {
	const [rows, setRows] = useState([]);
	const [formObject, setFormObject] = useState({
		primaryKey: "",
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
	const [disabled, setDisabled] = useState(false)
	const [sortBy, setSortBy] = useState({
		type: 0,
		asc: true,
	})

	let { month } = useParams();
	const submitBtn = useRef();

	useEffect(() => {
		const fetchData = async () => {
			userId = sessionStorage.getItem("userId");
			userRole = sessionStorage.getItem("userRole");
			maxRefundable = await storageRimborsoMax(userRole);
			let newRows = await downloadTable(userId, month);
			newRows = sortByColumn( sortBy.type, sortBy.asc, newRows)
			setRows(newRows);
			console.log(newRows);
		};
		fetchData();
	}, []);

	function handleAddFormChange(event) {
		// event.preventDefault();

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

	function sortingBy(event){
		let cellIndex = event.target.cellIndex
		if(cellIndex === sortBy.type){
			setSortBy({type: cellIndex, asc:!sortBy.asc})
			sortByColumn(cellIndex , !sortBy.asc, rows)		
		}
		if(cellIndex !== sortBy.type){
			setSortBy({type: cellIndex, asc:true})
			sortByColumn(cellIndex , true , rows)		
		}
	}
	
	async function handleAddFormSubmit(event) {
		event.preventDefault();
		let state = translateStatus(approveStatus(formObject.ticket, formObject.amount));
		let newRow = {
			primaryKey: nanoid(),
			type: formObject.type,
			dateRefund: formObject.dateRefund,
			amount: Number(formObject.amount),
			ticket: formObject.ticket,
			state: state,
			refund: Number(calculateMaxRefundable(formObject, state, maxRefundable)),
		};
		let newRows = [...rows, newRow];
		setDisabled(true)
		await submitMonthMock(newRows, userId, month);
		setDisabled(false)

		console.log(newRows)
		newRows = sortByColumn( sortBy.type, sortBy.asc, newRows)
		console.log(newRows)
		
		setRows(newRows);
		console.log(newRows);
	}

	async function handleEditFormSubmit(event) {
		event.preventDefault();

		let state = translateStatus(approveStatus(editFormData.ticket, editFormData.amount));
		const editedRow = {
			primaryKey: editRowId,
			type: editFormData.type,
			dateRefund: editFormData.dateRefund,
			amount: Number(editFormData.amount),
			ticket: editFormData.ticket,
			state: state,
			refund: Number(calculateMaxRefundable(editFormData, state, maxRefundable)),
		};

		let newRows = [...rows];

		const index = rows.findIndex((row) => row.primaryKey === editRowId);

		newRows[index] = editedRow;
		setDisabled(true)
		await submitMonthMock(newRows, userId, month);
		newRows = sortByColumn( sortBy.type, sortBy.asc, newRows)
		setDisabled(false)
		setRows(newRows);
		setEditRowId(null);
	}

	const handleCancelClick = () => {
		setEditRowId(null);
	};

	function handleEditClick(event, row) {
		event.preventDefault();
		setEditRowId(row.primaryKey);
		const formValues = {
			type: row.type,
			dateRefund: row.dateRefund,
			amount: Number(row.amount),
			ticket: row.ticket,
		};

		setEditFormData(formValues);
	}

	async function handleDeleteClick(rowId) {
		const newRows = [...rows];
		const index = rows.findIndex((row) => row.primaryKey === rowId);
		newRows.splice(index, 1);
		setDisabled(true)
		await submitMonthMock(newRows, userId, month);
		setDisabled(false)
		setRows(newRows);
	}

	

	return (
		<div className="flexbox">
			<div id="leftSide">
				<Form
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
					formObject={formObject}
					disabled = {disabled}
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
						disabled={disabled}
						sortingBy={sortingBy}
						sortBy={sortBy}
					/>
				</div>
			</div>
		</div>
	);
}
