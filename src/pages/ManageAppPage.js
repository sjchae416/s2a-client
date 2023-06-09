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
	const [viewDataList, setViewDataList] = useState(null);
	const [backupViews, setBackupViews] = useState(null);
	const [selectedView, setSelectedView] = useState(null);
	const [addView, setAddView] = useState(false);
	const [appType, setAppType] = useState('published');
	const [showTable, setShowTable] = useState(false);
	const [selectedApp, setSelectedApp] = useState(null);

	useEffect(() => {
		if (selectedApp !== null) {
			setViewDataList(selectedApp.createdViews);
			setBackupViews(selectedApp.createdViews);
		} else {
			setViewDataList(null);
			setBackupViews(null);
		}
		setSelectedView(null);
		setViewDatas(null);
	}, [selectedApp]);

	const handleAddApp = () => {
		setAppData(null);
		setSelectedApp(null);
		setShowTable(false);
		setReloadApp(false);
		setViewDataList(null);
		setSelectedView(null);
	};

	const handleAddView = () => {
		setSelectedView(null);
		setAddView(true);
	};

	return (
		<div>
			<br />
			<br />
			<div className="container">
				<NavigationBar
					user={user}
					setAppData={setAppData}
					setSelectedApp={setSelectedApp}
					viewDataList={viewDataList}
					setReloadApp={setReloadApp}
					backupViews={backupViews}
				/>
				<br />
				<div className="card p-0">
					<div className="row no-gutters mt-2">
						<Sidebar
							setReloadApp={setReloadApp}
							setView={setView}
							app={app}
							setAppData={setAppData}
							selectedApp={selectedApp}
							setSelectedApp={setSelectedApp}
							viewDatas={viewDatas}
							setViewDatas={setViewDatas}
							viewDataList={viewDataList}
							setViewDataList={setViewDataList}
							backupViews={backupViews}
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
											setAppType(e.target.value);
										}}
									>
										<option value="published">Published</option>
										<option value="unpublished">Unpublished</option>
									</select>
									<List
										type="app"
										setAppData={setAppData}
										setShowTable={setShowTable}
										appType={appType}
										publishedApps={publishedApps}
										unpublishedApps={unpublishedApps}
										setSelectedApp={setSelectedApp}
									/>
								</>
							)}

							{view === 'view' && app && (
								<>
									<button onClick={handleAddView}>Add View</button>
									<List
										type="view"
										viewDataList={viewDataList}
										viewDatas={viewDatas}
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
										setReloadApp={setReloadApp}
										setViewRole={setViewRole}
										user={user}
										app={app}
										setAppData={setAppData}
										selectedApp={selectedApp}
										setSelectedApp={setSelectedApp}
										showTable={showTable}
										setShowTable={setShowTable}
									/>
								) : view === 'view' && app ? (
									<ViewConfig
										viewRole={viewRole}
										userTables={userTables}
										viewDatas={viewDatas}
										setViewDatas={setViewDatas}
										viewDataList={viewDataList}
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
