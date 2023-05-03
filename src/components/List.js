import React, { useEffect, useState } from 'react';

const List = ({
	type,
	userTables,
	setSelectedTable,
	setAppData,
	setShowTable,
	appType,
	publishedApps,
	unpublishedApps,
	setSelectedApp,
	viewDataList,
	viewDatas,
	setSelectedView,
}) => {
	const [viewsToDisplay, setViewsToDisplay] = useState(null);

	useEffect(() => {
		if (viewDataList && viewDatas) {
			setViewsToDisplay([...viewDataList, ...viewDatas]);
		} else if (viewDataList) {
			setViewsToDisplay(viewDataList);
		} else if (viewDatas) {
			setViewsToDisplay(viewDatas);
		} else {
			setViewsToDisplay(null);
		}
	}, [viewDataList, viewDatas]);

	const handleSelectApp = (app) => {
		setAppData(null);
		setShowTable(false);
		setSelectedApp(app);
	};

	const handleSelectView = (view) => {
		setSelectedView(view);
	};

	const handleSelectTable = (table) => {
		setSelectedTable(table);
	};

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
			) : type === 'view' && viewsToDisplay ? (
				viewsToDisplay.map(
					(view) =>
						view !== null && (
							<div
								key={JSON.stringify(view)}
								onClick={() => handleSelectView(view)}
							>
								<hr />
								{view.name}
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
