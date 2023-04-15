import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import role from '../../testData/test-role-sheet.json';

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
	const loadTable = async () => {
		if (appName && roleMembershipURL) {
			console.table(appData);
			// NOTE read table data here with api

			// NOTE test
			const app = await fetch(`http://localhost:3333/apps/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(appData),
			})
				.then((response) => response.json())
				.then((data) => console.log('SUCCESSFULL', data))
				.catch((error) => console.error(error));
		} else {
			alert('Please fill out all fields before submitting');
			return;
		}
		//let test = "./" + url.toString();
		//let file = require(test);

		//keys = Object.keys(test[0]);
		// alert(keys);
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
				<button onClick={loadTable} className="btn btn-info">
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
