import React, { useEffect, useState } from 'react';
import { readViewAPI } from '../api';

const List = ({
	type,
	setAppData,
	userTables,
	viewDatas,
	viewDataList,
	setSelectedView,
	setSelectedTable,
	unpublishedApps,
	publishedApps,
	appType,
	app,
	setSelectedApp,
}) => {
	// const [selectedApp, setSelectedApp] = useState(null);
	// TODO restore viewsToDisplay state

	const handleSelectApp = (app) => {
		setAppData(null);
		setSelectedApp(app);
	};

	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	const handleSelectTable = (table) => {
		setSelectedTable(table);
	};

	// TODO setViewsTodisplay(appViews)
	const loadAppViews = async (app) => {
		try {
			const appViews = await Promise.all(
				app.views.map(async (viewId) => {
					return await readViewAPI(viewId);
				})
			);
		} catch (error) {
			console.error('Error fetching View: ', error);
		}
	};

	// useEffect(() => {
	//   if (selectedApp !== null) {
	//     loadAppViews(selectedApp);
	//   }
	// }, [selectedApp]);

	return (
		<div>
			{type === 'app' ? (
				<div>
					{appType === 'published'
						? publishedApps?.map(
								(publishedApp) =>
									publishedApp !== null && (
										<div
											key={publishedApp._id}
											onClick={() => handleSelectApp(publishedApp)}
										>
											<hr />
											{publishedApp.name}
										</div>
									)
						  )
						: unpublishedApps?.map(
								(unpublishedApp) =>
									unpublishedApp !== null && (
										<div
											key={unpublishedApp._id}
											onClick={() => handleSelectApp(unpublishedApp)}
										>
											<hr />
											{unpublishedApp.name}
										</div>
									)
						  )}
				</div>
			) : type === 'view' && viewDataList.length > 0 ? (
				viewDataList.map(
					(viewData) =>
						viewData !== null && (
							<div
								key={viewData._id}
								onClick={() => handleSelectView(viewData)}
							>
								<hr />
								{viewData.viewName || viewData.name}
							</div>
						)
				)
			) : (
				userTables?.map(
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
				)
			)}
		</div>
	);
};

export default List;
