import React, { useEffect, useState } from 'react';
import { readViewAPI } from '../api';

const List = ({
	type,
	userApps,
	userTables,
	viewDatas,
	viewDataList,
	setSelectedView,
	setSelectedTable,
}) => {
	const [selectedApp, setSelectedApp] = useState(null);
	// FIXME
	const [viewsToDisplay, setViewsToDisplay] = useState(viewDataList);

	const handleSelectApp = (app) => {
		setSelectedApp(app);
	};

	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	const handleSelectTable = (table) => {
		setSelectedTable(table);
	};

	const loadAppViews = async (app) => {
		try {
			const appViews = await Promise.all(
				app.views.map(async (viewId) => {
					return await readViewAPI(viewId);
				})
			);
			setViewsToDisplay(appViews);
		} catch (error) {
			console.error('Error fetching View: ', error);
		}
	};

	useEffect(() => {
		if (selectedApp !== null) {
			loadAppViews(selectedApp);
		}
	}, [selectedApp]);

	return (
		<div>
			{type === 'app'
				? userApps.map((userApp) => (
						<div key={userApp._id} onClick={() => handleSelectApp(userApp)}>
							<hr />
							{userApp.name}
						</div>
				  ))
				: type === 'view'
				? viewDataList?.map((view) => (
						<div key={view.id} onClick={() => handleSelectView(view)}>
							<hr />
							{view.viewName}
						</div>
				  ))
				: userTables?.map(
						(userTable) =>
							userTable !== null && (
								<div
									key={userTable._id}
									onClick={() => handleSelectTable(userTable)}
								>
									<hr />
									{userTable.name}
								</div>
							)
				  )}
		</div>
	);
};

export default List;
