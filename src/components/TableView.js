import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DetailView from './DetailView';
import { readTableAPI } from '../api';
import { loadSheetAPI, updateSheetAPI, readAllViewsAPI } from '../api';
import { setRef } from '@mui/material';

export default function TableView({
	view,
	listViews,
	userTables,
	user,
	userRoles,
	appLog,
	appId,
}) {
	const [tableData, setTableData] = useState([]);
	const [tableConfig, setTableConfig] = useState([]);
	const [tableViewObjArr, settableViewObjArr] = useState([]);
	const [open, setOpen] = useState(false);
	const [openDelete, setDeleteOpen] = useState(false);
	const [newRowData, setNewRowData] = useState({});
	const [selectedRowData, setSelectedRowData] = useState(null);
	const [selectedRow, setSelectedRow] = useState(null);
	// const [openDetail, setOpenDetail] = useState(false);
	const [showMinusButtons, setShowMinusButtons] = useState(false);
	const [selectedRowPosition, setSelectedRowPosition] = useState(0);
	const [cacheData, setCacheData] = useState(null);
	const [referenceColumnObj, setReferenceColumnObj] = useState(null);

	// States to store the position of the row added in the sheet
	const [addRowPosition, setAddRowPosition] = useState({});

	// States to store the position of the row edited in the sheet
	const [editPosition, setEditRowPosition] = useState({});

	// States to store the position of the row delete in the sheet
	const [deleteRowPosition, setDeleteRowPosition] = useState({});

	const [filteredtableViewObjArr, setFilteredtableViewObjArr] = useState(null);

	const originalDetailApps = listViews.filter(
		(view) => view.viewType === 'Detail'
	);

	useEffect(() => {
		console.log('🚀 ~ useEffect ~ selectedRowPosition:', selectedRowPosition);
	}, [selectedRowPosition]);

	const urlRegex =
		/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

	const [detailApps, setDetailApps] = useState(originalDetailApps);

	const [referenceTableViewObjArr, setReferenceTableViewObjArr] =
		useState(null);

	let referenceTable = null;

	let name, table, col, type, allowedActions, role;
	let addRowCol = [];
	let viewFilter = '',
		userFilter = '';
	name = view.name;
	table = view.table;
	col = view.columns;
	type = view.viewType;
	allowedActions = view.allowedActions;
	role = view.roles;
	let newRowDataKeyVal = '';

	if (detailApps.length > 0) addRowCol = detailApps[0].editableCols;
	if (view.filter != '') viewFilter = view.filter;
	if (view.userFilter != '') userFilter = view.userFilter;

	useEffect(() => {
		console.log('getTableData called here');
		getTableData();
	}, []);

	useEffect(() => {}, [cacheData]);

	useEffect(
		() => {
			console.log('tableViewObjArr in useEffect', tableViewObjArr);
			console.log('tableData in useEffect', tableData);
		},
		[tableViewObjArr],
		[tableData]
	);

	const addProtocolIfNeeded = (url) => {
		if (!/^https?:\/\//i.test(url)) {
			return 'http://' + url;
		}
		return url;
	};

	const getDetailView = async (tableId, userRoles) => {
		try {
			const views = await readAllViewsAPI();

			const detailView = views.find((view) => {
				const isDetailView = view.viewType === 'Detail';
				const hasTableId = view.table.toString() === tableId;
				const hasMatchingRole = view.roles.some((role) =>
					userRoles.includes(role)
				);

				return isDetailView && hasTableId && hasMatchingRole;
			});

			if (detailView) {
				console.log('Detail view found:', detailView);
				return detailView;
			} else {
				console.log('No detail view found for the given tableId and roles');
				return null;
			}
		} catch (error) {
			console.error('Error fetching detail view:', error);
		}
	};

	const findLabelValues = (referenceSheetTableData, input) => {
		let keyColumn, labelColumn;
		for (let column of referenceTable.columns) {
			if (column.key === true) keyColumn = column.name;
			if (column.label === true) labelColumn = column.name;
		}

		// find the column indices in the referenceSheetTableData
		let keyColumnIndex = referenceSheetTableData[0].indexOf(keyColumn);
		let labelColumnIndex = referenceSheetTableData[0].indexOf(labelColumn);

		// check if the key and label column indices are valid
		if (keyColumnIndex === -1 || labelColumnIndex === -1) {
			console.log('Invalid key or label column');
			return;
		}

		// search for the user input in the key column and return the corresponding label value
		for (let i = 1; i < referenceSheetTableData.length; i++) {
			if (referenceSheetTableData[i][keyColumnIndex] === input) {
				return referenceSheetTableData[i][labelColumnIndex];
			}
		}

		console.log('No matching value found');
		return;
	};

	const array2dToObjArr = (sheetTableData) => {
		return sheetTableData.slice(1).map((row) => {
			const obj = {};
			sheetTableData[0].forEach((key, index) => {
				obj[key] = row[index];
			});
			if (obj.length != 0) return obj;
			else return null;
		});
	};

	const getTableData = async () => {
		let referenceColumn = { name: '', reference: 'false' };
		const data = await readTableAPI(view.table);
		setTableData(data);
		setTableConfig(data.columns);

		for (let i = 0; i < data.columns.length; i++) {
			if (data.columns[i].reference !== 'false') {
				referenceColumn.name = data.columns[i].name;
				referenceColumn.reference = data.columns[i].reference;
			}
		}
		if (referenceColumn.reference !== 'false') {
			referenceTable = await readTableAPI(referenceColumn.reference);
		}

		const sheetData = {
			name: data.name,
			url: data.url,
			sheetIndex: data.sheetIndex,
		};
		const sheetTableData = await loadSheetAPI(sheetData);

		if (referenceTable) {
			const referenceSheetData = {
				name: referenceTable.name,
				url: referenceTable.url,
				sheetIndex: referenceTable.sheetIndex,
			};
			let referenceSheetTableData = await loadSheetAPI(referenceSheetData);
			setReferenceTableViewObjArr(array2dToObjArr(referenceSheetTableData));

			let columnIndex = sheetTableData[0].indexOf(referenceColumn.name);
			if (columnIndex === -1) {
				console.log('Column not found');
			} else {
				for (let i = 1; i < sheetTableData.length; i++) {
					let labelValue = findLabelValues(
						referenceSheetTableData,
						sheetTableData[i][columnIndex]
					);
					sheetTableData[i][columnIndex] = labelValue;
				}
			}
		}

		let result = array2dToObjArr(sheetTableData);

		if (result) settableViewObjArr(result);
		else settableViewObjArr(null);

		let filteredResult = {};
		if (viewFilter == '' && userFilter == '') {
			filteredResult = result;
		} else {
			filteredResult = result.filter((row) => row[viewFilter] === 'TRUE');
			if (userFilter)
				filteredResult = filteredResult.filter(
					(row) => row[userFilter] == user.email
				);
		}
		setReferenceColumnObj(referenceColumn);
		setFilteredtableViewObjArr(filteredResult);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setDeleteOpen(false);
	};

	const handleModalInputChange = (event) => {
		const { name, value } = event.target;
		setNewRowData({ ...newRowData, [name]: value });
	};

	const checkKeyIntegrity = () => {
		let keyColumn = '';
		// Find Key Column
		for (let i = 0; i < tableData.columns.length; i++) {
			if (tableData.columns[i].key) {
				keyColumn = tableData.columns[i].name;
			}
		}
		let keys = [];
		for (let i = 0; i < tableViewObjArr.length; i++) {
			keys.push(tableViewObjArr[i][keyColumn]);
		}
		if (newRowData[keyColumn] !== null) {
			newRowDataKeyVal = newRowData[keyColumn].toString();
			return !keys.includes(newRowDataKeyVal);
		}
		return true;
	};

	function isUrl(input) {
		const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
		const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlRegex.test(input) || gmailRegex.test(input);
	}

	const handleAddRow = async () => {
		const newRow = {};
		for (let i = 0; i < tableConfig.length; i++) {
			if (col.includes(tableConfig[i].name)) {
				newRow[tableConfig[i].name] = newRowData[tableConfig[i].name];
			} else {
				if (tableConfig[i].initialValue) {
					if (tableConfig[i].initialValue === '=ADDED_BY();')
						newRow[tableConfig[i].name] = user.email;
					else {
						newRow[tableConfig[i].name] = tableConfig[i].initialValue;
					}
				} else newRow[tableConfig[i].name] = '';
			}
		}

		//check if the fields are empty
		if (!checkKeyIntegrity()) {
			alert(`Input a unique key. Key: "${newRowDataKeyVal}" already exists!`);
			return;
		}

		//type correctness HERE
		for (let k = 0; k < tableConfig.length; k++) {
			for (let i = 0; i < addRowCol.length; i++) {
				if (!newRowData[addRowCol[i]]) {
					alert('Please fill in all fields');
					return;
				}

				if (tableConfig[k].name === addRowCol[i]) {
					if (
						tableConfig[k].type === 'int' &&
						isNaN(newRowData[addRowCol[i]])
					) {
						return window.alert(`${addRowCol[i]} input must be a number!`);
					} else if (
						tableConfig[k].type === 'bool' &&
						!['true', 'false'].includes(newRowData[addRowCol[i]].toLowerCase())
					) {
						return window.alert(
							`${addRowCol[i]} input must be a boolean value!`
						);
					} else if (
						tableConfig[k].type === 'url' &&
						!urlRegex.test(newRowData[addRowCol[i]])
					) {
						return window.alert(`${addRowCol[i]} input must be a url value!`);
					} else if (typeof newRowData[addRowCol[i]] !== 'string') {
						return window.alert(`${addRowCol[i]} must be a string!`);
					}
				}
			}
		}

		// col.forEach((column) => {
		//     newRow[column] = newRowData[column] || "";
		// });
		const updatedtableViewObjArr = [...tableViewObjArr, newRow];
		settableViewObjArr(updatedtableViewObjArr);
		setFilteredtableViewObjArr([...filteredtableViewObjArr, newRow]);
		setNewRowData({});

		//does not fill in default values for fields not added
		//tableViewObjArr.length is the end of the array ie the last row in tab;e
		let sheetIdx =
			tableData.sheetIndex +
			'!A' +
			(updatedtableViewObjArr.length + 1) +
			':' +
			String.fromCharCode(64 + Object.keys(newRow).length) +
			(updatedtableViewObjArr.length + 1);
		let newValues = [];
		for (let key in newRow) {
			newValues.push(newRow[key]);
		}

		const sheetData = {
			url: tableData.url,
			range: sheetIdx,
			values: [newValues],
		};

		await updateSheetAPI(sheetData);

		//UPDATE LOG
		const appObj = appLog.find((obj) => obj.app_id === appId);
		// If the object exists, append the new log entry to its log array
		if (appObj) {
			appObj.log.push({
				view_name: name,
				function: 'add',
				row_index: sheetIdx,
				change: newRow,
			});
		}

		await getTableData();
		handleClose();
	};

	const handleDeleteRow = (rowData) => {
		setSelectedRowData(rowData);
		setDeleteOpen(true);
	};

	const handleDeleteClick = () => {
		setShowMinusButtons(!showMinusButtons);
	};

	const handleDelete = async () => {
		const deletedRow = {};
		col.forEach((columnName) => {
			deletedRow[columnName] = selectedRowData[columnName];
		});

		// Find index of row to delete
		const index = tableViewObjArr.findIndex((row) => {
			return Object.keys(row).every((key) => {
				return row[key] === selectedRowData[key];
			});
		});

		let sheetTableData = await loadSheetAPI({
			url: tableData.url,
			sheetIndex: tableData.sheetIndex,
		});
		sheetTableData.splice(index + 1, 1);

		let sheetIdx =
			tableData.sheetIndex +
			'!A2:' +
			String.fromCharCode(64 + Object.keys(tableConfig).length) +
			(tableViewObjArr.length + 1).toString();

		if (index !== -1) {
			const updatedtableViewObjArr = [...tableViewObjArr];
			updatedtableViewObjArr.splice(index, 1);
			settableViewObjArr(updatedtableViewObjArr);
			setFilteredtableViewObjArr(updatedtableViewObjArr);
		}

		let values = [];

		for (let i = 0; i < Object.keys(tableConfig).length; i++) {
			values[i] = '';
		}

		sheetTableData.push(values);
		sheetTableData.splice(0, 1);

		const sheetData = {
			url: tableData.url,
			range: sheetIdx,
			values: sheetTableData,
		};

		await updateSheetAPI(sheetData);

		const appObj = appLog.find((obj) => obj.app_id === appId);
		// If the object exists, append the new log entry to its log array
		if (appObj) {
			appObj.log.push({
				view_name: name,
				function: 'delete',
				row_index: sheetIdx,
				change: deletedRow,
			});
		}

		handleClose();
	};

	const handleRowClick = async (row, columnName) => {
		setSelectedRow(row);

		const referenceColumn = tableData.columns.find(
			(column) => column.name === columnName && column.reference !== 'false'
		);

		if (referenceColumn) {
			const detailView = await getDetailView(
				referenceColumn.reference,
				userRoles
			);

			if (referenceTableViewObjArr) {
				const labelValue = row[columnName];
				const index = referenceTableViewObjArr.findIndex((obj) =>
					Object.values(obj).includes(labelValue)
				);
				setSelectedRow(referenceTableViewObjArr[index]);
			}
			setDetailApps([detailView]);
		} else {
			setDetailApps(originalDetailApps);
		}

		const foundRowIndex = tableViewObjArr.findIndex(
			(tableViewObjArrRow) => tableViewObjArrRow === row
		);
		setSelectedRowPosition(foundRowIndex);
	};

	return (
		<div>
			<h2>{name}</h2>
			<Button
				variant="contained"
				onClick={handleOpen}
				disabled={
					detailApps.length == 0 || !allowedActions.includes('Add Record')
				}
			>
				Add Record
			</Button>
			<Button
				variant="contained"
				onClick={handleDeleteClick}
				disabled={!allowedActions.includes('Delete Record') ? true : false}
			>
				Delete Record
			</Button>
			<br />
			<br />
			<table>
				<thead>
					<tr>
						{col.map((column) => (
							<th key={column}>{column}</th>
						))}
						{showMinusButtons && <th></th>}
					</tr>
				</thead>
				<tbody>
					{filteredtableViewObjArr?.map((row) => (
						<tr key={row.Name}>
							{col.map((column) => (
								<td key={column} onClick={() => handleRowClick(row, column)}>
									{urlRegex.test(row[column]) ? (
										<a
											href={addProtocolIfNeeded(row[column])}
											target="_blank"
											rel="noopener noreferrer"
										>
											{row[column]}
										</a>
									) : (
										row[column]
									)}
								</td>
							))}
							{showMinusButtons && (
								<td>
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteRow(row);
										}}
									>
										-
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
			{selectedRow && (
				<Modal open={true} onClose={() => setSelectedRow(null)}>
					<DetailView
						row={selectedRow}
						views={detailApps}
						rowPosition={selectedRowPosition}
						onSelectedRowChange={setSelectedRow}
						editPosition={setEditRowPosition}
						deleteRowPosition={setDeleteRowPosition}
						tableData={tableData}
						tableViewObjArr={tableViewObjArr}
						settableViewObjArr={settableViewObjArr}
						setFilteredtableViewObjArr={setFilteredtableViewObjArr}
						appLog={appLog}
						appId={appId}
					/>
				</Modal>
			)}
			<Modal open={open} onClose={handleClose}>
				<div
					className="modal-content"
					style={{ maxHeight: '80vh', overflowY: 'auto' }}
				>
					<h2>ADD ROW</h2>
					{addRowCol.map((columnName) => (
						<div key={columnName}>
							<TextField
								name={columnName}
								label={columnName}
								value={newRowData[columnName] || ''}
								onChange={handleModalInputChange}
							/>
							<br />
							<br />
						</div>
					))}
					<br />
					<div>
						<Button variant="contained" onClick={handleClose}>
							Cancel
						</Button>
						<Button
							className="btn btn-danger "
							variant="contained"
							onClick={handleAddRow}
						>
							Add
						</Button>
					</div>
				</div>
			</Modal>
			<Modal open={openDelete} onClose={handleClose}>
				<div className="modal-content">
					<h2>Delete Row</h2>
					<h4>Are you sure you want to delete this row?</h4>
					{selectedRowData && (
						<div>
							{col.map((columnName) => (
								<div key={columnName}>
									<strong>{columnName}: </strong>
									<span>{selectedRowData[columnName]}</span>
									<br />
									<br />
								</div>
							))}
						</div>
					)}
					<div>
						<Button variant="contained" onClick={handleClose}>
							Close
						</Button>
						<Button variant="contained" onClick={handleDelete}>
							Confirm
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
