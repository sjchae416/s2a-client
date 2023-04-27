import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { createBrowserHistory } from 'history';
import UserContext from './UserContext';
import {
	LoginPage,
	DashboardPage,
	ManageAppPage,
	AddTablePage,
	AdminPage,
	RunnableAppPage,
} from './pages';
import {
	getAppByIdAPI,
	readTableAPI,
	loadTableAPI,
	getAllAppsAPI,
} from './api';

export const customHistory = createBrowserHistory();

const App = () => {
	const { user, setUser } = useContext(UserContext);
	const [isAppSaved, setIsAppSaved] = useState(false);
	const [appIds, setAppIds] = useState([]);
	const [tableIds, setTableIds] = useState([]);
	const [app, setAppData] = useState(null);
	const [userApps, setUserApps] = useState(null);
	const [userTables, setTables] = useState(null);
	const [viewDatas, setViewDatas] = useState(null);
	// const [developers, setDevelopers] = useState([]);
	const [isDeveloper, setIsDeveloper] = useState(false);

	const [endUserApps, setEndUserApps] = useState([]);
	const [developerApps, setDeveloperApps] = useState([]);

	// REVIEW Apps that the User can run
	const [runnableApps, setRunnableApps] = useState([]);
	// REVIEW Apps that the User can Manage, but published (can run)
	const [publishedApps, setPublishedApps] = useState([]);
	// REVIEW Apps that the User can Manage, but not published (can't run yet)
	const [unpublishedApps, setUnpublishedApps] = useState([]);

	// NOTE TABLES
	const loadTableIds = (user) => {
		setTableIds(user.tables);
	};

	const checkGlobalTable = async () => {
		try {
			const tableData = {
				name: 'Global Developer List',
				url: 'https://docs.google.com/spreadsheets/d/1CC5H2MVbGg0tm8OyouoR7f2ARR0CK1kqHFNeKYyYtL4/edit#gid=0',
				sheetIndex: 'Sheet1',
			};
			const developers = await loadTableAPI(tableData);
			let foundDeveloper = false;
			if (developers !== undefined) {
				for (let i = 1; i < developers.length; i++) {
					// console.log('developers[i][0]', developers[i][0]);
					// console.log('user.email', user.email);
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

	useEffect(() => {
		const loadTables = async (tableIds) => {
			try {
				const tables = await Promise.all(
					tableIds.map(async (tableId) => {
						return await readTableAPI(tableId);
					})
				);
				console.log('🚀 ~ file: App.js:96 ~ loadTables ~ tables:', tables);
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

	const loadAllApps = async () => {
		// NOTE load and iterate all apps in db
		const allAppsInDB = await getAllAppsAPI();
		const accessibleApps = [];
		const developerAppList = [];
		// const endUserAppList = [];

		for (let i = 0; i < allAppsInDB?.length; i++) {
			const app = allAppsInDB[i];
			const roleURL = app?.roleMembershipSheet;
			const roleTableData = {
				name: `${app?.name} Role Membership Sheet`,
				// name: 'Rolemembership Sheet',
				url: roleURL,
				sheetIndex: 'Sheet1',
			};

			try {
				const roleSheetData = await loadTableAPI(roleTableData);

				if (roleSheetData !== undefined) {
					const userRoles = findUserRoles(user.email, roleSheetData);

					if (userRoles.length > 0) {
						// NOTE filter all apps into accessible apps by checking roles
						accessibleApps.push({ app, userRoles });

						if (
							userRoles
								.map((role) => role.toLowerCase())
								.includes('developer') ||
							userRoles.map((role) => role.toLowerCase()).includes('developers')
						) {
							// NOTE filter all apps into developer apps by checking if user email under developer(s) role
							developerAppList.push(app);
						}

						// endUserAppList.push({ app, userRoles });
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

		// NOTE set all apps with published === true as runnable apps
		setRunnableApps(
			accessibleApps.filter((accessibleApp) => {
				return accessibleApp.published === true;
			})
		);

		// NOTE set developer apps with published === true as published apps
		setPublishedApps(
			developerAppList.filter((developerApp) => {
				return developerApp.published === true;
			})
		);

		// NOTE set developer apps with published === false as unpublished apps
		setUnpublishedApps(
			developerAppList.filter((developerApp) => {
				return developerApp.published === false;
			})
		);

		// setDeveloperApps(developerAppList);
		// setEndUserApps(endUserAppList);
	};

	useEffect(() => {
		console.log('🚀 ~ file: App.js:194 ~ App ~ runnableApps:', runnableApps);
	}, [runnableApps]);

	useEffect(() => {
		console.log('🚀 ~ file: App.js:198 ~ App ~ publishedApps:', publishedApps);
	}, [publishedApps]);

	useEffect(() => {
		console.log(
			'🚀 ~ file: App.js:203 ~ App ~ unpublishedApps:',
			unpublishedApps
		);
	}, [unpublishedApps]);

	// NOTE keep this for backup
	// useEffect(() => {
	// 	const loadApps = async (appIds) => {
	// 		try {
	// 			const apps = await Promise.all(
	// 				appIds.map(async (appId) => {
	// 					return await getAppByIdAPI(appId);
	// 				})
	// 			);
	// 			console.log('🚀 ~ file: App.js:44 ~ loadApps ~ apps:', apps);
	// 			setUserApps(apps);
	// 		} catch (error) {
	// 			console.error('Error fetching App: ', error);
	// 		}
	// 	};

	// 	if (appIds !== null) {
	// 		loadApps(appIds);
	// 	}
	// }, [appIds]);

	// NOTE ADMIN
	// const fetchDevelopers = async () => {
	// 	// TODO - Make an api for this
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
		if (user !== null) {
			checkGlobalTable();
			// NOTE keep this for backup
			// loadAppIds();
			loadAllApps();
			loadTableIds(user);
		} else {
			// NOTE keep this for backup
			// setAppIds(null);
			setTableIds(null);
		}
	}, [user]);

	useEffect(() => {
		if (isAppSaved) {
			loadAllApps();
		}
	}, [isAppSaved]);

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
									setIsAppSaved={setIsAppSaved}
									isDeveloper={isDeveloper}
									runnableApps={runnableApps}
									publishedApps={publishedApps}
									unpublishedApps={unpublishedApps}
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
									setIsAppSaved={setIsAppSaved}
									app={app}
									developerApps={developerApps}
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
								<AddTablePage
									tableIds={tableIds}
									userTables={userTables}
									developerApps={developerApps}
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
						path="/runnable-appIds/:name"
						element={user ? <RunnableAppPage /> : <LoginPage />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
