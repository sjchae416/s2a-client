import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
	readTableAPI,
	loadSheetAPI,
	getAllAppsAPI,
	getFirstSheetNameAPI,
	readViewAPI,
} from './api';

export const customHistory = createBrowserHistory();

const App = () => {
	const { user, setUser } = useContext(UserContext);
	const [reloadApp, setReloadApp] = useState(false);
	const [tableIds, setTableIds] = useState(null);
	const [app, setAppData] = useState(null);
	const [userTables, setTables] = useState(null);
	const [viewDatas, setViewDatas] = useState(null);
	// const [developers, setDevelopers] = useState([]);
	const [isDeveloper, setIsDeveloper] = useState(false);
	// REVIEW Apps that the User can Manage as a Developer, but published (can run)
	const [publishedApps, setPublishedApps] = useState(null);
	// REVIEW Apps that the User can Manage as a Developer, but unpublished (can't run yet)
	const [unpublishedApps, setUnpublishedApps] = useState(null);
	// REVIEW Apps that the User can run as an End User (published)
	// NOTE use accessibleViews field in the element of runnableApps; it's filtered views that the User has access to
	const [runnableApps, setRunnableApps] = useState(null);

	// NOTE TABLES

	// TODO abstract into client API
	const checkGlobalTable = async () => {
		try {
			const url =
				'https://docs.google.com/spreadsheets/d/1CC5H2MVbGg0tm8OyouoR7f2ARR0CK1kqHFNeKYyYtL4/edit#gid=0';
			// FIXME does not return correctly
			// const sheetIndex = await getFirstSheetNameAPI({ url: url });
			const sheetData = {
				name: 'Global Developer List',
				url: url,
				// TODO delete when getFirstSheetNameAPI() is fixed
				sheetIndex: 'Sheet1',
				// TODO uncomment when working
				// sheetIndex: sheetIndex,
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

	// NOTE set developer apps with published === true as published apps
	const filterPublishedApps = (developerApps) => {
		const filteredApps = developerApps.filter((developerApp) => {
			return developerApp.published === true;
		});

		if (filteredApps.length !== 0) {
			setPublishedApps(filteredApps);
		} else {
			setPublishedApps(null);
		}
	};

	// NOTE set developer apps with published === false as unpublished apps
	const filterUnpublishedApps = (developerApps) => {
		const filteredApps = developerApps.filter((developerApp) => {
			return developerApp.published === false;
		});

		if (filteredApps.length !== 0) {
			setUnpublishedApps(filteredApps);
		} else {
			setUnpublishedApps(null);
		}
	};

	// NOTE set accessible apps with published === true and userRoles in view.roles as runnable apps
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
							return appView.roles.includes(userRole);
						});
					});

					if (accessibleViews.length !== 0) {
						// TODO if view (id) not needed later, modify views instead of creating accessibleViews field
						// accessibleApp.app.views = accessibleViews;
						accessibleApp.app.accessibleViews = accessibleViews;
						accumulator.push(accessibleApp);
					}

					return accumulator;
				},
				Promise.resolve([])
			);

			if (filteredApps.length !== 0) {
				setRunnableApps(filteredApps);
			} else {
				setRunnableApps(null);
			}
		} catch (error) {
			window.alert(error);
			return new Error('Error filtering runnableApps: ', error);
		}
	};

	const loadAllApps = async () => {
		// NOTE load and iterate all apps in db
		const allAppsInDB = await getAllAppsAPI();
		const accessibleApps = [];
		const developerApps = [];

		for (let i = 0; i < allAppsInDB?.length; i++) {
			const app = allAppsInDB[i];
			const roleURL = app?.roleMembershipSheet;
			// FIXME does not return correctly
			// const sheetIndex = await getFirstSheetNameAPI({ url: roleURL });
			const roleTableData = {
				name: `${app.name} Role Membership Sheet`,
				url: roleURL,
				// TODO delete when getFirstSheetNameAPI() is fixed
				sheetIndex: 'Sheet1',
				// TODO uncomment when working
				// sheetIndex: sheetIndex,
			};

			try {
				const roleSheetData = await loadSheetAPI(roleTableData);

				if (roleSheetData !== undefined) {
					const userRoles = findUserRoles(user.email, roleSheetData);

					if (userRoles.length > 0) {
						// NOTE filter all apps into accessible apps by checking roles
						if (app.published === true) {
							accessibleApps.push({ app, userRoles });
						}

						if (
							userRoles
								.map((role) => role.toLowerCase())
								.includes('developer') ||
							userRoles.map((role) => role.toLowerCase()).includes('developers')
						) {
							// NOTE filter all apps into developer apps by checking if user email under developer(s) role
							developerApps.push(app);
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
			console.log('🚀 ~ fetchCurrentUser ~ data:', data);

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
