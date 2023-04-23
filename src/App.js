import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import {
	LoginPage,
	DashboardPage,
	ManageAppPage,
	AddTablePage,
	AdminPage,
} from './pages';
import { TableView } from './components';
// FIXME import this together in line 6 || (from './pages' part)
import RunnableAppPage from './pages/RunnableAppPage';
import { getAppById, readTable, readView, loadTable } from './api';

export const customHistory = createBrowserHistory();

const App = () => {
	const [user, setUser] = useState(null);
	const [appIds, setAppIds] = useState([]);
	const [tableIds, setTableIds] = useState([]);
	const [viewIds, setViewIds] = useState([]);
	const [app, setApp] = useState(null);
	const [apps, setApps] = useState(null);
	const [tables, setTables] = useState([]);
	const [views, setViews] = useState([]);
	// const [developers, setDevelopers] = useState([]);
	const [isDeveloper, setIsDeveloper] = useState(false);

	// NOTE APPS
	const loadAppIds = (user) => {
		setAppIds(user.apps);
	};

	useEffect(() => {
		const loadApps = async () => {
			try {
				const userApps = await Promise.all(
					appIds.map(async (id) => {
						return await getAppById(id);
					})
				);
				console.log("🚀 ~ file: App.js:44 ~ loadApps ~ userApps:", userApps)
				setApps(userApps);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};
		loadApps();
	}, [appIds]);

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
			const developers = await loadTable(tableData);
			let foundDeveloper = false;
			for (let i = 1; i < developers.length; i++) {
				if (developers[i][0] === user.email) {
					foundDeveloper = true;
					break;
				}
			}
			setIsDeveloper(foundDeveloper);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const loadTables = async () => {
			try {
				const userTables = await Promise.all(
					tableIds.map(async (id) => {
						return await readTable(id);
					})
				);
				// console.log("🚀 ~ file: App.js:96 ~ loadTables ~ userTables:", userTables)
				setTables(userTables);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};

		loadTables();
	}, [tableIds]);

	// NOTE VIEWS
	const loadViewIds = (user) => {
		setViewIds(user.views);
	};

	useEffect(() => {
		const loadViews = async () => {
			try {
				const userViews = await Promise.all(
					viewIds.map(async (id) => {
						return await readView(id);
					})
				);
				console.log("🚀 ~ file: App.js:118 ~ loadViews ~ userViews:", userViews)
				setTables(userViews);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};

		loadViews();
	}, [viewIds]);

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
	useEffect(() => {
		if (user !== null) {
			checkGlobalTable();
			loadAppIds(user);
			loadTableIds(user);
			// loadViewIds(user)
		}
	}, [user]);

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route
						exact
						path="/"
						element={
							// NOTE keep these comments for backup
							// user ? (
							<DashboardPage user={user} setUser={setUser} isDeveloper={isDeveloper}/>
							// ) : (
							// 	<Navigate to="/login" />
							// )
						}
					/>
					<Route
						path="/login"
						element={
							// NOTE keep these comments for backup
							// user ? <Navigate to="/" /> :
							<LoginPage />
						}
					/>
					<Route
						path="/manage-app"
						element={
							<ManageAppPage
								user={user}
								setUser={setUser}
								appIds={appIds}
								setAppIds={setAppIds}
								app={app}
								setApp={setApp}
								viewIds={viewIds}
								setViewIds={setViewIds}
							/>
						}
					/>
					<Route
						path="/add-table"
						element={
							<AddTablePage
								user={user}
								setUser={setUser}
								tableIds={tableIds}
								setTableIds={setTableIds}
								tables={tables}
								setTables={setTables}
							/>
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
					{/* FIXME use conditional rendering, not path routing, for TableView in RunnableAppPage */}
					<Route path="/table-view" element={<TableView />} />
					<Route
						path="/runnable-appIds/:name"
						element={<RunnableAppPage user={user} />}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
