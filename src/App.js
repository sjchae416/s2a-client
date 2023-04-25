import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import { getAppById, readTable, readView, loadTable } from './api';

export const customHistory = createBrowserHistory();

const App = () => {
	const { user, setUser } = useContext(UserContext);
	const [appIds, setAppIds] = useState([]);
	const [tableIds, setTableIds] = useState([]);
	const [viewIds, setViewIds] = useState([]);
	const [app, setApp] = useState(null);
	const [apps, setApps] = useState(null);
	const [tables, setTables] = useState([]);
	const [views, setViews] = useState([]);
	// const [developers, setDevelopers] = useState([]);
	const [isDeveloper, setIsDeveloper] = useState(false);

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
				// console.log('developers[i][0]', developers[i][0]);
				// console.log('user.email', user.email);
				if (developers[i][0] === user.email) {
					foundDeveloper = true;
					break;
				}
			}
			console.log(
				'🚀 ~ file: App.js:53 ~ checkGlobalTable ~ foundDeveloper:',
				foundDeveloper
			);
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
				console.log(
					'🚀 ~ file: App.js:96 ~ loadTables ~ userTables:',
					userTables
				);
				setTables(userTables);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};

		loadTables();
	}, [tableIds]);

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
				console.log('🚀 ~ file: App.js:44 ~ loadApps ~ userApps:', userApps);
				setApps(userApps);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};
		loadApps();
	}, [appIds]);

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
				console.log(
					'🚀 ~ file: App.js:118 ~ loadViews ~ userViews:',
					userViews
				);
				setViews(userViews);
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
	const fetchCurrentUser = async () => {
		try {
			const response = await fetch('http://localhost:3333/auth/authenticated', {
				credentials: 'include',
			});
			const data = await response.json();

			if (response.ok) {
				if (!data) {
					setUser(null);
					// navigate('/login');
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
			loadAppIds(user);
			loadTableIds(user);
			loadViewIds(user);
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
							user ? <DashboardPage isDeveloper={isDeveloper} /> : <LoginPage />
						}
					/>
					<Route path="/login" element={<LoginPage />} />
					<Route
						path="/manage-app"
						element={
							<ManageAppPage
								appIds={appIds}
								app={app}
								tables={tables}
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
								tableIds={tableIds}
								setTableIds={setTableIds}
								tables={tables}
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
					<Route path="/runnable-appIds/:name" element={<RunnableAppPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
