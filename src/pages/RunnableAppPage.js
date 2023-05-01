import React, { useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { NavigationBar, TableView, TableViewSidebar } from '../components';
import UserContext from '../UserContext';

export default function RunnableAppPage({runnableApps}) {
	const { id } = useParams();

	// find app in runnableApps with same ID
	const runnableApp = runnableApps.find(app => app.app._id === id);

	// get accessible views
	const views = runnableApp.app.accessibleViews;
	console.log(views);

	const [selectedView, setSelectedView] = useState(null);
	const { user, setUser } = useContext(UserContext);

	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	return (
		<div>
			<br />
			<br />
			<NavigationBar user={user} />
			<h2>{runnableApp.app.name}</h2>
			<div className="page-container">
				<div className="sidebar-container">
					<TableViewSidebar views={views} onSelectView={handleSelectView} />
				</div>
				<div className="main-container">
					{selectedView && <TableView view={selectedView} listViews={views} />}
				</div>
			</div>
		</div>
	);
}
