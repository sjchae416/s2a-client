import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage, DashboardPage, ManageAppPage, AddTablePage } from './pages';
import { TableView } from './components';
import RunnableAppPage from './pages/RunnableAppPage';

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
		console.log('user', user);
		if (user !== null) {
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
							<DashboardPage googleUser={googleUser} setUser={setUser} />
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
				<Route
					path="/add-table"
					element={
						<AddTablePage
							googleUser={googleUser}
							user={user}
							setUser={setUser}
							tableIds={tableIds}
							setTableIds={setTableIds}
							tables={tables}
							setTables={setTables}
						/>
					}
				/>
				{/* FIXME use conditional rendering for TableView in RunnableAppPage, not path routing */}
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
