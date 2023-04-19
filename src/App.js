import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage, DashboardPage, ManageAppPage } from './pages';
import { AddTable, TableView } from './components';
import RunnableAppPage from './pages/RunnableAppPage';
import { readTable } from './api/tableApi';

export const customHistory = createBrowserHistory();

const App = () => {
	const [googleUser, setGoogleUser] = useState(null);
	const [user, setUser] = useState(null);
	const [appIds, setAppIds] = useState([]);
	const [tableIds, setTableIds] = useState([]);
  const [viewIds, setViewIds] = useState([]);
  // NOTE appData in AppConfig.js
	const [app, setApp] = useState(null);
	const [tables, setTables] = useState([]);
	const [views, setViews] = useState([]);



	const getUser = async () => {
		try {
			const response = await fetch(
				`http://localhost:3333/auth/login/success`,
				// `http://localhost:${process.env.SERVER_PORT}/auth/login/success`,
				{ credentials: 'include' }
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			setGoogleUser(data.user._json);

			// setGoogleUser(data.user);
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	};

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

	const loadAppIds = (user) => {
		setAppIds(user.apps);
	};

	const loadTableIds = (user) => {
		setTableIds(user.tables);
	};

	const loadViewIds = (user) => {
		setViewIds(user.views);
	};

	useEffect(() => {
		getUser();
	}, []);

	useEffect(() => {
		console.log('tables', tables);
	}, [tables]);

	useEffect(() => {
		
		console.log('user', user);
		if (user !== null) {
			getUserTables();
			loadAppIds(user);
			loadTableIds(user);
			// TODO uncomment when View interaction is done
			// loadViewIds(user)
		}
	}, [user]);

	return (
		<div>
			{/* <Router forceRefresh={true}> */}
			<Routes>
				<Route
					exact
					path="/"
					element={
						googleUser ? (
							<DashboardPage
								googleUser={googleUser}
								setUser={setUser}
								setAppIds={setAppIds}
								setTableIds={setTableIds}
								setViewIds={setViewIds}
							/>
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/login"
					element={googleUser ? <Navigate to="/" /> : <LoginPage />}
				/>
				<Route
					path="/manage-app"
					element={
						<ManageAppPage
							googleUser={googleUser}
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
				{/* REVIEW since AddTable is routed  */}
				<Route
					path="/add-table"
					element={
						<AddTable
							googleUser={googleUser}
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
				{/* REVIEW use conditional rendering for TableView in RunnableAppPage */}
				{/* Add route to RunnableAppPage instead */}
				<Route path="/table-view" element={<TableView />} />
				<Route
					path="/runnable-appIds/:name"
					element={<RunnableAppPage user={user} />}
				/>
			</Routes>
			{/* </Router> */}
		</div>
	);
};

export default App;
