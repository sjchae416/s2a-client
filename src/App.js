import React from 'react';
import './App.css';
import {
	// BrowserRouter as Router,
	Navigate,
	Routes,
	Route,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { createBrowserHistory } from 'history';
import {
	Login,
	Dashboard,
	CreateApp,
	Table,
	ManageTable,
	TableView,
} from './components';

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
			if (response.status === 403) {
				return console.error(
					'HTTP status code 403: Unauthorized to redirect to the Dashboard. Please log in.'
				);
			}
			// if (!response.ok) {
			// 	throw new Error(`HTTP error! status: ${response.status}`);
			// }
			const data = await response.json();
			setUser(data.user._json);
		} catch (error) {
			// NOTE Handle any errors that occur during the request
			console.error('Fetch Error:', error);
		}
	};

	useEffect(() => {
		// REVIEW calls twice possibly beacuse is mounted and unmounted multiple (twice) times
		getUser();
	}, []);

	useEffect(() => {
		console.log(user);
	}, [user]);

	return (
		<Box>
			{/* <Router forceRefresh={true}> */}
			<Routes>
				<Route
					exact
					path="/"
					// element={<Dashboard user={user} />}
					element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
				/>
				<Route
					exact
					path="/login"
					// element={<Login />}
					element={user ? <Navigate to="/" /> : <Login />}
				/>
				{/* <Route path="/" element={<Login />} /> */}
				{/* <Route path="/dashboard" element={<Dashboard />} /> */}
				<Route path="/create-table" element={<Table />} />

				<Route path="/add-view" element={<CreateApp />} />
				<Route path="/manage-table" element={<ManageTable />} />
				<Route path="/table-view" element={<TableView />} />
			</Routes>
			{/* </Router> */}
		</Box>
	);
};

export default App;
