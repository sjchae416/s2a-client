import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import { LoginPage, DashboardPage, ManageAppPage } from './pages';
import { AddTable, TableView } from './components';

export const customHistory = createBrowserHistory();

const App = () => {
	const [user, setUser] = useState(null);

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

			setUser(data.user._json);
			// setUser(data.user);
		} catch (error) {
			console.error('Fetch Error:', error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	// NOTE DELETE THIS BEFORE PRODUCTION
	useEffect(() => {
		console.table(user);
	}, [user]);

	return (
		<div>
			{/* <Router forceRefresh={true}> */}
			<Routes>
				<Route
					exact
					path="/"
					element={
						user ? <DashboardPage user={user} /> : <Navigate to="/login" />
					}
				/>
				<Route
					path="/login"
					element={user ? <Navigate to="/" /> : <LoginPage />}
				/>
				<Route path="/manage-app" element={<ManageAppPage user={user} />} />
				<Route path="/add-table" element={<AddTable user={user} />} />
				<Route path="/table-view" element={<TableView />} />
			</Routes>
			{/* </Router> */}
		</div>
	);
};

export default App;
