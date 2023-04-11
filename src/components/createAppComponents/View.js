import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import role from '../../testData/test-role-sheet.json';
import test from '../../testData/test2.json';

const View = ({ viewlist, setViewList }) => {
	const [selectedColumns, setSelectedColumns] = useState([]);
	const [showTable, setShowTable] = useState(false);
	const columns = Object.keys(test[0]);
	const [viewName, setViewName] = useState('');
	const [viewType, setViewType] = useState('');
	const [allowedAction, setAllowAction] = useState('');
	const [role, setRole] = useState('');

	const viewData = {
		viewName: viewName,
		selectedColumns: selectedColumns,
		viewType: viewType,
		allowedAction: allowedAction,
		role: role
	};

	const handleAllowedActionChange = (e) => {
		setAllowAction(e.target.value);
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
		console.log(selectedColumns);
	};

	const handleAddView = () => {
		if (viewName) setViewList([...viewlist, viewName]);
		console.log(viewData);
	};

	const handleCancel = () => {
		setSelectedColumns([]);
		setShowTable(false);
		setViewName('');
		setViewType('');
		setAllowAction('');
		setRole('');
	  };

	return (
		<div
			class="card"
			style={{
				margin: '10px auto',
				width: '480px',
				maxWidth: '100%',
			}}
		>
			<div class="form-group">
				<label>View Name</label>
				<input
					value={viewName}
					onChange={(e) => setViewName(e.target.value)}
					type="text"
					class="form-control"
				/>
			</div>
			<div class="form-group">
				<label>Table</label>
				<select class="form-control">
					<option value="">test</option>
				</select>
			</div>
			<div>
				<div className="form-group">
					<label>Columns</label>
					{columns.map((column) => (
						<div key={column}>
							<input
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
			<div class="form-group">
				<label className="can_btn">View Type</label>
				<button
					class="btn btn-info can_btn"
					onClick={(e) => setViewType(e, 'Table')}
				>
					Table
				</button>
				<button class="btn btn-info" onClick={(e) => setViewType(e, 'Detail')}>
					Detail
				</button>
			</div>
			{/*Change options based on table/detail */}
			<div class="form-group">
				<label>Allowed Action</label>
				<select className="form-control" value={allowedAction} onChange={handleAllowedActionChange}>
					<option value="Edit">Edit Record</option>
					<option value="Add">Add Record</option>
				</select>
			</div>
			<div class="form-group">
				<label>Role</label>
				<select className="form-control" value={role} onChange={handleRoleChange}>
					<option value="Developer">Developer</option>
					<option value="End User">End User</option>
				</select>
			</div>

			<div class="text-right">
				<button class="btn btn-danger can_btn" onClick={handleCancel}>
					Cancel
				</button>
				<button onClick={handleAddView} class="btn btn-info">
					Create
				</button>
			</div>

			<br />
			<br />
		</div>
	);
};
export { View };
