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
	RunnableAppPage
} from './pages';
import { TableView } from './components';
import { getAppById, readTable, readView } from './api';

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
	const [developers, setDevelopers] = useState([]);

	// NOTE APPS
	const loadAppIds = (user) => {
		setAppIds(user.apps);
	};

	// TABLES
	const getUserTables = async () => {
		if (user) {
			// Create an array to store readTable promises
			const readTablePromises = [];

			// Iterate over user.tables and push each readTable promise to the array
			for (let i = 0; i < user.tables.length; i++) {
				readTablePromises.push(readTable(user.tables[i]));
			}

			// Wait for all readTable promises to resolve
			const resolvedTables = await Promise.all(readTablePromises);

			// Filter out duplicate table names
			const uniqueTables = [];
			const uniqueTableNames = new Set();

			for (const table of resolvedTables) {
				if (!uniqueTableNames.has(table.name)) {
					uniqueTables.push(table);
					uniqueTableNames.add(table.name);
				}
			}

			// Update the tables state with uniqueTables
			setTables(uniqueTables);
		}
	};

	const loadTableIds = (user) => {
		setTableIds(user.tables);
	};

	// REVIEW Michael can you check this out and see if it can be replaced?
	// NOTE it allows to tables to be updated everytime the user is updated (user -> tableIds -> tablse)
	useEffect(() => {
		const loadTables = async () => {
			try {
				const userTables = await Promise.all(
					tableIds.map(async (id) => {
						return await readTable(id);
					})
				);

				// Filter out duplicate table names
				const uniqueTables = [];
				const uniqueTableNames = new Set();

				for (const table of userTables) {
					if (!uniqueTableNames.has(table.name)) {
						uniqueTables.push(table);
						uniqueTableNames.add(table.name);
					}
				}

				setTables(userTables);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};

		// loadTables();
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

				setTables(userViews);
			} catch (error) {
				console.error('Error fetching App: ', error);
			}
		};

		loadViews();
	}, [viewIds]);

	// NOTE ADMIN
	const fetchDevelopers = async () => {
		// TODO - Make an api for this
		try {
			const response = await fetch('http://localhost:3333/admin');

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			setDevelopers(data.developers);
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	};

	useEffect(() => {
		if (user !== null) {
			getUserTables();
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
							<DashboardPage user={user} setUser={setUser} />
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
								getUserTables={getUserTables}
							/>
						}
					/>
					<Route
						path="/admin"
						element={
							<AdminPage
								developers={developers}
								setDevelopers={setDevelopers}
								fetchDevelopers={fetchDevelopers}
							/>
						}
					/>
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
