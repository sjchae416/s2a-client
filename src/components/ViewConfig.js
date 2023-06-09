import React, { useEffect, useRef, useState } from 'react';
import shortid from 'shortid';
import { updateViewAPI, deleteViewAPI } from '../api';

export default function ViewConfig({
	viewRole,
	userTables,
	viewDatas,
	setViewDatas,
	viewDataList,
	setViewDataList,
	selectedView,
	setSelectedView,
	addView,
	setAddView,
}) {
	const [viewName, setViewName] = useState('');
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [viewType, setViewType] = useState('Table');
	const [allowedAction, setAllowAction] = useState([]);
	const [role, setRole] = useState([]);
	const [filter, setFilter] = useState('');
	const [userFilter, setUserFilter] = useState('');
	const [editFilter, setEditFilter] = useState('');
	const [boolConfigs, setBoolConfigs] = useState([]);
	const [emailConfigs, setEmailConfigs] = useState([]);
	const [editableCols, setEditableCol] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectedTableId, setSelectedTableId] = useState('');
	const [viewTable, setViewTable] = useState(null);
	const [keyCol, setKeyCol] = useState('');

	const formElement = useRef();
	console.log();

	const viewData = {
		_id: shortid.generate(),
		viewName: viewName,
		selectedTableId: selectedTableId,
		selectedColumns: selectedColumns,
		viewType: viewType,
		allowedAction: allowedAction,
		role: role,
		filter: filter,
		userFilter: userFilter,
		editFilter: editFilter,
		editableCols: editableCols,
	};

	const viewToSave = {
		name: viewData.viewName,
		table: viewData.selectedTableId,
		columns: viewData.selectedColumns,
		viewType: viewData.viewType,
		allowedActions: viewData.allowedAction,
		roles: viewData.role,
		filter: viewData.filter,
		userFilter: viewData.userFilter,
		editFilter: viewData.editFilter,
		editableCols: viewData.editableCols,
	};

	const isObjectInArray = (obj, arr) => {
		const objJSON = JSON.stringify(obj);
		return arr?.some((element) => JSON.stringify(element) === objJSON);
	};

	useEffect(() => {
		console.log('🚀 ~ file: ViewConfig.js:34 ~ viewDataList:', viewDataList);
	}, [viewDataList]);

	useEffect(() => {
		console.log('🚀 ~ file: ViewConfig.js:34 ~ viewDatas:', viewDatas);
	}, [viewDatas]);

	useEffect(() => {
		console.log('🚀 ~ useEffect ~ selectedView:', selectedView);

		if (selectedView) {
			setEmailConfigs([]);
			setBoolConfigs([]);

			setViewName(selectedView.name);
			setSelectedTableId(selectedView.table);
			setSelectedColumns(selectedView.columns);
			setViewType(selectedView.viewType);
			setAllowAction(selectedView.allowedActions);
			setRole(selectedView.roles);
			setFilter(selectedView.filter);
			setUserFilter(selectedView.userFilter);
			setEditFilter(selectedView.editFilter);
			setEditableCol(selectedView.editableCols);

			const selectedTableColumns = userTables?.find(
				(userTable) => userTable?._id === selectedView.table
			)?.columns;
			setColumns(selectedTableColumns);

			if (selectedColumns.length !== 0) {
				const columnWithKey = selectedTableColumns.find(
					(obj) => obj.key === true
				);
				const columnName = columnWithKey.name;
				setKeyCol(columnName);
			}

			if (selectedView.userFilter) {
				const emailConfigs = selectedTableColumns.filter(
					(item) => item.type === 'string'
				);
				setEmailConfigs(emailConfigs);
			}

			if (selectedView.filter || selectedView.editFilter) {
				const boolConfigs = selectedTableColumns.filter(
					(item) => item.type === 'bool'
				);
				setBoolConfigs(boolConfigs);
			}
		} else {
			setViewName('');
			setSelectedTableId('');
			setSelectedColumns([]);
			setViewType('Table');
			setAllowAction([]);
			setRole([]);
			setFilter('');
			setUserFilter('');
			setEditFilter('');
			setEditableCol([]);
			setColumns([]);
			setViewTable(null);
			formElement.current.reset();
		}
	}, [selectedView]);

	useEffect(() => {
		if (addView) {
			handleCancel();
			setAddView(false);
		}
	}, [addView]);

	const handleRoleChange = (e) => {
		const { value, checked } = e.target;
		if (checked) {
			setRole([...role, value]);
		} else {
			setRole(role.filter((item) => item !== value));
		}
	};

	const handleCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		let newSelectedColumns;
		if (checked) {
			newSelectedColumns = [...selectedColumns, name];
		} else {
			newSelectedColumns = selectedColumns.filter((col) => col !== name);
		}
		setSelectedColumns(handleColumnsOrder(newSelectedColumns));
	};

	function handleColumnsOrder(selectedColumns) {
		const orderedColumns = [];
		for (let column of columns) {
			if (selectedColumns.includes(column.name)) {
				orderedColumns.push(column.name);
			}
		}
		return orderedColumns;
	}

	const handleAllowedActionCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		if (checked) {
			setAllowAction([...allowedAction, name]);
		} else {
			setAllowAction(allowedAction.filter((column) => column !== name));
		}
	};

	const handleCancel = () => {
		setSelectedView(null);
		setViewName('');
		setSelectedTableId('');
		setSelectedColumns([]);
		setViewType('Table');
		setAllowAction([]);
		setRole([]);
		setFilter('');
		setUserFilter('');
		setEditFilter('');
		setEditableCol([]);
		setColumns([]);
		setViewTable(null);
		formElement.current.reset();
	};

	const handleCreateView = async (e) => {
		e.preventDefault();

		if (!viewName) {
			return window.alert('Enter View name!');
		} else if (!selectedTableId) {
			return window.alert('Select table!');
		} else if (selectedColumns.length === 0) {
			return window.alert('Choose columns!');
		} else if (role.length === 0) {
			return window.alert('Choose role!');
		} else if (viewType === 'Detail' && !editableCols.includes(keyCol)) {
			return window.alert('Key column ' + keyCol + ' must be editable');
		} else {
			setViewDatas((prev) =>
				prev === null ? [viewToSave] : [...prev, viewToSave]
			);
			handleCancel();

			setBoolConfigs([]);
			setFilter('');
			setEmailConfigs([]);
			setUserFilter('');
			setEditFilter('');
		}
	};

	const handleUpdateView = async () => {
		if (!viewName) {
			return window.alert('Enter View name!');
		} else if (!selectedTableId) {
			return window.alert('Select table!');
		} else if (selectedColumns.length === 0) {
			return window.alert('Choose columns!');
		} else if (role.length === 0) {
			return window.alert('Choose role!');
		} else if (viewType === 'Detail' && !editableCols.includes(keyCol)) {
			return window.alert('Key column ' + keyCol + ' must be editable');
		} else {
			if (isObjectInArray(selectedView, viewDataList)) {
				try {
					const updatedView = await updateViewAPI(selectedView._id, viewToSave);
					if (updatedView) {
						window.alert(`View ${updatedView.name} updated successfully`);
						setSelectedView(updatedView);
						setViewDataList((prev) => {
							const indexToUpdate = prev.findIndex(
								(view) => view._id === selectedView?._id
							);
							if (indexToUpdate !== -1) {
								const updatedViewDataList = [...prev];
								updatedViewDataList[indexToUpdate] = updatedView;
								return updatedViewDataList;
							}

							return prev;
						});
					}
				} catch (error) {
					console.error('Error updating the View: ', error);
					window.alert(error);
				}
			} else if (isObjectInArray(selectedView, viewDatas)) {
				setViewDatas((prev) => {
					const indexToUpdate = prev.findIndex(
						(view) => JSON.stringify(view) === JSON.stringify(selectedView)
					);

					if (indexToUpdate !== -1) {
						const updatedViewDatas = [...prev];
						updatedViewDatas[indexToUpdate] = viewToSave;
						setSelectedView(viewToSave);
						window.alert(`View ${viewToSave.name} updated successfully`);
						return updatedViewDatas;
					}

					return prev;
				});
			}
		}
	};

	const handleDeleteView = async (selectedViewId) => {
		if (isObjectInArray(selectedView, viewDataList)) {
			const viewIdToBeDeleted = selectedViewId;
			const result = await deleteViewAPI(viewIdToBeDeleted);

			if (result) {
				setViewDataList((prev) => {
					return prev.filter((view) => {
						return view?._id !== viewIdToBeDeleted;
					});
				});
				setSelectedView(null);
			} else {
				window.alert('Failed to delete the View');
			}
		} else if (isObjectInArray(selectedView, viewDatas)) {
			setViewDatas((prev) => {
				const filtered = prev.filter((view) => {
					return JSON.stringify(view) !== JSON.stringify(selectedView);
				});

				return filtered.length === 0 ? null : filtered;
			});
			setSelectedView(null);
		}
	};

	const handleViewName = (e) => {
		setViewName(e.target.value);
	};

	const handleSelectTable = (e) => {
		const table = userTables?.find((item) => item?._id === e.target.value);
		console.log('🚀 ~ handleSelectTable ~ table:', table);
		setViewTable(table);
		setSelectedTableId(e.target.value);

		if (e.target.value) {
			const selectedTableColumns = userTables?.find(
				(userTable) => userTable?._id === e.target.value
			)?.columns;
			setColumns(selectedTableColumns);

			const columnWithKey = selectedTableColumns.find(
				(obj) => obj.key === true
			);
			const columnName = columnWithKey.name;
			setKeyCol(columnName);
			console.log(columnName);
		} else {
			setColumns([]);
		}
	};

	const handleEditCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		let newSelectedColumns;
		if (checked) {
			newSelectedColumns = [...editableCols, name];
		} else {
			newSelectedColumns = editableCols.filter((column) => column !== name);
		}
		setEditableCol(handleColumnsOrder(newSelectedColumns));
	};

	const handleUserFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		setUserFilter(checked);
		if (checked) {
			const emailConfigs = columns.filter(
				(columns) => columns.type === 'string'
			);
			setEmailConfigs(emailConfigs);
		} else {
			setEmailConfigs([]);
			setUserFilter('');
		}
	};

	const handleFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		setFilter(checked);
		if (checked) {
			const boolConfigs = columns.filter((columns) => columns.type === 'bool');
			setBoolConfigs(boolConfigs);
		} else {
			setBoolConfigs([]);
			setFilter('');
		}
	};

	const handleEditFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		setEditFilter(checked);
		if (checked) {
			const boolConfigs = columns.filter((columns) => columns.type === 'bool');
			setBoolConfigs(boolConfigs);
		} else {
			setBoolConfigs([]);
			setEditFilter('');
		}
	};

	const handleFilterButtonChange = (e, name) => {
		setFilter(name);
	};

	const handleUserFilterButtonChange = (e, name) => {
		setUserFilter(name);
	};

	const handleEditFilterButtonChange = (e, name) => {
		setEditFilter(name);
	};

	return (
		<form
			ref={formElement}
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
					onChange={(e) => handleViewName(e)}
					type="text"
					className="form-control"
				/>
			</div>
			<div className="form-group">
				<label>Table</label>

				<select
					value={selectedView?.table}
					onChange={(e) => handleSelectTable(e)}
					className="form-control"
				>
					<option value="">Select Table</option>
					{userTables?.map((table) => (
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
					: ['Edit Record', 'Delete Record'].map((record) => (
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
								checked={filter}
								type="checkbox"
								id="checkbox-filter"
								name="filter"
								onChange={(e) => handleFilterCheckboxChange(e)}
							/>
							<label htmlFor="checkbox-filter">Filter</label>
							{boolConfigs.map((config) => (
								<div key={config.name}>
									<input
										checked={filter === config.name}
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
								checked={userFilter}
								type="checkbox"
								id="checkbox-user-filter"
								name="userFilter"
								onChange={(e) => handleUserFilterCheckboxChange(e)}
							/>
							<label htmlFor="checkbox-user-filter">User Filter</label>
							{emailConfigs.map((config) => (
								<div key={config.name}>
									<input
										checked={userFilter === config.name}
										type="radio"
										id={`radio-${config.name}`}
										name="filterOptionwww"
										value={config.name}
										onChange={(e) =>
											handleUserFilterButtonChange(e, config.name)
										}
									/>
									<label htmlFor={`radio-${config.name}`}>{config.name}</label>
								</div>
							))}
						</div>
					</div>
				) : (
					<div>
						<input
							checked={editFilter}
							type="checkbox"
							id="checkbox-edit-filter"
							name="editFilter"
							onChange={(e) => handleEditFilterCheckboxChange(e)}
						/>
						<label htmlFor="checkbox-edit-filter">Edit Filter</label>
						{boolConfigs.map((config) => (
							<div key={config.name}>
								<input
									checked={editFilter === config.name}
									type="radio"
									id={`radio-${config.name}`}
									name="filterOptionqqqqqq"
									value={config.name}
									onChange={(e) => handleEditFilterButtonChange(e, config.name)}
								/>
								<label htmlFor={`radio-${config.name}`}>{config.name}</label>
							</div>
						))}

						<div className="form-group">
							<label>Editable Columns</label>
							{selectedColumns?.map((column) => (
								<div key={column}>
									<input
										checked={editableCols.includes(column)}
										type="checkbox"
										id={`editcheckbox-${column}`}
										name={column}
										onChange={(e) => handleEditCheckboxChange(e, column)}
									/>
									<label htmlFor={`editcheckbox-${column}`}>{column}</label>
								</div>
							))}
						</div>

						<p>Selected Editable Columns: {editableCols.join(', ')}</p>
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

			{selectedView !== null ? (
				<div className="text-right">
					<button
						type="button"
						onClick={() => handleDeleteView(selectedView._id)}
						className="btn btn-danger can_btn"
					>
						Delete
					</button>
					<button
						type="button"
						className="btn btn-info"
						onClick={handleUpdateView}
					>
						Save
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
