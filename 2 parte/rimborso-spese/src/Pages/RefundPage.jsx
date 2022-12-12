import Form from "../Components/RefundPageComponents/Form";
import TableRefund from "../Components/RefundPageComponents/TableRefund";
import {
	translateStatus,
	approveStatus,
	calculateMaxRefundable,
} from "../Components/RefundPageComponents/approvationRules";
import { filterArray, sortByColumn } from "../Components/RefundPageComponents/modifyRows";
import { storageRimborsoMax, downloadTable, submitMonthMock } from "../API/fetchFunc";
import { useMemo, useState } from "react";
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

let userId;
let userRole;
let maxRefundable;

export default function RefundPage({ disabled, setDisabled }) {
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
	const [sortBy, setSortBy] = useState({
		type: 0,
		asc: true,
	});

	let { month } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			setDisabled(true);
			userId = sessionStorage.getItem("userId");
			userRole = sessionStorage.getItem("userRole");
			maxRefundable = await storageRimborsoMax(userRole);
			let newRows = await downloadTable(userId, month);
			newRows = sortByColumn(sortBy.type, sortBy.asc, newRows);
			console.log(newRows);
			setRows(newRows);
			setDisabled(false);
		};
		fetchData();

		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	function sortingBy(event) {
		let cellIndex = event.target.cellIndex;
		if (cellIndex === sortBy.type) {
			setSortBy({ type: cellIndex, asc: !sortBy.asc });
			sortByColumn(cellIndex, !sortBy.asc, filteredRows);
		}
		if (cellIndex !== sortBy.type) {
			setSortBy({ type: cellIndex, asc: true });
			sortByColumn(cellIndex, true, filteredRows);
		}
	}

	async function handleAddFormSubmit(event) {
		event.preventDefault();
		setDisabled(true);
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
		await submitMonthMock(newRows, userId, month);

		console.log(newRows);
		newRows = sortByColumn(sortBy.type, sortBy.asc, newRows);
		console.log(newRows);
		setRows(newRows);
		setDisabled(false);

		console.log(newRows);
	}

	async function handleEditFormSubmit(event) {
		event.preventDefault();

		setDisabled(true);
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
		await submitMonthMock(newRows, userId, month);
		newRows = sortByColumn(sortBy.type, sortBy.asc, newRows);
		setRows(newRows);
		setEditRowId(null);
		setDisabled(false);
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
		setDisabled(true);
		const newRows = [...rows];
		const index = rows.findIndex((row) => row.primaryKey === rowId);
		newRows.splice(index, 1);
		await submitMonthMock(newRows, userId, month);
		setRows(newRows);
		setDisabled(false);
	}

	const [filterInput, setFilterInput] = useState({
		date: "",
		type: "",
		amountMin: "",
		amountMax: "",
		ticket: "",
		state: "",
		refundMin: "",
		refundMax: "",
	});

	const [filteredRows, setFilteredRows] = useState([]);

	function handleFilterChange(event) {
		console.log(event.target.name);
		const fieldName = event.target.name;
		const fieldValue = event.target.value;

		const newFilterRow = { ...filterInput };
		newFilterRow[fieldName] = fieldValue;
		setFilterInput(newFilterRow);
	}

	useMemo(() => {
		let newFilteredRows = filterArray(rows, filterInput);
		setFilteredRows(newFilteredRows);
	}, [rows, filterInput]);

	return (
		<div className="flexbox">
			<div id="leftSide">
				<Form
					handleAddFormChange={handleAddFormChange}
					handleAddFormSubmit={handleAddFormSubmit}
					formObject={formObject}
					disabled={disabled}
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
						handleFilterChange={handleFilterChange}
						filteredRows={filteredRows}
					/>
				</div>
			</div>
		</div>
	);
}
