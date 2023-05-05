import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import UserContext from './UserContext';
import {
	LoginPage,
	DashboardPage,
	ManageAppPage,
	ManageTablePage,
	AdminPage,
	RunnableAppPage,
} from './pages';
import {
	readTableAPI,
	loadSheetAPI,
	getAllAppsAPI,
	getFirstSheetNameAPI,
	readViewAPI,
} from './api';
import { Apps, SettingsApplicationsOutlined } from '@mui/icons-material';

// FIXME delete if not used
export const customHistory = createBrowserHistory();

const App = () => {
	const { user, setUser } = useContext(UserContext);
	const [reloadApp, setReloadApp] = useState(false);
	const [tableIds, setTableIds] = useState(null);
	const [app, setAppData] = useState(null);
	const [userTables, setTables] = useState(null);
	// NOTE viewDatas will store locally created Views (an array of viewToSave's)
	const [viewDatas, setViewDatas] = useState(null);
	// const [developers, setDevelopers] = useState([]);
	const [isDeveloper, setIsDeveloper] = useState(false);
	const [publishedApps, setPublishedApps] = useState(null);
	const [unpublishedApps, setUnpublishedApps] = useState(null);
	const [runnableApps, setRunnableApps] = useState(null);
	const [appLog, setAppLog] = useState([]);

	//FOR REFERENCE appLog structure:
	// const data = {
	// 	app_id: 1,
	// 	app_name: "table",
	// 	log: [{
	//		view_name: "test", 
	// 		function:"add",
	//		row_index: "",
	// 		change: ""}
	// 	]
	// }

	// NOTE TABLES
	// TODO abstract into client API
	const checkGlobalTable = async () => {
		try {
			const url =
				'https://docs.google.com/spreadsheets/d/1CC5H2MVbGg0tm8OyouoR7f2ARR0CK1kqHFNeKYyYtL4/edit#gid=0';
			const sheetIndex = 'Sheet1';
			//await getFirstSheetNameAPI({ url: url });
			const sheetData = {
				name: 'Global Developer List',
				url: url,
				sheetIndex: sheetIndex,
			};
			const developers = await loadSheetAPI(sheetData);
			let foundDeveloper = false;
			if (developers !== undefined) {
				for (let i = 1; i < developers.length; i++) {
					if (developers[i][0] === user.email) {
						foundDeveloper = true;
						break;
					}
				}
			}
			setIsDeveloper(foundDeveloper);
		} catch (error) {
			console.error(error);
		}
	};

	const loadTableIds = (user) => {
		setTableIds(user.tables);
	};

	useEffect(() => {
		const loadTables = async (tableIds) => {
			try {
				const tables = await Promise.all(
					tableIds.map(async (tableId) => {
						return await readTableAPI(tableId);
					})
				);
				console.log('🚀 ~ loadTables ~ tables:', tables);
				setTables(tables);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};

		if (tableIds !== null) {
			loadTables(tableIds);
		}
	}, [tableIds]);

	// NOTE APPS
	function findUserRoles(email, roleSheetData) {
		if (roleSheetData.length === 0) {
			return [];
		}

		const roles = roleSheetData[0]; // Get the roles from the first row
		const userRoles = [];

		for (let row = 1; row < roleSheetData.length; row++) {
			for (let col = 0; col < roleSheetData[row].length; col++) {
				if (roleSheetData[row][col] === email) {
					userRoles.push(roles[col]); // Add the role found at the column to userRoles array
				}
			}
		}

		return userRoles; // Return an array of roles
	}

	const filterPublishedApps = async (developerApps) => {
		const filteredApps = await developerApps.reduce(
			async (accumulatorPromise, developerApp) => {
				const accumulator = await accumulatorPromise;

				if (developerApp.published === true) {
					const appViews = await Promise.all(
						developerApp.views.map((viewId) => {
							return readViewAPI(viewId);
						})
					);

					developerApp.createdViews = appViews;
					accumulator.push(developerApp);
				}

				return accumulator;
			},
			Promise.resolve([])
		);

		if (filteredApps.length !== 0) {
			setPublishedApps(filteredApps);
		} else {
			setPublishedApps(null);
		}
	};

	const filterUnpublishedApps = async (developerApps) => {
		const filteredApps = await developerApps.reduce(
			async (accumulatorPromise, developerApp) => {
				const accumulator = await accumulatorPromise;

				if (developerApp.published === false) {
					const appViews = await Promise.all(
						developerApp.views.map((viewId) => {
							return readViewAPI(viewId);
						})
					);

					developerApp.createdViews = appViews;
					accumulator.push(developerApp);
				}

				return accumulator;
			},
			Promise.resolve([])
		);

		if (filteredApps.length !== 0) {
			setUnpublishedApps(filteredApps);
		} else {
			setUnpublishedApps(null);
		}
	};

	const filterRunnableApps = async (accessibleApps) => {
		try {
			let filteredApps = await accessibleApps.reduce(
				async (accumulatorPromise, accessibleApp) => {
					const accumulator = await accumulatorPromise;

					const appViews = await Promise.all(
						accessibleApp.app.views.map((viewId) => {
							return readViewAPI(viewId);
						})
					);

					const accessibleViews = appViews.filter((appView) => {
						return accessibleApp.userRoles.some((userRole) => {
							return appView?.roles.includes(userRole);
						});
					});

					if (accessibleViews.length !== 0) {
						accessibleApp.app.accessibleViews = accessibleViews;
						accumulator.push(accessibleApp);
					}

					return accumulator;
				},
				Promise.resolve([])
			);

			if (filteredApps.length !== 0) {
				setRunnableApps(filteredApps);
				console.log("filtered"+filteredApps);
				setUpLogs(filteredApps);

			} else {
				setRunnableApps(null);
			}
		} catch (error) {
			console.error(error);
			// window.alert(error);
			return new Error('Error filtering runnableApps: ', error);
		}
	};

	function setUpLogs(apps){
		console.log("setting up log...");
		if(appLog.length == 0){
			for(let i =0; i < Object.keys(apps).length; i++){
				//get information for each app to store in log
				let id = apps[i].app._id;
				let name = apps[i].app.name;
				let log = [];

				//appends to the end 
				appLog.push({app_id:id, app_name:name, log:log});
				console.log(apps[i]);
			}
			setAppLog(appLog);
			//appLog[Object.keys(appLog).length + 1] = {text: "here"};
		}
		console.log(appLog);
	}

	const loadAllApps = async () => {
		const allAppsInDB = await getAllAppsAPI();
		const accessibleApps = [];
		const developerApps = [];

		for (let i = 0; i < allAppsInDB?.length; i++) {
			const app = allAppsInDB[i];
			const roleURL = app?.roleMembershipSheet;
			const sheetIndex = app?.sheetIndex;
			const roleTableData = {
				name: `${app.name} Role Membership Sheet`,
				url: roleURL,
				sheetIndex: sheetIndex,
			};

			try {
				const roleSheetData = await loadSheetAPI(roleTableData);

				if (roleSheetData !== undefined) {
					const userRoles = findUserRoles(user.email, roleSheetData);

					if (userRoles.length > 0) {
						if (
							userRoles
								.map((role) => role.toLowerCase())
								.includes('developer') ||
							userRoles.map((role) => role.toLowerCase()).includes('developers')
						) {
							developerApps.push(app);
						}

						if (app.published === true) {
							accessibleApps.push({ app, userRoles });
						}
					} else {
						console.log(
							`The User with email: ${user.email} does not have any roles`
						);
					}
				}
			} catch (error) {
				console.error(error);
				return new Error(error);
			}
		}

		if (developerApps.lengh !== 0) {
			filterPublishedApps(developerApps);
			filterUnpublishedApps(developerApps);
		} else {
			setPublishedApps(null);
			setUnpublishedApps(null);
		}

		if (accessibleApps.length !== 0) {
			filterRunnableApps(accessibleApps);
		} else {
			setRunnableApps(null);
		}
	};

	useEffect(() => {
		console.log('🚀 ~ App ~ publishedApps:', publishedApps);
	}, [publishedApps]);

	useEffect(() => {
		console.log('🚀 ~ App ~ unpublishedApps:', unpublishedApps);
	}, [unpublishedApps]);

	useEffect(() => {
		console.log('🚀 ~ App ~ runnableApps:', runnableApps);
	}, [runnableApps]);

	// NOTE ADMIN
	// TODO abstract into client API
	// const fetchDevelopers = async () => {
	// 	try {
	// 		const response = await fetch('http://localhost:3333/admin');

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP error! status: ${response.status}`);
	// 		}

	// 		const data = await response.json();
	// 		setDevelopers(data.developers);
	// 	} catch (error) {
	// 		console.error('Fetch Error:', error);
	// 	}
	// };

	// NOTE USERS
	// TODO abstract into client API
	const fetchCurrentUser = async () => {
		try {
			const response = await fetch('http://localhost:3333/auth/authenticated', {
				credentials: 'include',
			});
			const data = await response.json();

			if (response.ok) {
				if (!data) {
					setUser(null);
				}
				setUser(data);
			} else {
				console.error('Error fetching current user: ', response.status);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (reloadApp) {
			loadAllApps();
		}
	}, [reloadApp]);

	useEffect(() => {
		if (user !== null) {
			checkGlobalTable();
			loadTableIds(user);
			loadAllApps();
		} else {
			setTableIds(null);
		}
	}, [user]);

	useEffect(() => {
		fetchCurrentUser();
	}, []);

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={
							user ? (
								<DashboardPage
									isDeveloper={isDeveloper}
									userTables={userTables}
									setAppData={setAppData}
									setReloadApp={setReloadApp}
									runnableApps={runnableApps}
									appLog = {appLog}
								/>
							) : (
								<LoginPage />
							)
						}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/manage-app"
						element={
							user ? (
								<ManageAppPage
									publishedApps={publishedApps}
									unpublishedApps={unpublishedApps}
									setReloadApp={setReloadApp}
									app={app}
									// developerApps={developerApps}
									setAppData={setAppData}
									userTables={userTables}
									viewDatas={viewDatas}
									setViewDatas={setViewDatas}
								/>
							) : (
								<LoginPage />
							)
						}
					/>
					<Route
						path="/add-table"
						element={
							user ? (
								<ManageTablePage
									setTables={setTables}
									tableIds={tableIds}
									userTables={userTables}
									// developerApps={developerApps}
								/>
							) : (
								<LoginPage />
							)
						}
					/>
					{/* <Route
						path="/admin"
						element={
							<AdminPage
								developers={developers}
								setDevelopers={setDevelopers}
								fetchDevelopers={fetchDevelopers}
							/>
						}
					/> */}
					<Route
						path="/runnable-appIds/:id"
						element={
							user && runnableApps ? (
								<RunnableAppPage
									runnableApps={runnableApps}
									userTables={userTables}
									appLog = {appLog}

								/>
							) : (
								<div>
									<h1>Loading App...</h1>
								</div>
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
