import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../UserContext';
import {
	NavigationBar,
	AppConfig,
	Sidebar,
	List,
	ViewConfig,
} from '../components';

export default function ManageAppPage({
	publishedApps,
	unpublishedApps,
	setReloadApp,
	app,
	setAppData,
	userTables,
	viewDatas,
	setViewDatas,
}) {
	const { user, setUser } = useContext(UserContext);
	const [view, setView] = useState('app');
	const [viewRole, setViewRole] = useState([]);
	const [viewDataList, setViewDataList] = useState([]);
	const [selectedView, setSelectedView] = useState({});
	const [addView, setAddView] = useState(false);
	// REVIEW not uesd at all, only changes the state
	// const [addApp, setAddApp] = useState(false);
	const [appType, setAppType] = useState('published');
	const [selectedApp, setSelectedApp] = useState(null);

	useEffect(() => {
		if (selectedApp !== null) {
			setViewDataList(selectedApp.createdViews);
		}
	}, [selectedApp]);

	const handleAddApp = () => {
		setAppData(null);
		setSelectedApp(null);
		// setAddApp(true);
	};

	return (
		<div>
			<br />
			<br />
			<div className="container">
				<NavigationBar user={user} />
				<br />
				<div className="card p-0">
					<div className="row no-gutters mt-2">
						<Sidebar
							setReloadApp={setReloadApp}
							setView={setView}
							app={app}
							setAppData={setAppData}
							setSelectedApp={setSelectedApp}
							viewDatas={viewDatas}
							setViewDatas={setViewDatas}
							viewDataList={viewDataList}
						/>

						<div className="col-1 border-right text-center">
							{view === 'app' && (
								<>
									<button onClick={handleAddApp}>Add App</button>
									<br />
									<br />
									<select
										defaultValue={appType}
										onChange={(e) => {
											// NOTE User could be just lookin through the list of the Apps while creation of App e.g. to prevent same name
											// setAppData(null);
											// setSelectedApp(null);
											setAppType(e.target.value);
										}}
									>
										<option value="published">Published</option>
										<option value="unpublished">Unpublished</option>
									</select>
									<List
										type="app"
										setAppData={setAppData}
										viewDatas={viewDatas}
										viewDataList={viewDataList}
										setSelectedView={setSelectedView}
										publishedApps={publishedApps}
										unpublishedApps={unpublishedApps}
										appType={appType}
										setSelectedApp={setSelectedApp}
									/>
								</>
							)}

							{view === 'view' && app && (
								<>
									<button
										onClick={() => {
											setSelectedView({});
											setAddView(true);
										}}
									>
										Add View
									</button>
									<List
										type="view"
										viewDatas={viewDatas}
										viewDataList={viewDataList}
										setSelectedView={setSelectedView}
									/>
								</>
							)}
						</div>

						<div className="col-auto">
							<div className="container">
								<br />
								{view === 'app' ? (
									<AppConfig
										setViewRole={setViewRole}
										user={user}
										app={app}
										setAppData={setAppData}
										selectedApp={selectedApp}
										// addApp={addApp}
										// setAddApp={setAddApp}
									/>
								) : view === 'view' && app ? (
									<ViewConfig
										viewRole={viewRole}
										userTables={userTables}
										viewDatas={viewDatas}
										setViewDatas={setViewDatas}
										setViewDataList={setViewDataList}
										selectedView={selectedView}
										setSelectedView={setSelectedView}
										addView={addView}
										setAddView={setAddView}
									/>
								) : (
									<div>Configure the app first</div>
								)}

								<br />
								<br />
							</div>
						</div>
					</div>
				</div>
				<br />
				<br />
				<br />
			</div>
		</div>
	);
}
