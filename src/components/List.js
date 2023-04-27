import React, { useEffect, useState } from 'react';
import { readViewAPI } from '../api';

const List = ({
	type,
	developerApps,
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
			{type === 'app' && developerApps.length > 0
				? developerApps.map(
						(developerApp) =>
							developerApp !== null && (
								<div
									key={developerApp._id}
									onClick={() => handleSelectApp(developerApp)}
								>
									<hr />
									{developerApp.name}
								</div>
							)
				  )
				: type === 'view' && viewDataList.length > 0
				? viewDataList.map(
						(viewData) =>
							viewData !== null && (
								<div
									key={viewData.id}
									onClick={() => handleSelectView(viewData)}
								>
									<hr />
									{viewData.viewName}
								</div>
							)
				  )
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
