import React, { useEffect, useState } from 'react';
import {
	createTableAPI,
	deleteTableAPI,
	loadTableAPI,
	updateUserAPI,
} from '../api';

export default function TableConfig({
	user,
	setUser,
	tableIds,
	userTables,
	selectedTable,
	setSelectedTable,
	addTable,
}) {
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [sheetIndex, setSheetIndex] = useState('');
	const [showTable, setShowTable] = useState(false);
	const [tableDataArray, setTableDataArray] = useState([]);
	const [config, setConfig] = useState([]);
	const [keys, setKeys] = useState([]);

	useEffect(() => {
		if (selectedTable !== null) {
			setName(selectedTable.name);
			setUrl(selectedTable.url);
			setSheetIndex(selectedTable.sheetIndex);
		} else {
			setName('');
			setUrl('');
			setSheetIndex('');
		}
	}, [selectedTable]);

	const clearForms = () => {
		setSheetIndex('');
		setName('');
		setUrl('');
		setShowTable(false);
		setTableDataArray([]);
		setConfig([]);
		setKeys([]);
	};

	useEffect(() => {
		clearForms();
	}, [addTable]);

	const isTypeColumnValid = () => {
		for (let i = 0; i < config.length; i++) {
			if (!config[i].type || config[i].type === '') {
				return false;
			}
		}
		return true;
	};

	const isNameUnique = () => {
		for (let i = 0; i < userTables.length; i++) {
			if (userTables[i]?.name === name) {
				return false;
			}
		}
		return true;
	};

	const tableData = {
		name: name,
		url: url,
		sheetIndex: sheetIndex,
		config: config,
	};

	// useEffect(() => {
	// 	console.log('user', user);
	// }, []);

	useEffect(() => {
		if (tableDataArray.length > 0) {
			setKeys(tableDataArray[0]);
		}
	}, [tableDataArray]);

	useEffect(() => {
		tableData.name = name;
		tableData.url = url;
		tableData.sheetIndex = sheetIndex;
		tableData.config = config;
	}, [name, url, sheetIndex, config]);

	// Comment this out for table to load on first click, but it will not check for config consistency on first click.
	useEffect(() => {
		if (config.length > 0) {
			setShowTable(true);
		}
	}, [config]);

	useEffect(() => {
		if (keys.length > 0) {
			setConfig(
				keys.map((key) => ({
					name: key,
					key: false,
					label: false,
					reference: 'false',
					type: '',
				}))
			);
		}
	}, [keys]);

	const handleLoad = async () => {
		if (tableData.name && tableData.url && tableData.sheetIndex) {
			if (!isNameUnique()) {
				alert(
					'This table name already exists. Please choose a different name.'
				);
				return;
			}
			const tableRows = await loadTableAPI(tableData);
			if (tableRows && !tableRows.error) {
				setTableDataArray(tableRows);
			} else {
				const errorMessage =
					tableRows && tableRows.message
						? tableRows.message
						: 'Error loading table. Please check your URL and sheet index.';
				alert(errorMessage);
				return;
			}
		} else {
			alert('Please fill out all fields before submitting');
			return;
		}
	};

	const handleCreateClick = async () => {
		// Use the config array to perform desired action with the configuration
		// console.log(config);
		// console.log(tableData);
		if (!isTypeColumnValid()) {
			alert('Please select a type for all rows');
			return;
		}

		const createdTable = await createTableAPI(tableData);
		if (createdTable && !createdTable.error) {
			// console.log(createdTable);
			alert('Table created successfully');
		} else {
			const errorMessage =
				createdTable && createdTable.message
					? createdTable.message
					: 'Error creating table.';
			alert(errorMessage);
			return;
		}
		const newTableIds =
			createdTable._id == null
				? [...tableIds]
				: [...tableIds, createdTable._id];
		const update = { tables: newTableIds };
		const updatedUser = await updateUserAPI(user._id, update);

		setUser(updatedUser);
		clearForms();
	};

	const handleInputChange = (event, key, field) => {
		const { value, type, checked } = event.target;
		setConfig((prevConfig) => {
			const updatedConfig = [...prevConfig];
			const configIndex = updatedConfig.findIndex((item) => item.name === key); // Find index of config object with the same name as key
			if (configIndex !== -1) {
				// If config already exists, update the field value
				if (type === 'radio') {
					// If radio button is clicked, update field value based on checked status
					updatedConfig[configIndex][field] = checked;

					if (field === 'label' || field === 'key') {
						updatedConfig.forEach((item) => {
							if (item.name !== key) {
								item[field] = false;
							}
						});
					}
				}else if(field === 'reference'){
					// if it is a reference, store the table
					if(value === 'none') updatedConfig[configIndex][field] = value;
					else{
						const table = userTables.find((item) => item?._id === event.target.value);
						updatedConfig[configIndex][field] = table;
					}
				} 
				else {
					// If not a radio button, update field value directly
					updatedConfig[configIndex][field] = value;
				}
			} else {
				// If config does not exist, create a new config object
				const newConfig = {
					name: '',
					key: false,
					label: false,
					reference: 'none',
					type: 'string',
				};
				newConfig.name = key;
				if (field === 'label' || field === 'key') {
					newConfig[field] = type === 'radio' ? checked : value === 'true';
				} else {
					newConfig[field] = value;
				}
				updatedConfig.push(newConfig);
			}
			return updatedConfig;
		});
	};

	const handleCancelClick = () => {
		setName('');
		setUrl('');
		setSheetIndex('');
		setShowTable(false);
	};

	const handleDeleteTable = async (user, selectedTableId) => {
		try {
			const result = await deleteTableAPI(selectedTableId);

			if (result) {
				const updatedTableIds = tableIds.filter(
					(tableId) => tableId !== selectedTableId
				);
				const update = { tables: updatedTableIds };
				const updatedUser = await updateUserAPI(user._id, update);
				setUser(updatedUser);
				setSelectedTable(null);
			} else {
				window.alert('Failed to delete the Table');
			}
		} catch (error) {
			window.alert(error);
			console.error('Error while deleting the Table: ', error);
		}
	};

	return (
		<div
			className="card"
			style={{
				margin: '10px auto',
				width: '600px',
				maxWidth: '100%',
			}}
		>
			<div className="form-group">
				<label>Name</label>
				<input
					required
					type="text"
					className="form-control"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>URL</label>
				<input
					required
					type="text"
					className="form-control"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>Sheet Index</label>
				<input
					required
					className="form-control"
					value={sheetIndex}
					onChange={(e) => setSheetIndex(e.target.value)}
				/>
			</div>

			{selectedTable === null && (
				<div className="text-right">
					<button onClick={handleLoad} className="btn btn-info">
						Load
					</button>
				</div>
			)}
			<br />
			<br />

			{showTable && (
				<div>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Name</th>
								<th>Key</th>
								<th>Label</th>
								<th>Reference</th>
								<th>Type</th>
							</tr>
						</thead>
						<tbody>
							{keys.map((key) => (
								<tr key={key}>
									<td>{key}</td>
									<td>
										<label>
											<input
												type="radio"
												name={`radio-col1`}
												value={key}
												onChange={(event) =>
													handleInputChange(event, key, 'key')
												}
											/>
										</label>
									</td>
									<td>
										<label>
											<input
												type="radio"
												name={`radio-col2`}
												value={key}
												onChange={(event) =>
													handleInputChange(event, key, 'label')
												}
											/>
										</label>
									</td>
									<td>
										<select
											name={`select-${key}`}
											onChange={(event) =>
												handleInputChange(event, key, 'reference')
											}
											defaultValue="none"
										>
											<option value = 'none'>None</option>
											{userTables.map((table) => (
												<option key={table._id} value={table._id}>
													{table.name}
												</option>
											))}
										</select>
									</td>
									<td>
										<select
											name={`select-${key}`}
											onChange={(event) =>
												handleInputChange(event, key, 'type')
											}
										>
											{/* FIXME remove the blank option and show Text as default and have the value stored default */}
											<option></option>
											{/* FIXME use the ACTUAL type name in JS for value */}
											<option value="string">Text</option>
											<option value="int">Number</option>
											<option value="bool">Boolean</option>
											<option value="url">URL</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="text-right">
						<button
							onClick={handleCancelClick}
							className="btn btn-danger can_btn"
						>
							Cancel
						</button>
						<button onClick={handleCreateClick} className="btn btn-info">
							Create
						</button>
					</div>
				</div>
			)}

			{selectedTable !== null && (
				<div>
					<button onClick={() => handleDeleteTable(user, selectedTable._id)}>
						DELETE
					</button>
				</div>
			)}
			<br />
			<br />
		</div>
	);
}
