import React, { useEffect, useState } from 'react';
import { loadSheetAPI, deleteAppAPI } from '../api';

export default function AppConfig({
	user,
	setReloadApp,
	app,
	setAppData,
	setViewRole,
	selectedApp,
	setSelectedApp,
	showTable,
	setShowTable,
}) {
	const [name, setName] = useState('');
	const [roleMembershipSheet, setRoleMembershipSheet] = useState('');
	const [roleData, setRoleData] = useState([]);
	const roleKey = roleData.length > 0 ? roleData[0] : [];
	const [sheetIndex, setSheetIndex] = useState('');

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
		sheetIndex,
	};

	useEffect(() => {
		console.log('🚀 ~ app:', app);
		console.log('🚀 ~ selectedApp:', selectedApp);
		if (app !== null) {
			setName(app.name);
			setRoleMembershipSheet(app.roleMembershipSheet);
			setSheetIndex(app.sheetIndex);
		} else if (selectedApp !== null) {
			setName(selectedApp.name);
			setRoleMembershipSheet(selectedApp.roleMembershipSheet);
			setSheetIndex(selectedApp.sheetIndex);
			appData.views = selectedApp.createdViews;
		} else {
			setName('');
			setRoleMembershipSheet('');
			setSheetIndex('');
		}
	}, [app, selectedApp]);

	const handleNameOnChange = (e) => {
		setName(e.target.value);
	};
	const handleRoleOnChange = (e) => {
		setRoleMembershipSheet(e.target.value);
	};

	const loadRoleTable = async () => {
		if (name && roleMembershipSheet && sheetIndex) {
			const sheetData = {
				url: roleMembershipSheet,
				sheetIndex: sheetIndex,
			};
			const dataArray = await loadSheetAPI(sheetData);
			if (dataArray) {
				setViewRole(dataArray);
				setRoleData(dataArray);
			} else {
				alert('Error loading table. Please check your URL');
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

	const handleDeleteApp = async (selectedAppId) => {
		try {
			const result = await deleteAppAPI(selectedAppId);

			if (result) {
				setShowTable(false);
				setAppData(null);
				setSelectedApp(null);
			} else {
				window.alert('Failed to delete the App');
			}
		} catch (error) {
			console.error(error);
			// window.alert(error);
			console.error('Error while deleting the App: ', error);
		}

		setReloadApp(true);
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
					onChange={(e) => handleNameOnChange(e)}
				/>
			</div>
			<div className="form-group">
				<label>Role Membership Sheet URL</label>
				<input
					required
					type="text"
					value={roleMembershipSheet}
					className="form-control"
					onChange={(e) => handleRoleOnChange(e)}
				/>
			</div>
			<div className="form-group">
				<label>Sheet Index</label>
				<input
					required
					type="text"
					value={sheetIndex}
					className="form-control"
					onChange={(e) => setSheetIndex(e.target.value)}
				/>
			</div>
			<div className="text-right">
				<button onClick={handleLoad} className="btn btn-info">
					{roleData.length === 0 && showTable
						? 'Reload to apply any changes'
						: 'Load Role Membership Table'}
				</button>
			</div>

			<br />
			<br />
			{showTable && (
				<div>
					<table>
						<thead>
							<tr>
								{roleKey.map((header, index) => (
									<th key={index}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{roleData.slice(1).map((rowData, rowIndex) => (
								<tr key={rowIndex}>
									{rowData.map((value, colIndex) => (
										<td key={colIndex}>{value}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
					<br />

					{selectedApp && (
						<button
							className="btn btn-danger"
							onClick={() => handleDeleteApp(selectedApp._id)}
						>
							DELETE
						</button>
					)}
				</div>
			)}

			<br />
			<br />
		</div>
	);
}
