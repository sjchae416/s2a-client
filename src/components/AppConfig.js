import React, { useEffect, useState } from 'react';
import { loadSheetAPI, getFirstSheetNameAPI } from '../api';

export default function AppConfig({
	user,
	app,
	setAppData,
	setViewRole,
	name,
	setName,
	roleMembershipSheet,
	setRoleMembershipSheet,
	selectedPublishedApp,
	setAddApp,
	addApp,
	appType,
	setSelectedPublishedApp,
}) {
	const [showTable, setShowTable] = useState(false);
	const [roleData, setRoleData] = useState([]);
	const roleKey = roleData.length > 0 ? roleData[0] : [];

	useEffect(() => {
		if (addApp) {
		  setName("");
		  setRoleMembershipSheet("");
		  setAddApp(false);
		}
	}, [addApp]);
	
	useEffect(() => {
		setName("");
		setRoleMembershipSheet("");
		setSelectedPublishedApp({});
	}, [appType]);
	
	useEffect(() => {
		if (selectedPublishedApp.name) {
		  setName(selectedPublishedApp.name);
		  setRoleMembershipSheet(selectedPublishedApp.roleMembershipSheet);
		}
	}, [selectedPublishedApp]);

	useEffect(() => {
		appData.name = name;
		appData.roleMembershipSheet = roleMembershipSheet;
	}, [name, roleMembershipSheet]);

	useEffect(() => {
		if (app !== null) {
			console.log('🚀 ~ app:', app);
		}
	}, [app]);

	const now = new Date();
	const nycTimeString = now.toLocaleString('en-US', {
		timeZone: 'America/New_York',
	});

	const appData = {
		name: name,
		creator: user.email,
		views: [],
		roleMembershipSheet: roleMembershipSheet,
		createdAt: nycTimeString,
		lastModifiedDate: nycTimeString,
	};

	// FN create and fill in App document & and load Table data
	const loadRoleTable = async () => {
		if (name && roleMembershipSheet) {
			const sheetIndex = await getFirstSheetNameAPI({ url: roleMembershipSheet })
			const sheetData = {
				url: roleMembershipSheet,
				//NOTE - In order for sheetIndex to always choose the first sheet index, the metadata must be used. May add it later.
				sheetIndex: sheetIndex,
			};
			const dataArray = await loadSheetAPI(sheetData);
			if (dataArray) {
				setViewRole(dataArray);
				setRoleData(dataArray);
			} else {
				alert(
					"Error loading table. Please check your URL"
				);
				return;
			}
		} else {
			alert('Please fill out all fields before submitting');
			return;
		}
		setShowTable(true);
	};

	const handleLoad = () => {
		loadRoleTable();
		setAppData(appData);
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
				<label>Creator's Email</label>
				<div>{user?.email}</div>
			</div>
			<div className="form-group">
				<label>App Name</label>
				<input
					required
					type="text"
					value={name}
					className="form-control"
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>Role Membership Sheet URL</label>
				<input
					required
					type="text"
					value={roleMembershipSheet}
					className="form-control"
					onChange={(e) => setRoleMembershipSheet(e.target.value)}
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
					<table>
						<thead>
							<tr>
								{roleKey.map(
									(
										header,
										index // Loop through the roleKey array and get the header and index
									) => (
										<th key={index}>{header}</th> // Use the index as the key for the header
									)
								)}
							</tr>
						</thead>
						<tbody>
							{roleData.slice(1).map(
								(
									rowData,
									rowIndex // Use slice(1) to exclude the first row (header)
								) => (
									<tr key={rowIndex}>
										{rowData.map(
											(
												value,
												colIndex // Loop through each row and get the value and colIndex
											) => (
												<td key={colIndex}>{value}</td> // Use the colIndex as the key for the cell
											)
										)}
									</tr>
								)
							)}
						</tbody>
					</table>
					<br />
				</div>
			)}

			<br />
			<br />
		</div>
	);
}
