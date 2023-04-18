import React, { useEffect, useState } from 'react';
import { createTable, loadTable } from '../api/tableApi';
import { updateUser } from '../api/userApi';

export default function TableConfig({
	user,
	setUser,
	tableIds,
	setTableIds,
	tables,
	setTables,
	fetchTables,
}) {
	const [sheetIndex, setSheetIndex] = useState('');
	const [name, setName] = useState('');
	const [url, setUrl] = useState('');
	const [showTable, setShowTable] = useState(false);
	const [tableDataArray, setTableDataArray] = useState([]);
	const dummyRef = ['test1', 'test2', 'false'];
	const [config, setConfig] = useState([]);
	const [keys, setKeys] = useState([]);

	const clearForms = () => {
		setSheetIndex('');
		setName('');
		setUrl('');
		setShowTable(false);
		setTableDataArray([]);
		setConfig([]);
		setKeys([]);

		
	};

	const isTypeColumnValid = () => {
		for (let i = 0; i < config.length; i++) {
			if(!config[i].type || config[i].type === ''){
				return false;
			}
		}
		return true;
	};

	const isNameUnique = () => {
		for (let i = 0; i < tables.length; i++) {
			if (tables[i].name === name) {
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
	// 	fetchTables();
	// }, []);

	useEffect(() => {
		console.log('user', user);
	}, []);

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

	useEffect(() => {
		console.log(tables);
	}, [tables]);

	const handleLoad = async () => {
		if (tableData.name && tableData.url && tableData.sheetIndex) {
			if (!isNameUnique()) {
				alert(
					'This table name already exists. Please choose a different name.'
				);
				return;
			}
			const dataArray = await loadTable(tableData);
			if (dataArray && !dataArray.error) {
				console.log(dataArray);
				setTableDataArray(dataArray);
			} else {
				const errorMessage =
					dataArray && dataArray.message
						? dataArray.message
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

		const createdTable = await createTable(tableData);
		if (createdTable && !createdTable.error) {
			console.log(createdTable);
			alert('Table created successfully');
		} else {
			const errorMessage =
				createdTable && createdTable.message
					? createdTable.message
					: 'Error creating table.';
			alert(errorMessage);
			return;
		}
		const newTableIds = createdTable._id == null ? [...tableIds]: [...tableIds, createdTable._id];
		const update = { tables: newTableIds };
		const updatedUser = await updateUser(user._id, update);
		setUser(updatedUser);
		setTableIds(newTableIds);
		clearForms();
		// fetchTables();
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
				} else {
					// If not a radio button, update field value directly
					updatedConfig[configIndex][field] = value;
				}
			} else {
				// If config does not exist, create a new config object
				const newConfig = {
					name: '',
					key: false,
					label: false,
					reference: 'false',
					type: '',
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
	const handleAddTable = () => {
		if (name) setTables([...tables, name]);
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
			<div className="text-right">
				<button onClick={handleLoad} className="btn btn-info">
					Load
				</button>
			</div>
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
											defaultValue="false"
										>
											<option></option>
											{dummyRef.map((ref) => (
												<option key={ref} value={ref}>
													{ref}
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
											<option></option>
											<option value="int">Number</option>
											<option value="bool">Boolean</option>
											<option value="string">Text</option>
											<option value="url">URL</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="text-right">
						<button
							// FIXME why create function in Cancel btn?
							onClick={handleCreateClick}
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
			<br />
			<br />
		</div>
	);
}
