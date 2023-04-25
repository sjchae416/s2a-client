import React, { useEffect, useRef, useState } from 'react';
// removed redux and installed shortID library for viewID
import shortid from 'shortid';
import { loadTableAPI } from '../api';

const testData = {
	name: 'test',
	url: 'https://docs.google.com/spreadsheets/d/1yHt-_Pbu52TJW3znWxo9VlHnHOQaFVvRMTpkrWYtM_s/edit#gid=1530492309',
	sheetIndex: 'Sheet1',
	config: [
		{
			name: 'Name',
			key: 'true',
			label: 'false',
			reference: 'test2',
			type: 'string',
		},
		{
			name: 'Email',
			key: 'false',
			label: 'true',
			reference: 'test1',
			type: 'string',
		},
		{
			name: 'Class',
			key: 'false',
			label: 'false',
			reference: 'test1',
			type: 'string',
		},
		{
			name: 'Grade',
			key: 'false',
			label: 'false',
			reference: 'test2',
			type: 'string',
		},
		{
			name: 'Passed',
			key: 'false',
			label: 'false',
			reference: 'test2',
			type: 'bool',
		},
	],
};

export default function ViewConfig({
	viewRole,
	tables,
	setViewDatas,
	setViewDataList,
	selectedView,
	setSelectedView,
}) {
	const [viewName, setViewName] = useState('');
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [viewType, setViewType] = useState('Table');
	const [allowedAction, setAllowAction] = useState([]);
	const [role, setRole] = useState([]);
	const [filter, setFilter] = useState('');
	const [userFilter, setUserFilter] = useState('');
	const [editFilter, setEditFilter] = useState('');
	const [editableCols, setEditableCols] = useState([]);
	const [boolConfigs, setBoolConfigs] = useState([]);
	const [textConfigs, setTextConfigs] = useState([]);
	const [selectedEditColumns, setSelectedEditColumns] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectedTable, setSelectedTable] = useState({});

	const viewData = {
		id: shortid.generate(), //added the shortid library
		viewName: viewName,
		selectedColumns: selectedColumns,
		viewType: viewType,
		allowedAction: allowedAction,
		role: role,
		filter: filter,
		userFilter: userFilter,
		editFilter: editFilter,
		editableCols: editableCols,
	};

	const handleCreateView = async (e) => {
		e.preventDefault();

		let bool = await checkUserEmail();

		if (!bool) {
			return window.alert('Invalid Email in Selected Table');
		}

		if (!viewName) {
			return window.alert('Enter View name!');
		} else if (!selectedTable) {
			return window.alert('Select table!');
		} else if (selectedColumns.length === 0) {
			return window.alert('Choose columns!');
		} else if (role.length === 0) {
			return window.alert('Choose role!');
		} else {
			const viewToSave = {
				name: viewData.viewName,
				// FIXME hard coded TableId for testing, make it store onClick
				table: '6440b526d0312e27648d3198',
				colums: viewData.selectedColumns,
				viewType: viewData.viewType,
				allowedActions: viewData.allowedAction,
				roles: viewData.role,
				filter: viewData.filter,
				userFilter: viewData.userFilter,
				editFilter: viewData.editFilter,
				editableCols: viewData.editableCols,
			};
			setViewDatas((prev) => [...prev, viewToSave]);
			setViewDataList((preVal) => {
				return [...preVal, viewData];
			});
			handleCancel();
		}
	};

	const handleRoleChange = (e) => {
		const { name, checked } = e.target;
		if (checked) {
			setRole([...role, name]);
		} else {
			setRole(role.filter((item) => item !== name));
		}
	};

	const handleCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		if (checked) {
			setSelectedColumns([...selectedColumns, name]);
		} else {
			setSelectedColumns(selectedColumns.filter((column) => column !== name));
		}
	};

	const handleAllowedActionCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		if (checked) {
			setAllowAction([...allowedAction, name]);
		} else {
			setAllowAction(allowedAction.filter((column) => column !== name));
		}
	};

	const handleCancel = () => {
		setSelectedColumns([]);
		//setShowTable(false);
		setViewName('');
		setViewType('Table');
		setAllowAction([]);
		setRole([]);
	};

	useEffect(() => {
		if (selectedView.viewName) {
			setSelectedColumns(selectedView.selectedColumns);
			setViewName(selectedView.viewName);
			setViewType(selectedView.viewType);
			setAllowAction(selectedView.allowedAction);
			setRole(selectedView.role);
		}
	}, [selectedView.viewName]);

	const updateViewList = async () => {
		let bool = await checkUserEmail();
		if (!bool) {
			return window.alert('Invalid Email in Selected Table');
		}

		if (!viewName) {
			return window.alert('Enter View name!');
		} else if (!selectedTable) {
			return window.alert('Select table!');
		} else if (selectedColumns.length === 0) {
			return window.alert('Choose columns!');
		} else if (role.length === 0) {
			return window.alert('Choose role!');
		} else {
			setViewDataList((preVal) => {
				const index = preVal.findIndex((item) => item.id === selectedView.id);
				preVal[index] = viewData;
				return preVal;
			});
			handleCancel();
			setSelectedView({});
		}
	};

	async function checkUserEmail() {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression for email format

		const tableData = {
			name: selectedTable.name,
			url: selectedTable.url,
			sheetIndex: selectedTable.sheetIndex,
		};
		const data = await loadTableAPI(tableData);

		let emailIndex = -1;
		const headerRow = data[0];
		for (let i = 0; i < headerRow.length; i++) {
			if (headerRow[i].toLowerCase() === 'email') {
				emailIndex = i;
				break;
			}
		}

		const emails = [];
		for (let i = 1; i < data.length; i++) {
			let row = data[i];
			if (row.length > emailIndex) {
				emails.push(row[emailIndex]);
			}
		}

		const invalidEmails = emails.filter((email) => !emailRegex.test(email));
		return !(invalidEmails.length > 0);
	}

	const deleteViewList = () => {
		setViewDataList((preVal) => {
			const res = preVal.filter((item) => item.id !== selectedView.id);
			return res;
		});
		handleCancel();
	};

	const handleSelectTable = (e) => {
		const table = tables.find((item) => item?._id === e.target.value);
		setSelectedTable(table);
		setColumns(table?.columns);
	};

	const handleEditCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		if (checked) {
			setSelectedEditColumns([...selectedEditColumns, name]);
		} else {
			setSelectedEditColumns(
				selectedEditColumns.filter((column) => column !== name)
			);
		}
	};

	const handleUserFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		if (checked) {
			// Filter config objects where type is bool
			const textConfigs = testData.config.filter(
				(config) => config.type === 'string'
			);
			// Set the filtered bool configs to state
			setTextConfigs(textConfigs);
		} else {
			// Clear the bool configs from state
			setTextConfigs([]);
			setUserFilter('');
			console.log(viewData);
		}
	};

	const handleFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		if (checked) {
			// Filter config objects where type is bool
			const boolConfigs = testData.config.filter(
				(config) => config.type === 'bool'
			);
			// Set the filtered bool configs to state
			setBoolConfigs(boolConfigs);
		} else {
			// Clear the bool configs from state
			setBoolConfigs([]);
			setFilter('');
		}
	};

	const handleEditFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		if (checked) {
			// Filter config objects where type is bool
			const boolConfigs = testData.config.filter(
				(config) => config.type === 'bool'
			);
			// Set the filtered bool configs to state
			setBoolConfigs(boolConfigs);
		} else {
			// Clear the bool configs from state
			setBoolConfigs([]);
			setEditFilter('');
			//console.log(viewData);
		}
	};

	const handleFilterButtonChange = (e, name) => {
		console.log(name);
		setFilter(name);
		console.log(viewData);
	};

	const handleUserFilterButtonChange = (e, name) => {
		setUserFilter(name);
	};

	const handleEditFilterButtonChange = (e, name) => {
		console.log(name);
		setEditFilter(name);
		console.log(viewData);
	};

	const handleTableView = (e) => {
		setViewType(e.target.value);
		setEditFilter('');
	};

	const handleDetailView = (e) => {
		setViewType(e.target.value);
		setFilter('');
		setUserFilter('');
	};

	return (
		<form
			onSubmit={handleCreateView}
			className="card"
			style={{
				margin: '10px auto',
				width: '480px',
				maxWidth: '100%',
			}}
		>
			<div className="form-group">
				<label>View Name</label>
				<input
					value={viewName}
					onChange={(e) => setViewName(e.target.value)}
					type="text"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Table</label>
				<select onChange={(e) => handleSelectTable(e)} className="form-control">
					<option value="">Select Table</option>
					{tables.map((table) => (
						<option key={table._id} value={table._id}>
							{table.name}
						</option>
					))}
				</select>
			</div>
			<div>
				<div className="form-group">
					<label>Columns</label>
					{columns.map((column) => (
						<div key={column._id}>
							<input
								checked={selectedColumns.includes(column.name)}
								type="checkbox"
								id={`checkbox-${column.name}`}
								name={column.name}
								value={column.name}
								onChange={(e) => handleCheckboxChange(e)}
							/>
							<label htmlFor={`checkbox-${column.name}`}>{column.name}</label>
						</div>
					))}
				</div>
				<p>Selected Columns: {selectedColumns.join(', ')}</p>
			</div>
			<div className="form-group">
				<label className="can_btn">View Type</label>{' '}
				<input
					checked={viewType === 'Table' ? true : false}
					onChange={(e) => {
						setAllowAction([]);
						setViewType(e.target.value);
					}}
					type="radio"
					id="Table"
					name="view_type"
					value="Table"
				/>
				<label htmlFor="Table">Table</label>
				<input
					checked={viewType === 'Detail' ? true : false}
					onChange={(e) => {
						setAllowAction([]);
						setViewType(e.target.value);
					}}
					type="radio"
					id="Detail"
					name="view_type"
					value="Detail"
				/>
				<label htmlFor="Detail">Detail</label>
			</div>
			<div className="form-group">
				<label>Allowed Actions</label>
				{viewType === 'Table'
					? ['Add Record', 'Delete Record'].map((record) => (
							<div key={record}>
								<input
									checked={allowedAction.includes(record)}
									type="checkbox"
									id={`checkbox-${record}`}
									name={record}
									value={record}
									onChange={(e) => handleAllowedActionCheckboxChange(e)}
								/>
								<label htmlFor={`checkbox-${record}`}>{record}</label>
							</div>
					  ))
					: ['Edit Record', 'delete record'].map((record) => (
							<div key={record}>
								<input
									checked={allowedAction.includes(record)}
									type="checkbox"
									id={`checkbox-${record}`}
									name={record}
									value={record}
									onChange={(e) => handleAllowedActionCheckboxChange(e)}
								/>
								<label
									style={{ textTransform: 'capitalize' }}
									htmlFor={`checkbox-${record}`}
								>
									{record}
								</label>
							</div>
					  ))}
			</div>

			<div className="form-group">
				<label>Filters</label>
				{viewType === 'Table' ? (
					<div>
						<div>
							<input
								type="checkbox"
								id="checkbox-filter"
								name="filter"
								onChange={(e) => handleFilterCheckboxChange(e)}
							/>
							<label htmlFor="checkbox-filter">Filter</label>
							{boolConfigs.map((config) => (
								<div key={config.name}>
									<input
										type="radio"
										id={`radio-${config.name}`}
										name="filterOption"
										value={config.name}
										onChange={(e) => handleFilterButtonChange(e, config.name)}
									/>
									<label htmlFor={`radio-${config.name}`}>{config.name}</label>
								</div>
							))}
						</div>

						<div>
							<input
								type="checkbox"
								id="checkbox-user-filter"
								name="userFilter"
								onChange={(e) => handleUserFilterCheckboxChange(e)}
							/>
							<label htmlFor="checkbox-user-filter">User Filter</label>
							{textConfigs.map((config) => (
								<div key={config.name}>
									<input
										type="radio"
										id={`radio-${config.name}`}
										name="filterOption"
										value={config.name}
										onChange={(e) => handleFilterButtonChange(e, config.name)}
									/>
									<label htmlFor={`radio-${config.name}`}>{config.name}</label>
								</div>
							))}
						</div>
					</div>
				) : (
					<div>
						<input
							type="checkbox"
							id="checkbox-edit-filter"
							name="editFilter"
							onChange={(e) => handleEditFilterCheckboxChange(e)}
						/>
						<label htmlFor="checkbox-edit-filter">Edit Filter</label>
						{boolConfigs.map((config) => (
							<div key={config.name}>
								<input
									type="radio"
									id={`radio-${config.name}`}
									name="filterOption"
									value={config.name}
									onChange={(e) => handleEditFilterButtonChange(e, config.name)}
								/>
								<label htmlFor={`radio-${config.name}`}>{config.name}</label>
							</div>
						))}

						<div className="form-group">
							<label>Editable Columns</label>
							{columns?.map((column) => (
								<div key={column._id}>
									<input
										checked={selectedEditColumns.includes(column.name)}
										type="checkbox"
										id={`editcheckbox-${column.name}`}
										name={column.name}
										onChange={(e) => handleEditCheckboxChange(e, column.name)}
									/>
									<label htmlFor={`editcheckbox-${column.name}`}>
										{column.name}
									</label>
								</div>
							))}
						</div>

						<p>Selected Editable Columns: {selectedEditColumns.join(', ')}</p>
					</div>
				)}
			</div>

			<div className="form-group">
				<label>Roles</label>
				{viewRole[0]?.map((roles, ind) => (
					<div key={ind}>
						<input
							checked={role.includes(roles)}
							type="checkbox"
							id={`checkbox-${roles}`}
							name={roles}
							value={roles}
							onChange={(e) => handleRoleChange(e)}
						/>
						<label htmlFor={`checkbox-${roles}`}>{roles}</label>
					</div>
				))}
				<p>Selected Roles: {role.join(', ')}</p>
			</div>

			{selectedView.viewName ? (
				<div className="text-right">
					<button
						type="button"
						className="btn btn-danger can_btn"
						onClick={updateViewList}
					>
						Save
					</button>
					<button
						type="button"
						onClick={deleteViewList}
						className="btn btn-info"
					>
						Delete
					</button>
				</div>
			) : (
				<div className="text-right">
					<button
						onClick={handleCancel}
						type="reset"
						className="btn btn-danger can_btn"
					>
						Cancel
					</button>
					<button type="submit" className="btn btn-info">
						Create
					</button>
				</div>
			)}
		</form>
	);
}

export { ViewConfig };
