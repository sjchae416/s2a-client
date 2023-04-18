import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage, DashboardPage, ManageAppPage } from './pages';
import { AddTable, TableView } from './components';
import RunnableAppPage from './pages/RunnableAppPage';

export const customHistory = createBrowserHistory();

const App = () => {
	const [googleUser, setGoogleUser] = useState(null);
	const [user, setUser] = useState(null);
	const [appIds, setAppIds] = useState([]);
	const [tableIds, setTableIds] = useState([]);
	const [viewIds, setViewIds] = useState([]);
	const [app, setApp] = useState(null);
	const [tables, setTables] = useState([]);

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

	useEffect(() => {
		getUser();
	}, []);

	// NOTE DELETE THIS BEFORE PRODUCTION
	// useEffect(() => {
	// 	// LOG
	// 	console.log('appIds', appIds);
	// 	console.log('tableIds', tableIds);
	// 	console.log('viewIds', viewIds);
	// }, [appIds]);
	useEffect(() => {
		// LOG
		console.log('user', user);
		// setAppIds(user.apps);
		// setTableIds(user.tables);
		// setViewIds(user.views);
	}, [user]);
	// useEffect(() => {
	// 	// LOG
	// 	console.log('googleUser', googleUser);
	// }, [googleUser]);
	// NOTE DELETE THIS BEFORE PRODUCTION

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
							tables={tables}
							setTables={setTables}
						/>
					}
				/>
				{/* REVIEW use conditional rendering for TableView in RunnableAppPage */}
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
