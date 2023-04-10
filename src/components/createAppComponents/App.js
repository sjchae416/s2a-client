import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import role from '../../testData/test-role-sheet.json';

const App = () => {
	const [appName, setAppName] = useState('');
	const [appurl, setURLName] = useState('');
	const [showTable, setShowTable] = useState(false);
	const roleKey = Object.keys(role[0]);

	const appData = {
		appName: appName,
		appurl: appurl,
	};

	useEffect(() => {
		appData.appName = appName;
    appData.appurl = appurl;
    console.log(appData);
	}, [appName, appurl]);

	const loadTable = () => {
		if (appName && appurl) {
			console.log(appData);
			// Create the JSON object
			//requires backend to save the data for tables
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

	return (
		<div
			class="card"
			style={{
				margin: '10px auto',
				width: '600px',
				maxWidth: '100%',
			}}
		>
			<div class="form-group">
				<label>Creator's Name</label>
				<div>John Smith</div>
			</div>
			<div class="form-group">
				<label>App Name</label>
				<input
					required
					type="text"
					class="form-control"
					onChange={(e) => setAppName(e.target.value)}
				/>
			</div>
			<div class="form-group">
				<label>URL</label>
				<input
					required
					type="text"
					class="form-control"
					onChange={(e) => setURLName(e.target.value)}
				/>
			</div>
			<div class="text-right">
				<button onClick={loadTable} class="btn btn-info">
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
