import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import role from '../../testData/test-role-sheet.json';
import { loadTable } from '../../api/tableApi';

const App = ({ developer }) => {
	const [appName, setAppName] = useState('');
	const [creatorEmail, setCreatorEmail] = useState('');
	const [roleMembershipURL, setRoleMembershipURL] = useState('');
	const [showTable, setShowTable] = useState(false);
	const roleKey = Object.keys(role[0]);
	const appData = {
		name: appName,
		creator: creatorEmail,
		roleMembershipSheet: roleMembershipURL,
		// tables: tables,
		// view: views,
		// lastModifiedDate: new Date().toISOString(),
		// lastOpenedDate: new Date().toISOString(),
	};

	const handleSaveAppName = (name) => {
		setAppName(name);
	};

	const handleSaveURL = (url) => {
		setRoleMembershipURL(url);
	};

	// FN create and fill in App document & and load Table data
	const loadRoleTable = async () => {
		if (appName && roleMembershipURL) {
			const tableData = {
				url: roleMembershipURL,
				//NOTE - In order for sheetIndex to always choose the first sheet index, the metadata must be used. May add it later.
				sheetIndex: 'Sheet1',
			}
			const dataArray = await loadTable(tableData);
      if (dataArray) {
        console.log(dataArray);
				//TODO - save dataArray to a local state variable
      } else {
        alert("Error loading table. Please check your URL or make sure your role membership sheet sheetIndex is 'Sheet1'");
        return;
      }
    } else {
      alert("Please fill out all fields before submitting");
      return;
    }
    setShowTable(true);
	};

	useEffect(() => {
		appData.appName = appName;
		appData.roleMembershipURL = roleMembershipURL;
		// console.log(appData);
	}, [appName, roleMembershipURL]);

	useEffect(() => {
		if (developer) {
			setCreatorEmail(developer.email);
		}
	}, [developer]);

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
				<label>Creator's Email</label>
				<div>{creatorEmail}</div>
			</div>
			<div className="form-group">
				<label>App Name</label>
				<input
					required
					type="text"
					className="form-control"
					onChange={(e) => handleSaveAppName(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>Role Membership Sheet URL</label>
				<input
					required
					type="text"
					className="form-control"
					onChange={(e) => handleSaveURL(e.target.value)}
					// onChange={(e) => setRoleMembershipURL(e.target.value)}
				/>
			</div>
			<div className="text-right">
				<button onClick={loadRoleTable} className="btn btn-info">
					Load
				</button>
			</div>

			<br />
			<br />
			{showTable ? (
				<table>
					<thead>
						<tr>
							{Object.keys(role[0]).map((header) => (
								<th key={header}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{role.map((rowData) => (
							<tr key={rowData.id}>
								{Object.values(rowData).map((value, index) => (
									<td key={index}>{value}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			) : (
				''
			)}

			<br />
			<br />
		</div>
	);
};
export { App };
