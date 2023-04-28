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
	loadSheetAPI,
	getAllAppsAPI,
	getFirstSheetNameAPI,
} from './api';

export const customHistory = createBrowserHistory();

const App = () => {
	const { user, setUser } = useContext(UserContext);
	const [reloadApp, setReloadApp] = useState(false);
	const [tableIds, setTableIds] = useState([]);
	const [app, setAppData] = useState(null);
	const [userTables, setTables] = useState(null);
	const [viewDatas, setViewDatas] = useState(null);
	// const [developers, setDevelopers] = useState([]);
	const [isDeveloper, setIsDeveloper] = useState(false);

	const [endUserApps, setEndUserApps] = useState([]);
	const [developerApps, setDeveloperApps] = useState([]);

	// REVIEW Apps that the User can run
	const [runnableApps, setRunnableApps] = useState(null);
	// REVIEW Apps that the User can Manage, but published (can run)
	const [publishedApps, setPublishedApps] = useState(null);
	// REVIEW Apps that the User can Manage, but not published (can't run yet)
	const [unpublishedApps, setUnpublishedApps] = useState(null);

	// NOTE TABLES
	const loadTableIds = (user) => {
		setTableIds(user.tables);
	};

	const checkGlobalTable = async () => {
		try {
			const url =
				'https://docs.google.com/spreadsheets/d/1CC5H2MVbGg0tm8OyouoR7f2ARR0CK1kqHFNeKYyYtL4/edit#gid=0';
			const sheetIndex = await getFirstSheetNameAPI({ url: url });
			const sheetData = {
				name: 'Global Developer List',
				url: url,
				sheetIndex: sheetIndex,
			};
			const developers = await loadSheetAPI(sheetData);
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
		const developerApps = [];
		// const endUserAppList = [];

		for (let i = 0; i < allAppsInDB?.length; i++) {
			const app = allAppsInDB[i];
			const roleURL = app?.roleMembershipSheet;
			const sheetIndex = await getFirstSheetNameAPI({ url: roleURL });
			const roleTableData = {
				name: `${app.name} Role Membership Sheet`,
				// name: 'Rolemembership Sheet',
				url: roleURL,
				sheetIndex: sheetIndex,
			};

			try {
				const roleSheetData = await loadSheetAPI(roleTableData);

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
							developerApps.push(app);
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
		setRunnableApps(() => {
			if (accessibleApps.length > 0) {
				const filteredApp = accessibleApps.filter((accessibleApp) => {
					return accessibleApp.app.published === true;
				});

				if (filteredApp.length > 0) {
					return filteredApp;
				}
			}
			return null;
		});

		// NOTE set developer apps with published === true as published apps
		setPublishedApps(() => {
			if (developerApps.length > 0) {
				const filteredApp = developerApps.filter((developerApp) => {
					return developerApp.published === true;
				});

				if (filteredApp.length > 0) {
					return filteredApp;
				}
			}
			return null;
		});

		// NOTE set developer apps with published === false as unpublished apps
		setUnpublishedApps(() => {
			if (developerApps.length > 0) {
				const filteredApp = developerApps.filter((developerApp) => {
					return developerApp.published === false;
				});

				if (filteredApp.length > 0) {
					return filteredApp;
				}
			}
			return null;
		});

		// setDeveloperApps(developerApps);
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
			loadAllApps();
			loadTableIds(user);
		} else {
			setTableIds(null);
		}
	}, [user]);

	useEffect(() => {
		if (reloadApp) {
			loadAllApps();
		}
	}, [reloadApp]);

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
									setReloadApp={setReloadApp}
									isDeveloper={isDeveloper}
									runnableApps={runnableApps}
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
								<AddTablePage
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
						path="/runnable-appIds/:name"
						element={
							user ? (
								<RunnableAppPage runnableApps={runnableApps} />
							) : (
								<LoginPage />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
