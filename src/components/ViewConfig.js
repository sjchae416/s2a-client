import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	actionAddView,
	actionClearInput,
	actionDeleteView,
	actionUpdateView,
} from '../redux/action';
import { updateUser } from '../api/userApi';
import { createView } from '../api/viewApi';

const ViewConfig = ({
	user,
	role,
	setRole,
	allowedAction,
	setAllowAction,
	viewType,
	setViewType,
	viewName,
	setViewName,
	setUser,
	viewIds,
}) => {
	const [showTable, setShowTable] = useState(false);
	const [filter, setFilter] = useState('');
	const [userFilter, setUserFilter] = useState('');
	const [editFilter, setEditFilter] = useState('');
	const [editableCols, setEditableCols] = useState([]);
	const [boolConfigs, setBoolConfigs] = useState([]);
	const { isViewSelected, selectedView, clearInput, viewrole } = useSelector(
		(state) => state.app
	);
	const dispatch = useDispatch();
	const [selectedColumns, setSelectedColumns] = useState([]);
	const formElement = useRef(null);

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

	const columns = testData.config.map((item) => item.name);

	useEffect(() => {
		setSelectedColumns(selectedView.selectedColumns);
		setViewName(selectedView.viewName);
		setViewType(selectedView.viewType);
		setAllowAction(selectedView.allowedAction);
		setRole(selectedView.role);
		setFilter(selectedView.filter);
		setUserFilter(selectedView.userFilter);
		setEditFilter(selectedView.editFilter);
		setEditableCols(selectedView.editableCols);
	}, [selectedView]);

	// FIXME have the correct viewData
	const viewData = {
		id: new Date().getTime(),
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

	//
	const handleCreateView = async () => {
		// TODO create and save View
		try {
			const newView = await createView(viewData);
			const newViewIds = [...viewIds, newView._id];
			const update = { views: newViewIds };
			const updatedUser = await updateUser(user._id, update);
			setUser(updatedUser);
		} catch (error) {
			console.error('Error saving the View', error);
		}
	};

	const handleRoleChange = (e) => {
		setRole(e.target.value);
  };
  
	const handleCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		if (checked) {
			setSelectedColumns([...selectedColumns, name]);
		} else {
			setSelectedColumns(selectedColumns.filter((column) => column !== name));
		}
		// console.log(selectedColumns);
  };
  
	const handleAllowedActionCheckboxChange = (e, column) => {
		const { name, checked } = e.target;
		if (checked) {
			setAllowAction([...allowedAction, name]);
		} else {
			setAllowAction(allowedAction.filter((column) => column !== name));
		}
		// console.log(allowedAction);
  };
  
	const handleOnSubmit = (e) => {
		e.preventDefault();
		console.log(role);
		if (!role) {
			return window.alert('Add role membership sheet first!');
		}
		if (viewName) dispatch(actionAddView(viewData));
		formElement.current.reset();
		setSelectedColumns([]);
		setShowTable(false);
		setViewName('');
		setViewType('Table');
		setAllowAction([]);
		setRole('');
  };
  
	useEffect(() => {
		setSelectedColumns([]);
		setShowTable(false);
		setViewName('');
		setViewType('Table');
		setAllowAction([]);
		setRole('');
		dispatch(actionClearInput(false));
  }, [clearInput]);
  
	const handleCancel = () => {
		setSelectedColumns([]);
		setShowTable(false);
		setViewName('');
		setViewType('Table');
		setAllowAction([]);
		setRole('');
  };
  
	const updateViewList = (e) => {
		e.preventDefault();
		dispatch(actionUpdateView(selectedView.id, viewData));
		formElement.current.reset();
		setSelectedColumns([]);
		setShowTable(false);
		setViewName('');
		setViewType('Table');
		setAllowAction([]);
		setRole('');
	};

	const deleteViewList = () => {
		dispatch(actionDeleteView(selectedView.id));
		formElement.current.reset();
		setSelectedColumns([]);
		setShowTable(false);
		setViewName('');
		setViewType('Table');
		setAllowAction([]);
		setRole('');
	};

	const handleUserFilterCheckboxChange = (e) => {
		const { checked } = e.target;
		if (checked) {
			setUserFilter(user.email);
			console.log(user.email);
		} else {
			setUserFilter('');
		}
		// console.log(allowedAction);
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
			console.log(viewData);
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
			console.log(viewData);
		}
	};

	const handleFilterButtonChange = (e, name) => {
		console.log(name);
		setFilter(name);
		console.log(viewData);
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
			onSubmit={handleOnSubmit}
			ref={formElement}
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
				<select className="form-control">
					<option value="">test</option>
				</select>
			</div>
			<div>
				<div className="form-group">
					<label>Columns</label>
					{columns.map((column) => (
						<div key={column}>
							<input
								checked={selectedColumns.find((item) => item === column)}
								type="checkbox"
								id={`checkbox-${column}`}
								name={column}
								onChange={(e) => handleCheckboxChange(e, column)}
							/>
							<label htmlFor={`checkbox-${column}`}>{column}</label>
						</div>
					))}
				</div>
				<p>Selected Columns: {selectedColumns.join(', ')}</p>
			</div>
			<div className="form-group">
				<label className="can_btn">View Type</label>
				<input
					onChange={(e) => handleTableView(e)}
					type="radio"
					checked={viewType === 'Table' ? true : false}
					id="Table"
					name="view_type"
					value="Table"
				/>
				<label htmlFor="Table">Table</label>{' '}
				<input
					checked={viewType === 'Detail' ? true : false}
					onChange={(e) => handleDetailView(e)}
					type="radio"
					id="Detail"
					name="view_type"
					value="Detail"
				/>
				<label htmlFor="Detail">Detail</label>
			</div>
			<div className="form-group">
				<label>Allowed Action</label>

				{viewType === 'Table'
					? ['Add Record', 'Delete Record'].map((record) => (
							<div key={record}>
								<input
									checked={allowedAction.find((item) => item === record)}
									type="checkbox"
									id={`checkbox-${record}`}
									name={record}
									onChange={(e) =>
										handleAllowedActionCheckboxChange(e, record.split(' ')[0])
									}
								/>
								<label htmlFor={`checkbox-${record}`}>{record}</label>
							</div>
					  ))
					: ['Edit Record', 'Delete Record'].map((record) => (
							<div key={record}>
								<input
									checked={allowedAction.find((item) => item === record)}
									type="checkbox"
									id={`checkbox-${record}`}
									name={record}
									onChange={(e) =>
										handleAllowedActionCheckboxChange(e, record.split(' ')[0])
									}
								/>
								<label htmlFor={`checkbox-${record}`}>{record}</label>
							</div>
					  ))}
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
					</div>
				)}
      </div>
      
			<div className="form-group">
				<label>Role</label>
				<select
					className="form-control"
					value={role}
					onChange={handleRoleChange}
				>
					{viewrole[0]?.map((role, ind) => (
						<option key={ind} value={role}>
							{role}
						</option>
					))}
				</select>
			</div>

			{!isViewSelected ? (
				<div className="text-right">
					<button
						type="reset"
						className="btn btn-danger can_btn"
						onClick={handleCancel}
					>
						Cancel
					</button>
					<button
						// NOTE not implemented yet
						// onClick={handleCreateView}
						type="submit"
						className="btn btn-info"
					>
						Create
					</button>
				</div>
			) : (
				<div className="text-right">
					<button className="btn btn-danger can_btn" onClick={updateViewList}>
						Save
					</button>
					<button onClick={deleteViewList} className="btn btn-info">
						Delete
					</button>
				</div>
			)}
			<br />
			<br />
		</form>
	);
};
export { ViewConfig };
