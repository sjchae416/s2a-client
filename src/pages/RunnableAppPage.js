import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { NavigationBar, TableView, TableViewSidebar } from '../components';
import UserContext from '../UserContext';
import { saveAs } from 'file-saver';

export default function RunnableAppPage({ runnableApps, userTables, appLog }) {
	const { id } = useParams();

	// find app in runnableApps with same ID
	const runnableApp = runnableApps.find((app) => app.app._id === id);

	// get accessible views
	const views = runnableApp.app.accessibleViews;

	const [selectedView, setSelectedView] = useState(null);
	const { user, setUser } = useContext(UserContext);
	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	const handleDownloadLog = () => {
		const appObj = appLog.find(obj => obj.app_id === id);
		const csv = convertObjectToCsv(appObj);

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    	saveAs(blob, `${appObj.app_name}.csv`);
	};

	function convertObjectToCsv(obj) {
		const headers = Object.keys(obj);
		const values = headers.map((header) => {
			if (header === "log") {
			  return JSON.stringify(obj[header]);
			}
			return obj[header];
		  });
		const csvRows = [headers.join(','), values.join(',')];
		return csvRows.join('\n');
	}

	return (
		<div>
			<br />
			<br />
			<NavigationBar user={user} />
			<div>
				<h2>{runnableApp.app.name}</h2>
				<button onClick={handleDownloadLog}>Download Log</button>
			</div>
			
			<div className="page-container">
				<div className="sidebar-container">
					<TableViewSidebar views={views} onSelectView={handleSelectView} />
				</div>
				<div className="main-container">
					{selectedView && (
						<TableView
							view={selectedView}
							listViews={views}
							userTables={userTables}
							user={user}
							appLog = {appLog}
							appId = {id}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
