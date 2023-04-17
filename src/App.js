import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage, DashboardPage, ManageAppPage } from './pages';
import { AddTable, TableView } from './components';

export const customHistory = createBrowserHistory();

const App = () => {
	const [googleUser, setGoogleUser] = useState(null);
	const [user, setUser] = useState(null);
	const [apps, setApps] = useState([]);
	const [app, setApp] = useState(null);

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

	useEffect(() => {
		console.log('apps', apps);
	}, [apps]);
	useEffect(() => {
		console.log('user', user);
	}, [user]);

	// NOTE DELETE THIS BEFORE PRODUCTION
	useEffect(() => {
		// console.table(googleUser);
		console.log(googleUser);
	}, [googleUser]);

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
							apps={apps}
							setApps={setApps}
							app={app}
							setApp={setApp}
						/>
					}
				/>
				<Route
					path="/add-table"
					element={
						<AddTable googleUser={googleUser} user={user} setUser={setUser} />
					}
				/>
				<Route path="/table-view" element={<TableView />} />
			</Routes>
			{/* </Router> */}
		</div>
	);
};

export default App;
